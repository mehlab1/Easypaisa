import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { walletBalance } from "@/lib/mockData";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="px-4 -mt-8 relative z-10">
      <Card className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#333333] font-medium">Wallet Balance</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? (
              <Eye className="w-4 h-4 text-gray-400" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </Button>
        </div>
        
        <div className="text-3xl font-bold text-[#333333] mb-6">
          {showBalance ? `₨ ${walletBalance.toLocaleString()}.00` : "₨ ••••••"}
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1 border-white bg-transparent text-white hover:bg-white/10 rounded-full py-3 px-4 font-medium text-sm"
          >
            Upgrade Account
          </Button>
          <Button className="flex-1 bg-white text-[#A7C638] hover:bg-gray-50 rounded-full py-3 px-4 font-medium text-sm">
            Add Cash
          </Button>
        </div>
      </Card>
    </div>
  );
}
