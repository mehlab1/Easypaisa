import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useProvince } from "@/contexts/ProvinceContext";

interface SaveForGoal {
  id: string;
  itemName: string;
  price: number;
  timeRequired: number; // in months
  categoryDeductions: CategoryDeduction[];
  useAIDeductions: boolean;
  createdAt: Date;
  targetDate: Date;
}

interface CategoryDeduction {
  category: string;
  percentage: number;
}

interface SaveForModalProps {
  onSave: (goal: SaveForGoal) => void;
}

const availableCategories = [
  "Groceries",
  "Fuel",
  "Utilities", 
  "Entertainment",
  "Transportation",
  "Shopping",
  "Healthcare",
  "Education",
  "Dining",
  "Subscriptions"
];

export default function SaveForModal({ onSave }: SaveForModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [timeRequired, setTimeRequired] = useState("");
  const [useAIDeductions, setUseAIDeductions] = useState(false);
  const [categoryDeductions, setCategoryDeductions] = useState<CategoryDeduction[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { selectedProvince } = useProvince();

  const handleAddCategory = () => {
    setCategoryDeductions([...categoryDeductions, { category: "", percentage: 0 }]);
  };

  const handleRemoveCategory = (index: number) => {
    setCategoryDeductions(categoryDeductions.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (index: number, field: keyof CategoryDeduction, value: string | number) => {
    const updated = [...categoryDeductions];
    updated[index] = { ...updated[index], [field]: value };
    setCategoryDeductions(updated);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!itemName.trim()) {
      newErrors.itemName = "Item name is required";
    }

    if (!price || parseFloat(price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!timeRequired || parseInt(timeRequired) <= 0) {
      newErrors.timeRequired = "Valid time period is required";
    }

    // Validate category deductions if user chose custom deductions
    if (!useAIDeductions && categoryDeductions.length > 0) {
      const totalPercentage = categoryDeductions.reduce((sum, cat) => sum + cat.percentage, 0);
      if (totalPercentage !== 100) {
        newErrors.categoryDeductions = "Category percentages must total 100%";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const goal: SaveForGoal = {
      id: Date.now().toString(),
      itemName: itemName.trim(),
      price: parseFloat(price),
      timeRequired: parseInt(timeRequired),
      categoryDeductions: useAIDeductions ? [] : categoryDeductions,
      useAIDeductions,
      createdAt: new Date(),
      targetDate: new Date(Date.now() + parseInt(timeRequired) * 30 * 24 * 60 * 60 * 1000)
    };

    onSave(goal);
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
    setItemName("");
    setPrice("");
    setTimeRequired("");
    setUseAIDeductions(false);
    setCategoryDeductions([]);
    setErrors({});
  };

  const totalPercentage = categoryDeductions.reduce((sum, cat) => sum + cat.percentage, 0);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`${selectedProvince.theme.buttonColor} ${selectedProvince.theme.buttonHover} text-white rounded-full text-xs font-medium px-3 py-1`}>
          Save For
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#333333]">Set Up Saving Goal</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Item Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="itemName" className="text-sm font-medium text-[#333333]">
                Item Name *
              </Label>
              <Input
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g., iPhone 15, Car Down Payment"
                className="mt-1"
              />
              {errors.itemName && (
                <p className="text-red-500 text-xs mt-1">{errors.itemName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-sm font-medium text-[#333333]">
                  Price (₨) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="50000"
                  className="mt-1"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <Label htmlFor="timeRequired" className="text-sm font-medium text-[#333333]">
                  Time Required (Months) *
                </Label>
                <Input
                  id="timeRequired"
                  type="number"
                  value={timeRequired}
                  onChange={(e) => setTimeRequired(e.target.value)}
                  placeholder="6"
                  className="mt-1"
                />
                {errors.timeRequired && (
                  <p className="text-red-500 text-xs mt-1">{errors.timeRequired}</p>
                )}
              </div>
            </div>
          </div>

          {/* Category Deductions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-[#333333]">
                Category Deductions (Optional)
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={useAIDeductions}
                  onCheckedChange={setUseAIDeductions}
                />
                <span className="text-sm text-gray-600">Let AI decide</span>
              </div>
            </div>

            {!useAIDeductions && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Set custom deductions:</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddCategory}
                    className="h-8"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Category
                  </Button>
                </div>

                {categoryDeductions.map((deduction, index) => (
                  <Card key={index} className="p-3">
                    <CardContent className="p-0">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <Select
                            value={deduction.category}
                            onValueChange={(value) => handleCategoryChange(index, "category", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-24">
                          <Input
                            type="number"
                            value={deduction.percentage}
                            onChange={(e) => handleCategoryChange(index, "percentage", parseInt(e.target.value) || 0)}
                            placeholder="%"
                            className="text-center"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCategory(index)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {categoryDeductions.length > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Percentage:</span>
                    <span className={`font-medium ${totalPercentage === 100 ? 'text-green-600' : 'text-red-600'}`}>
                      {totalPercentage}%
                    </span>
                  </div>
                )}

                {errors.categoryDeductions && (
                  <p className="text-red-500 text-xs">{errors.categoryDeductions}</p>
                )}
              </div>
            )}

            {useAIDeductions && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  AI will analyze your spending patterns and automatically suggest optimal category deductions for your saving goal.
                </p>
              </div>
            )}
          </div>

          {/* Summary */}
          {itemName && price && timeRequired && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <h4 className="font-medium text-[#333333] mb-2">Saving Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly saving needed:</span>
                    <span className="font-medium">₨ {(parseFloat(price) / parseInt(timeRequired)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target date:</span>
                    <span className="font-medium">
                      {new Date(Date.now() + parseInt(timeRequired) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className={`${selectedProvince.theme.buttonColor} ${selectedProvince.theme.buttonHover}`}>
            Create Saving Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 