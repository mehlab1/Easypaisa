import { Send, Smartphone, FileText, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { quickActions } from "@/lib/mockData";

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
  return (
    <div className="px-4 mt-6">
      <h3 className="text-lg font-semibold text-[#333333] mb-4">Quick Actions</h3>
      <div className="carousel-container flex space-x-4 overflow-x-auto md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
        {quickActions.map((action, index) => {
          const Icon = iconMap[action.icon as keyof typeof iconMap];
          const colorClass = colorMap[action.color as keyof typeof colorMap];
          
          return (
            <Card
              key={index}
              className="min-w-[140px] md:min-w-0 bg-white rounded-xl p-4 text-center shadow-sm flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-[#333333]">{action.label}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
