import { useState } from "react";
import { Eye, Wallet, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<'account' | 'rewards'>('account');

  return (
    <div className="px-4 mt-6 relative z-10">
      <Card className="bg-[#00695C] rounded-2xl p-4 shadow-lg w-full max-w-[324px] mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex items-center px-3 py-1.5 rounded-full ${activeTab === 'account' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <Wallet className="w-3.5 h-3.5 mr-1 text-white" />
            <span className="text-white text-[11px]">easypaisa Account</span>
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex items-center px-3 py-1.5 rounded-full ${activeTab === 'rewards' ? 'bg-white/20' : 'hover:bg-white/10'}`}
          >
            <div className="w-3.5 h-3.5 mr-1 relative">
              <Coins className="w-3.5 h-3.5 text-[#FFD700] absolute" />
            </div>
            <span className="text-white text-[11px]">My Rewards</span>
          </button>
        </div>

        <div className="flex justify-between items-start mt-2">
          {/* Balance Section */}
          <div>
            <p className="text-white text-[11px] mb-0.5 font-normal">Available Balance</p>
            <div className="flex items-center gap-1.5">
              <span className="text-white text-lg font-normal tracking-tight">
                {showBalance ? "Rs. 2,219.10" : "Rs. ••••••"}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="h-auto w-auto p-0 hover:bg-transparent opacity-70 hover:opacity-100"
              >
                <Eye className="w-3.5 h-3.5 text-white" />
              </Button>
            </div>
            <p className="text-white/70 text-[10px] mt-0.5">Tap to hide balance</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-1 mt-3">
            <Button
              variant="ghost"
              className="bg-[#008866]/90 hover:bg-[#008866] text-white text-[10px] px-3 py-0 h-6 rounded-full"
              onClick={() => {}}
            >
              Upgrade Account
            </Button>
            <Button 
              variant="ghost"
              className="bg-[#00AB41]/90 hover:bg-[#00AB41] text-white text-[10px] px-3 py-0 h-6 rounded-full"
              onClick={() => {}}
            >
              Add Cash
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
