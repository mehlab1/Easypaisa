import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { walletBalance } from "@/lib/mockData";
import { useProvince } from "@/contexts/ProvinceContext";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const { selectedProvince } = useProvince();

  return (
    <div className="px-4 -mt-6 relative z-10">
      <Card className="bg-white rounded-xl p-4 shadow-lg relative">
        {/* Cultural Element */}
        {selectedProvince.id !== "none" && (
          <div className="absolute top-2 right-2 opacity-30">
            <span className="text-2xl">{selectedProvince.cultural.icons[0]}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[#333333] font-medium text-sm">Wallet Balance</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalance(!showBalance)}
            className="h-6 w-6 p-0"
          >
            {showBalance ? (
              <Eye className="w-3 h-3 text-gray-400" />
            ) : (
              <EyeOff className="w-3 h-3 text-gray-400" />
            )}
          </Button>
        </div>
        
        <div className="text-2xl font-bold text-[#333333] mb-4">
          {showBalance ? `₨ ${walletBalance.toLocaleString()}.00` : "₨ ••••••"}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex-1 border-white bg-transparent text-white hover:bg-white/10 rounded-full py-2 px-3 font-medium text-xs"
          >
            Upgrade Account
          </Button>
          <Button className={`flex-1 bg-white ${selectedProvince.theme.buttonColor} hover:bg-gray-50 rounded-full py-2 px-3 font-medium text-xs`}>
            Add Cash
          </Button>
        </div>
      </Card>
    </div>
  );
}
