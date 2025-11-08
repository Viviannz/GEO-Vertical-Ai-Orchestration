import { AGENT_ORDER, AGENT_INFO } from '@/types';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
}

export default function ProgressBar({ currentStep, totalSteps, isComplete }: ProgressBarProps) {
  const progress = isComplete ? 100 : ((currentStep / totalSteps) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">
          Validation Progress
        </h3>
        <span className="text-sm font-medium text-danger-600">
          {currentStep}/{totalSteps} Agents
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-danger-500 to-orange-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Agent Steps */}
      <div className="flex justify-between">
        {AGENT_ORDER.map((agent, index) => {
          const isActive = index === currentStep && !isComplete;
          const isDone = index < currentStep || isComplete;

          return (
            <div key={agent} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-danger-500 text-white animate-pulse'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {isDone ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold text-danger-600' : 'text-gray-500'}`}>
                {agent.charAt(0).toUpperCase() + agent.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
