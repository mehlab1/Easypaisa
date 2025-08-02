import { Card } from "@/components/ui/card";
import { budgetSummary } from "@/lib/mockData";

export default function BudgetSummary() {
  return (
    <Card className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-600">Total Budget</p>
          <p className="text-xl font-bold text-[#333333]">
            ₨ {budgetSummary.totalBudget.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Spent</p>
          <p className="text-xl font-bold text-red-500">
            ₨ {budgetSummary.spent.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Remaining</p>
          <p className="text-xl font-bold text-[#A7C638]">
            ₨ {budgetSummary.remaining.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
}
