import { Button } from "@/components/ui/button";
import BudgetSummary from "@/components/budget/BudgetSummary";
import BudgetCategoryRow from "@/components/budget/BudgetCategoryRow";
import { budgetCategories } from "@/lib/mockData";

export default function Budget() {
  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#333333]">Budget Dashboard</h1>
        <Button className="bg-[#A7C638] hover:bg-[#96B032] text-white rounded-full text-sm font-medium">
          Set Budget
        </Button>
      </div>

      <BudgetSummary />

      <div className="space-y-4">
        {budgetCategories.map((category, index) => (
          <BudgetCategoryRow key={index} category={category} />
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
        <h3 className="font-semibold text-[#333333] mb-4">Category Breakdown</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization will be implemented here</p>
        </div>
      </div>
    </div>
  );
}
