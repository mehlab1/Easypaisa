import { useState } from "react";
import { Eye, Wallet, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="px-4 mt-6 relative z-10">
      <Card className="bg-[#00695C] rounded-2xl p-4 shadow-lg w-full max-w-[324px] mx-auto min-h-[256px]">
        {/* Tabs Section */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg mr-2 ${
              activeTab === 'account'
                ? 'bg-[#00C853] text-white'
                : 'bg-white text-black'
            }`}
          >
            {activeTab === 'account' && <Wallet className="w-4 h-4 mr-2" />}
            <span className="text-sm font-medium">easypaisa Account</span>
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg ${
              activeTab === 'rewards'
                ? 'bg-[#00C853] text-white'
                : 'bg-white text-black'
            }`}
          >
            <span className="text-sm font-medium">My Rewards</span>
            {activeTab !== 'rewards' && <Star className="w-4 h-4 ml-2 text-[#FFD600]" />}
          </button>
        </div>

        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Balance Section */}
            <div className="mb-6">
              <p className="text-white text-sm font-normal mb-2">Available Balance</p>
              <div className="flex items-center mb-2">
                <span className="text-white text-3xl font-bold mr-4">
                  {showBalance ? "Rs. 2,219.10" : "Rs. ••••••"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBalance(!showBalance)}
                  className="h-auto w-auto p-0 hover:bg-transparent"
                >
                  <Eye className="w-5 h-5 text-white" />
                </Button>
              </div>
              <p className="text-white text-xs">Tap to hide balance</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4 ml-4">
            <Button className="bg-[#00C853] text-white hover:bg-[#00A847] rounded-full px-6 py-2 text-sm font-bold min-w-[100px]">
              Upgrade Account
            </Button>
            <Button className="bg-[#4CAF50] text-white hover:bg-[#45A049] rounded-full px-6 py-2 text-sm font-bold min-w-[100px]">
              Add Cash
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
