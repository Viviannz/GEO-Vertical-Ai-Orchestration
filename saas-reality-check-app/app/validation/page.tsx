'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage, generateSessionId } from '@/lib/storage';
import { callAgent } from '@/lib/anthropic';
import { ValidationSession, AgentName, AGENT_ORDER, AGENT_INFO } from '@/types';
import AgentStep from '@/components/AgentStep';
import ProgressBar from '@/components/ProgressBar';
import CostTracker from '@/components/CostTracker';

export default function ValidationPage() {
  const router = useRouter();
  const [session, setSession] = useState<ValidationSession | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for API key
    if (!storage.hasApiKey()) {
      router.push('/');
      return;
    }

    // Initialize new session
    const newSession: ValidationSession = {
      id: generateSessionId(),
      createdAt: new Date(),
      currentAgent: 'clara',
      responses: [],
      userInputs: {},
      totalTokensUsed: 0,
      totalCost: 0,
    };
    setSession(newSession);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !currentInput.trim()) return;

    setError('');
    setIsProcessing(true);

    try {
      const apiKey = storage.getApiKey();
      if (!apiKey) {
        router.push('/');
        return;
      }

      // Call the current agent
      const response = await callAgent(
        apiKey,
        session.currentAgent,
        currentInput,
        session.responses
      );

      // Update session
      const updatedSession: ValidationSession = {
        ...session,
        responses: [...session.responses, response],
        totalTokensUsed: session.totalTokensUsed + (response.tokensUsed || 0),
        totalCost: session.totalCost + (response.estimatedCost || 0),
      };

      // Move to next agent or finish
      const currentIndex = AGENT_ORDER.indexOf(session.currentAgent);
      if (currentIndex < AGENT_ORDER.length - 1) {
        updatedSession.currentAgent = AGENT_ORDER[currentIndex + 1];
      }

      setSession(updatedSession);
      storage.saveSession(updatedSession);
      setCurrentInput('');

    } catch (err: any) {
      setError(err.message || 'Failed to process request');
    } finally {
      setIsProcessing(false);
    }
  };

  const getPromptPlaceholder = (agent: AgentName): string => {
    const prompts: Record<AgentName, string> = {
      clara: 'Describe your AI startup idea. Who is it for? What problem does it solve? What does your tool help them do better?',
      ethan: 'Describe your tech stack. What powers your tool? (APIs, LLMs, custom code?) What makes it hard to replicate? Any owned IP or data?',
      maya: 'What niche or vertical are you targeting? What does your product do and what outcome does it promise?',
      isaac: 'Do you have a following or audience? What niche do you know deeply? Have you launched anything before? How do people find your work today?',
      leo: 'Review the analysis from all agents above. Type "generate verdict" to get your final assessment.',
    };
    return prompts[agent];
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-danger-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing validation session...</p>
        </div>
      </div>
    );
  }

  const currentAgentIndex = AGENT_ORDER.indexOf(session.currentAgent);
  const isComplete = session.responses.length === 5;

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-danger-600">
              SaaS Reality Check
            </h1>
            <CostTracker totalCost={session.totalCost} totalTokens={session.totalTokensUsed} />
          </div>
          <ProgressBar
            currentStep={currentAgentIndex}
            totalSteps={AGENT_ORDER.length}
            isComplete={isComplete}
          />
        </div>

        {/* Agent Responses */}
        <div className="space-y-6 mb-6">
          {session.responses.map((response, index) => (
            <AgentStep
              key={index}
              agent={response.agent}
              response={response.response}
              cost={response.estimatedCost}
              isComplete={true}
            />
          ))}

          {/* Current Agent Input */}
          {!isComplete && (
            <div className="bg-white rounded-lg shadow-lg border-2 border-danger-300 p-6">
              <div className="flex items-center mb-4">
                <div className={`w-3 h-3 rounded-full ${AGENT_INFO[session.currentAgent].color} mr-3`}></div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {AGENT_INFO[session.currentAgent].name}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                {AGENT_INFO[session.currentAgent].purpose}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={getPromptPlaceholder(session.currentAgent)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-danger-500 focus:border-danger-500 min-h-[150px]"
                  required
                  disabled={isProcessing}
                />

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isProcessing || !currentInput.trim()}
                    className="flex-1 bg-danger-600 hover:bg-danger-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Run ${AGENT_INFO[session.currentAgent].name}`
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Completion Message */}
          {isComplete && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-lg border-2 border-green-300 p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Validation Complete!
              </h2>
              <p className="text-gray-600 mb-6">
                You've received your verdict from all 5 agents.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Export Report
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="bg-danger-600 hover:bg-danger-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  New Validation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
