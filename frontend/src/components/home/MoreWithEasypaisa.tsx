import { 
  Download, 
  HandCoins, 
  PiggyBank, 
  UserPlus,
  Zap,
  Receipt,
  Gift,
  ShoppingCart,
  Shield,
  FileX,
  Gamepad2,
  MoreHorizontal
} from "lucide-react";

const moreServices = [
  { icon: Download, label: "Easyload", color: "text-green-500" },
  { icon: HandCoins, label: "Easycash\nLoan", color: "text-green-500" },
  { icon: PiggyBank, label: "Savings\nPocket", color: "text-orange-500" },
  { icon: UserPlus, label: "Invite & Earn", color: "text-gray-500" },
  { icon: Zap, label: "ZU BRT", color: "text-red-500" },
  { icon: Receipt, label: "Term Deposit", color: "text-green-500" },
  { icon: Gift, label: "Daily Rewards", color: "text-green-500" },
  { icon: ShoppingCart, label: "Buy Now Pay\nLater", color: "text-green-500" },
  { icon: Shield, label: "Insurance\nMarketplace", color: "text-gray-500" },
  { icon: FileX, label: "M-Tag", color: "text-red-500" },
  { icon: Gamepad2, label: "Rs.1 Game", color: "text-green-500" },
  { icon: MoreHorizontal, label: "See All", color: "text-green-500" }
];

export default function MoreWithEasypaisa() {
  return (
    <div className="px-4 mt-6">
      <h3 className="text-base font-semibold text-black mb-4">More with easypaisa</h3>
      <div className="grid grid-cols-4 gap-4 max-w-[324px] mx-auto">
        {moreServices.slice(0, 8).map((service, index) => {
          const Icon = service.icon;
          
          return (
            <div
              key={index}
              className="text-center cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Icon className={`w-5 h-5 ${service.color}`} />
              </div>
              <p className="text-xs text-black leading-tight whitespace-pre-line">{service.label}</p>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-4 gap-4 max-w-[324px] mx-auto mt-4">
        {moreServices.slice(8, 12).map((service, index) => {
          const Icon = service.icon;
          
          return (
            <div
              key={index + 8}
              className="text-center cursor-pointer"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Icon className={`w-5 h-5 ${service.color}`} />
              </div>
              <p className="text-xs text-black leading-tight whitespace-pre-line">{service.label}</p>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center space-x-2 mt-4">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
