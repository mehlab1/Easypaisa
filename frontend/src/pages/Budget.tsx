import { useState } from "react";
import { Button } from "@/components/ui/button";
import BudgetSummary from "@/components/budget/BudgetSummary";
import BudgetCategoryRow from "@/components/budget/BudgetCategoryRow";
import SaveForModal from "@/components/budget/SaveForModal";
import SavingGoals from "@/components/budget/SavingGoals";
import BudgetAssistant from "@/components/budget/BudgetAssistant";
import { budgetCategories, savingGoals, SaveForGoal } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { useProvince } from "@/contexts/ProvinceContext";

export default function Budget() {
  const [goals, setGoals] = useState<SaveForGoal[]>(savingGoals);
  const { toast } = useToast();
  const { selectedProvince } = useProvince();

  const handleSaveGoal = (newGoal: SaveForGoal) => {
    setGoals([...goals, newGoal]);
    toast({
      title: "Saving Goal Created",
      description: `Successfully created saving goal for ${newGoal.itemName}`,
    });
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    toast({
      title: "Goal Deleted",
      description: "Saving goal has been removed",
    });
  };

  const handleEditGoal = (goal: SaveForGoal) => {
    // For now, just show a toast. In a real app, you'd open an edit modal
    toast({
      title: "Edit Goal",
      description: `Edit functionality for ${goal.itemName} will be implemented`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7E0] via-[#C0EBC0] to-white px-3 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-[#333333]">Budget Dashboard</h1>
        <div className="flex space-x-2">
          <SaveForModal onSave={handleSaveGoal} />
          <Button className="bg-[#00C853] hover:bg-[#00B548] text-white rounded-full text-xs font-medium px-3 py-1">
            Set Budget
          </Button>
        </div>
      </div>

      <BudgetSummary />

      {/* Saving Goals Section */}
      <div className="mb-4">
        <SavingGoals 
          goals={goals}
          onDeleteGoal={handleDeleteGoal}
          onEditGoal={handleEditGoal}
        />
      </div>

      <div className="space-y-3">
        {budgetCategories.map((category, index) => (
          <BudgetCategoryRow key={index} category={category} />
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
        <h3 className="font-semibold text-[#333333] mb-3 text-sm">Category Breakdown</h3>
        <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-xs">Chart visualization will be implemented here</p>
        </div>
      </div>

      {/* AI Budget Assistant */}
      <BudgetAssistant />
    </div>
  );
}
