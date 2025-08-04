import { Send, Receipt, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

const quickActions = [
  { icon: Send, label: "Send Money", color: "text-green-500" },
  { icon: Receipt, label: "Bill Payment", color: "text-green-500" },
  { icon: Smartphone, label: "Mobile Packages", color: "text-green-500" }
];

export default function QuickActionsGrid() {
  return (
    <div className="px-4 mt-6">
      <div className="grid grid-cols-3 gap-4 max-w-[324px] mx-auto">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <Card
              key={index}
              className="bg-white rounded-2xl p-4 text-center shadow-sm cursor-pointer hover:shadow-md transition-shadow aspect-square flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Icon className={`w-6 h-6 ${action.color}`} />
              </div>
              <p className="text-xs font-medium text-black leading-tight">{action.label}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
