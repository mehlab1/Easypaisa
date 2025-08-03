import { Card } from "@/components/ui/card";
import { budgetSummary } from "@/lib/mockData";

export default function BudgetSummary() {
  return (
    <Card className="bg-white rounded-xl p-4 shadow-sm mb-4">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-gray-600">Total Budget</p>
          <p className="text-lg font-bold text-[#333333]">
            ₨ {budgetSummary.totalBudget.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Spent</p>
          <p className="text-lg font-bold text-red-500">
            ₨ {budgetSummary.spent.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Remaining</p>
          <p className="text-lg font-bold text-[#A7C638]">
            ₨ {budgetSummary.remaining.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}
