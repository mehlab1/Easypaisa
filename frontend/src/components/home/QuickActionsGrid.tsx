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
      <div className="max-w-[324px] mx-auto">
        <p className="text-xs font-medium text-[#333333] mb-2.5">Next Best Action</p>
        <div className="grid grid-cols-3 gap-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <Card
                key={index}
                className="bg-white aspect-square text-center shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 cursor-pointer transition-all duration-200 flex flex-col items-center justify-center py-3 rounded-xl border border-gray-100"
              >
                <div className="w-8 h-8 bg-[#00C853]/10 rounded-full flex items-center justify-center mb-1.5">
                  <Icon className="w-4 h-4 text-[#00C853]" />
                </div>
                <p className="text-[11px] font-medium text-[#333333] leading-tight">{action.label}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
