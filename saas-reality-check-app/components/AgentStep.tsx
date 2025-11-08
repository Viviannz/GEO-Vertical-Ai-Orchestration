import { AgentName, AGENT_INFO } from '@/types';
import ReactMarkdown from 'react-markdown';

interface AgentStepProps {
  agent: AgentName;
  response: string;
  cost?: number;
  isComplete: boolean;
}

export default function AgentStep({ agent, response, cost, isComplete }: AgentStepProps) {
  const agentInfo = AGENT_INFO[agent];

  return (
    <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${agentInfo.color} mr-3`}></div>
          <h3 className="text-xl font-bold text-gray-900">{agentInfo.name}</h3>
        </div>
        {cost !== undefined && (
          <span className="text-sm text-gray-500">
            ${cost.toFixed(4)}
          </span>
        )}
      </div>

      <div className="markdown prose prose-sm max-w-none">
        <ReactMarkdown>{response}</ReactMarkdown>
      </div>

      {isComplete && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center text-green-600 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Complete
          </div>
        </div>
      )}
    </div>
  );
}
