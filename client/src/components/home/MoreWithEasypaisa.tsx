import { 
  Smartphone, 
  HandCoins, 
  PiggyBank, 
  Building2, 
  GraduationCap, 
  Coins,
  ShoppingCart,
  Car,
  Plane,
  Home,
  Shield,
  Heart
} from "lucide-react";
import { moreServices } from "@/lib/mockData";

const iconMap = {
  mobile: Smartphone,
  "hand-holding-usd": HandCoins,
  "piggy-bank": PiggyBank,
  university: Building2,
  "graduation-cap": GraduationCap,
  coins: Coins,
  "shopping-cart": ShoppingCart,
  car: Car,
  plane: Plane,
  home: Home,
  shield: Shield,
  heart: Heart
};

const colorMap = {
  orange: "bg-orange-100 text-orange-500",
  red: "bg-red-100 text-red-500",
  green: "bg-green-100 text-green-500",
  blue: "bg-blue-100 text-blue-500",
  purple: "bg-purple-100 text-purple-500",
  yellow: "bg-yellow-100 text-yellow-500",
  pink: "bg-pink-100 text-pink-500",
  indigo: "bg-indigo-100 text-indigo-500",
  cyan: "bg-cyan-100 text-cyan-500",
  emerald: "bg-emerald-100 text-emerald-500",
  slate: "bg-slate-100 text-slate-500",
  rose: "bg-rose-100 text-rose-500"
};

export default function MoreWithEasypaisa() {
  return (
    <div className="px-4 mt-8">
      <h3 className="text-lg font-semibold text-[#333333] mb-4">More with easypaisa</h3>
      <div className="carousel-container flex space-x-4 overflow-x-auto md:grid md:grid-cols-6 md:gap-4 md:overflow-visible">
        {moreServices.map((service, index) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap];
          const colorClass = colorMap[service.color as keyof typeof colorMap];
          
          return (
            <div
              key={index}
              className="min-w-[80px] flex-shrink-0 text-center cursor-pointer"
            >
              <div className={`w-14 h-14 ${colorClass} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-xs text-gray-600">{service.label}</p>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center space-x-2 mt-4 md:hidden">
        <div className="w-2 h-2 bg-[#A7C638] rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
