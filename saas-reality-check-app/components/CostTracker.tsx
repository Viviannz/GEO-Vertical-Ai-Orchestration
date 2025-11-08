interface CostTrackerProps {
  totalCost: number;
  totalTokens: number;
}

export default function CostTracker({ totalCost, totalTokens }: CostTrackerProps) {
  return (
    <div className="bg-white rounded-lg shadow-md px-4 py-2 border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-xs text-gray-500">Total Cost</div>
          <div className="text-lg font-bold text-danger-600">
            ${totalCost.toFixed(4)}
          </div>
        </div>
        <div className="text-right border-l border-gray-300 pl-4">
          <div className="text-xs text-gray-500">Tokens</div>
          <div className="text-sm font-semibold text-gray-700">
            {totalTokens.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
