export type AgentName = 'clara' | 'ethan' | 'maya' | 'isaac' | 'leo';

export type Verdict = 'proceed' | 'validate' | 'delay';

export interface AgentResponse {
  agent: AgentName;
  response: string;
  timestamp: Date;
  tokensUsed?: number;
  estimatedCost?: number;
}

export interface ValidationSession {
  id: string;
  createdAt: Date;
  currentAgent: AgentName;
  responses: AgentResponse[];
  userInputs: {
    idea?: string;
    targetUser?: string;
    painPoint?: string;
    techStack?: string;
    uniqueness?: string;
    niche?: string;
    audience?: string;
    leverage?: string;
  };
  finalVerdict?: {
    verdict: Verdict;
    summary: string;
    risks: string[];
    nextSteps: string[];
  };
  totalTokensUsed: number;
  totalCost: number;
}

export interface ApiKeyConfig {
  key: string;
  isValid: boolean;
  lastValidated?: Date;
}

export const AGENT_ORDER: AgentName[] = ['clara', 'ethan', 'maya', 'isaac', 'leo'];

export const AGENT_INFO = {
  clara: {
    name: 'Clara – StoryMapper',
    purpose: 'Map the idea to a pain → goal arc',
    color: 'bg-danger-500',
  },
  ethan: {
    name: 'Ethan – MoatDetector',
    purpose: 'Assess clone risk + infra drag',
    color: 'bg-orange-500',
  },
  maya: {
    name: 'Maya – MarketRealityCheck',
    purpose: 'Analyse market saturation + timing',
    color: 'bg-yellow-500',
  },
  isaac: {
    name: 'Isaac – LeverageStack',
    purpose: 'Assess audience and leverage profile',
    color: 'bg-blue-500',
  },
  leo: {
    name: 'Leo – BuildOrNot',
    purpose: 'Final scorecard and verdict',
    color: 'bg-purple-500',
  },
} as const;
