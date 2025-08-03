import { useState } from "react";
import { Bot, Coins } from "lucide-react";
import { userProfile } from "@/lib/mockData";
import { useProvince } from "@/contexts/ProvinceContext";
import ProvinceSelector from "./ProvinceSelector";

interface GradientHeaderProps {
  onOpenChat?: () => void;
}

export default function GradientHeader({ onOpenChat }: GradientHeaderProps) {
  const { selectedProvince } = useProvince();

  return (
    <div className={`${selectedProvince.theme.gradient} h-28 relative px-4 pt-6`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-white/80 text-xs">{userProfile.accountType}</p>
          <h1 className="text-white text-lg font-semibold">{userProfile.name}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <ProvinceSelector />
          <div className="flex items-center space-x-1">
            <Coins className="w-3 h-3 text-yellow-400" />
            <span className="text-white text-xs">My Rewards</span>
          </div>
          <button onClick={onOpenChat} className="text-white">
            <Bot className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
