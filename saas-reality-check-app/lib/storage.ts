import { ApiKeyConfig, ValidationSession } from '@/types';

const API_KEY_STORAGE_KEY = 'saas_reality_check_api_key';
const SESSIONS_STORAGE_KEY = 'saas_reality_check_sessions';

// API Key Management
export const storage = {
  // API Key
  saveApiKey(key: string): void {
    if (typeof window === 'undefined') return;
    const config: ApiKeyConfig = {
      key,
      isValid: true,
      lastValidated: new Date(),
    };
    localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(config));
  },

  getApiKey(): string | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (!stored) return null;
    try {
      const config: ApiKeyConfig = JSON.parse(stored);
      return config.key;
    } catch {
      return null;
    }
  },

  clearApiKey(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  },

  hasApiKey(): boolean {
    return !!this.getApiKey();
  },

  // Sessions
  saveSession(session: ValidationSession): void {
    if (typeof window === 'undefined') return;
    const sessions = this.getSessions();
    const index = sessions.findIndex(s => s.id === session.id);
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  },

  getSessions(): ValidationSession[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  getSession(id: string): ValidationSession | null {
    const sessions = this.getSessions();
    return sessions.find(s => s.id === id) || null;
  },

  deleteSession(id: string): void {
    if (typeof window === 'undefined') return;
    const sessions = this.getSessions().filter(s => s.id !== id);
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  },

  clearAllSessions(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSIONS_STORAGE_KEY);
  },
};

// Generate session ID
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Cost calculation (based on Claude API pricing)
export function calculateCost(tokens: number, model: 'haiku' | 'sonnet' = 'haiku'): number {
  // Rough estimate: input + output tokens
  // Haiku: ~$0.25 per M input, ~$1.25 per M output
  // Sonnet: ~$3 per M input, ~$15 per M output
  const avgCostPerToken = model === 'haiku' ? 0.75 / 1000000 : 9 / 1000000;
  return tokens * avgCostPerToken;
}
