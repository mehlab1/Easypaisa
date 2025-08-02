import { useState } from "react";
import { Bot, Coins } from "lucide-react";
import { userProfile } from "@/lib/mockData";

interface GradientHeaderProps {
  onOpenChat?: () => void;
}

export default function GradientHeader({ onOpenChat }: GradientHeaderProps) {
  return (
    <div className="easypaisa-gradient h-32 md:h-40 relative px-4 pt-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-white/80 text-sm">{userProfile.accountType}</p>
          <h1 className="text-white text-xl font-semibold">{userProfile.name}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm">My Rewards</span>
          </div>
          <button onClick={onOpenChat} className="text-white">
            <Bot className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
