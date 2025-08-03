import { Send, Smartphone, FileText, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { quickActions } from "@/lib/mockData";
import { useProvince } from "@/contexts/ProvinceContext";

const iconMap = {
  send: Send,
  mobile: Smartphone,
  bill: FileText,
  plus: Plus
};

const colorMap = {
  blue: "bg-blue-100 text-blue-500",
  green: "bg-green-100 text-green-500",
  teal: "bg-teal-100 text-teal-500",
  purple: "bg-purple-100 text-purple-500"
};

export default function QuickActionsGrid() {
  const { selectedProvince } = useProvince();
  
  return (
    <div className="px-4 mt-4">
      <h3 className="text-base font-semibold text-[#333333] mb-3">Quick Actions</h3>
      <div className="carousel-container flex space-x-3 overflow-x-auto">
        {quickActions.map((action, index) => {
          const Icon = iconMap[action.icon as keyof typeof iconMap];
          const colorClass = colorMap[action.color as keyof typeof colorMap];
          
          return (
            <Card
              key={index}
              className="min-w-[100px] bg-white rounded-xl p-3 text-center shadow-sm flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow relative"
            >
              {/* Cultural Element for first action */}
              {selectedProvince.id !== "none" && index === 0 && (
                <div className="absolute top-1 right-1 opacity-20">
                  <span className="text-sm">{selectedProvince.cultural.icons[1]}</span>
                </div>
              )}
              <div className={`w-10 h-10 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-xs font-medium text-[#333333]">{action.label}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
