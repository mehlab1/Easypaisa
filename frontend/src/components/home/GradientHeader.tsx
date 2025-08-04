import { useState } from "react";
import { Search, Bell, ChevronRight, Menu } from "lucide-react";

interface GradientHeaderProps {
  onOpenChat?: () => void;
}

export default function GradientHeader({ onOpenChat }: GradientHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-[#d7ffe5] to-[#c7f7d4] h-10 relative px-4">
      <div className="flex items-center justify-between h-full">
        {/* Left Side - Profile and Menu */}
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-[10px] font-medium">MM</span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <div className="w-3.5 h-[1.5px] bg-gray-600/60 rounded-full"></div>
            <div className="w-3.5 h-[1.5px] bg-gray-600/60 rounded-full"></div>
            <div className="w-3.5 h-[1.5px] bg-gray-600/60 rounded-full"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-[#00C853] rounded-full flex items-center justify-center">
              <span className="text-white text-[14px] font-medium italic leading-none">e</span>
            </div>
            <span className="text-gray-700 text-[11px] font-medium">digital bank</span>
          </div>
        </div>

        {/* Right Side - Icons */}
        <div className="flex items-center gap-4">
          <Search className="w-3.5 h-3.5 text-gray-600/80" />
          <Bell className="w-3.5 h-3.5 text-gray-600/80" />
          <ChevronRight className="w-3.5 h-3.5 text-gray-600/80" />
        </div>
      </div>
    </div>
  );
}
