import { useState } from "react";
import { Eye, Wallet, Coins, TrendingUp, TrendingDown, BarChart3, ArrowLeft, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for analytics
const analyticsData = {
  currentBalance: 2219.10,
  lastMonthBalance: 1875.50,
  percentageChange: 18.32
};

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<'account' | 'rewards'>('account');
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="px-4 mt-6 relative z-10">
      <AnimatePresence>
        <motion.div
          initial={false}
          animate={{ rotateY: showAnalytics ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full max-w-[324px] mx-auto"
        >
          {/* Front of Card */}
          <motion.div
            style={{ backfaceVisibility: "hidden" }}
            animate={{ opacity: showAnalytics ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#00695C] rounded-2xl p-4 shadow-lg relative min-h-[180px]">
              {/* Analytics Toggle Button */}
              <button 
                onClick={() => setShowAnalytics(true)}
                className="absolute bottom-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <BarChart3 className="w-3 h-3 text-white/70" />
              </button>

              {/* Top Navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`flex items-center px-2.5 py-1 rounded-full transition-colors ${activeTab === 'account' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  <Wallet className="w-3 h-3 mr-1 text-white" />
                  <span className="text-white text-[10px] font-medium">easypaisa Account</span>
                </button>
                <button
                  onClick={() => setActiveTab('rewards')}
                  className={`flex items-center px-2.5 py-1 rounded-full transition-colors ${activeTab === 'rewards' ? 'bg-white/20' : 'hover:bg-white/10'}`}
                >
                  <div className="w-3 h-3 mr-1 relative">
                    <Coins className="w-3 h-3 text-[#FFD700] absolute" />
                  </div>
                  <span className="text-white text-[10px] font-medium">My Rewards</span>
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
                  
                  {/* Small Analytics Preview */}
                  <div className="flex items-center gap-1 mt-2">
                    <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full ${
                      analyticsData.percentageChange >= 0 ? 'bg-[#00AB41]/20' : 'bg-red-500/20'
                    }`}>
                      {analyticsData.percentageChange >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-[#00AB41]" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-[10px] ${
                        analyticsData.percentageChange >= 0 ? 'text-[#00AB41]' : 'text-red-500'
                      }`}>
                        {analyticsData.percentageChange}%
                      </span>
                    </div>
                    <span className="text-white/50 text-[9px]">vs last month</span>
                  </div>
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
          </motion.div>

          {/* Back of Card (Analytics) */}
          <motion.div
            style={{ backfaceVisibility: "hidden", rotateY: 180 }}
            className="absolute top-0 left-0 w-full"
            animate={{ opacity: showAnalytics ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#00695C] rounded-2xl p-4 shadow-lg relative min-h-[180px]">
              {/* Back Button */}
              <button 
                onClick={() => setShowAnalytics(false)}
                className="absolute top-4 left-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-3 h-3 text-white/70" />
              </button>

              <div className="mt-6">
                {/* Monthly Comparison */}
                <div className="space-y-3">
                  {/* Budget Progress - Main Focus */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white text-[10px] font-medium">Monthly Budget</span>
                      <span className="text-white text-[10px]">Rs. 50,000</span>
                    </div>
                    <div className="relative h-6 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full w-[65%] bg-gradient-to-r from-[#00AB41] to-[#008866] rounded-full"
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-between px-3">
                        <div className="flex items-center gap-1">
                          <Target className="w-3 h-3 text-white" />
                          <span className="text-white text-[9px]">Rs. 32,500 spent</span>
                        </div>
                        <span className="text-white text-[9px]">Rs. 17,500 left</span>
                      </div>
                    </div>
                  </div>

                  {/* This Month vs Last Month */}
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-white/70 text-[9px] mb-1">This Month</p>
                      <div className="flex items-center gap-1">
                        <span className="text-white text-sm font-medium">Rs. 2,219.10</span>
                        <TrendingUp className="w-3 h-3 text-[#00AB41]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-white/70 text-[9px] mb-1">Last Month</p>
                      <span className="text-white text-sm font-medium">Rs. 1,875.50</span>
                    </div>
                  </div>

                  {/* Month over Month Changes */}
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[#00AB41] text-[9px]">+18.32%</span>
                        <TrendingUp className="w-2.5 h-2.5 text-[#00AB41]" />
                      </div>
                      <span className="text-white/50 text-[9px]">vs last month</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
