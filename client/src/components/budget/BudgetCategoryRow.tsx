import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetCategory {
  category: string;
  spent: number;
  limit: number;
  percentage: number;
  isOverBudget: boolean;
}

interface BudgetCategoryRowProps {
  category: BudgetCategory;
}

export default function BudgetCategoryRow({ category }: BudgetCategoryRowProps) {
  return (
    <Card className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-[#333333]">{category.category}</h3>
        <span className="text-sm text-gray-600">
          ₨ {category.spent.toLocaleString()} / ₨ {category.limit.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            category.isOverBudget ? 'bg-red-500' : 'bg-[#A7C638]'
          }`}
          style={{ width: `${Math.min(category.percentage, 100)}%` }}
        />
      </div>
    </Card>
  );
}
