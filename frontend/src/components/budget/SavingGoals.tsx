import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Target } from "lucide-react";

interface SaveForGoal {
  id: string;
  itemName: string;
  price: number;
  timeRequired: number;
  categoryDeductions: CategoryDeduction[];
  useAIDeductions: boolean;
  createdAt: Date;
  targetDate: Date;
  savedAmount?: number;
}

interface CategoryDeduction {
  category: string;
  percentage: number;
}

interface SavingGoalsProps {
  goals: SaveForGoal[];
  onDeleteGoal: (goalId: string) => void;
  onEditGoal: (goal: SaveForGoal) => void;
}

export default function SavingGoals({ goals, onDeleteGoal, onEditGoal }: SavingGoalsProps) {
  const calculateProgress = (goal: SaveForGoal) => {
    const saved = goal.savedAmount || 0;
    return Math.min((saved / goal.price) * 100, 100);
  };

  const calculateTimeRemaining = (goal: SaveForGoal) => {
    const now = new Date();
    const target = new Date(goal.targetDate);
    const diffTime = target.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatCurrency = (amount: number) => {
    return `₨ ${amount.toLocaleString()}`;
  };

  const getStatusColor = (goal: SaveForGoal) => {
    const progress = calculateProgress(goal);
    const daysRemaining = calculateTimeRemaining(goal);
    
    if (progress >= 100) return "bg-green-100 text-green-800";
    if (daysRemaining < 0) return "bg-red-100 text-red-800";
    if (daysRemaining < 30) return "bg-orange-100 text-orange-800";
    return "bg-blue-100 text-blue-800";
  };

  const getStatusText = (goal: SaveForGoal) => {
    const progress = calculateProgress(goal);
    const daysRemaining = calculateTimeRemaining(goal);
    
    if (progress >= 100) return "Completed";
    if (daysRemaining < 0) return "Overdue";
    if (daysRemaining < 30) return "Due Soon";
    return "On Track";
  };

  if (goals.length === 0) {
    return (
      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-6 text-center">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Saving Goals Yet</h3>
          <p className="text-gray-500 text-sm">
            Create your first saving goal to start tracking your progress towards your financial targets.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#333333]">Saving Goals</h3>
        <Badge variant="secondary" className="text-xs">
          {goals.length} {goals.length === 1 ? 'Goal' : 'Goals'}
        </Badge>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = calculateProgress(goal);
          const daysRemaining = calculateTimeRemaining(goal);
          const monthlyTarget = goal.price / goal.timeRequired;
          const saved = goal.savedAmount || 0;

          return (
            <Card key={goal.id} className="bg-white rounded-xl shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-[#333333] mb-1">
                      {goal.itemName}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getStatusColor(goal)}>
                        {getStatusText(goal)}
                      </Badge>
                      {goal.useAIDeductions && (
                        <Badge variant="outline" className="text-xs">
                          AI Optimized
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditGoal(goal)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteGoal(goal.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{formatCurrency(saved)} saved</span>
                    <span>{formatCurrency(goal.price)} target</span>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-600">Monthly Target</p>
                    <p className="text-sm font-semibold text-[#333333]">
                      {formatCurrency(monthlyTarget)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Time Remaining</p>
                    <p className="text-sm font-semibold text-[#333333]">
                      {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Target Date</p>
                    <p className="text-sm font-semibold text-[#333333]">
                      {goal.targetDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Category Deductions */}
                {goal.categoryDeductions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-600">Category Deductions:</p>
                    <div className="flex flex-wrap gap-2">
                      {goal.categoryDeductions.map((deduction, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {deduction.category}: {deduction.percentage}%
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {goal.useAIDeductions && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-700">
                      AI will automatically adjust category deductions based on your spending patterns.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 