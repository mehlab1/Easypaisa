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
      <Progress 
        value={Math.min(category.percentage, 100)} 
        className="w-full h-2"
        style={{
          backgroundColor: '#e5e7eb'
        }}
      />
      <style jsx>{`
        .progress-indicator {
          background-color: ${category.isOverBudget ? '#ef4444' : '#A7C638'};
        }
      `}</style>
    </Card>
  );
}
