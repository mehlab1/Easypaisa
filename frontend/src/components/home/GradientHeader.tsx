import { useState } from "react";
import { Search, Bell, ChevronRight, Menu } from "lucide-react";

interface GradientHeaderProps {
  onOpenChat?: () => void;
}

export default function GradientHeader({ onOpenChat }: GradientHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-[#d7ffe5] to-[#c7f7d4] h-12 relative px-3">
      <div className="flex items-center justify-between h-full">
        {/* Left Side - Profile and Menu */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-xs font-medium">MM</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-4 h-[2px] bg-gray-600/70 rounded-full"></div>
            <div className="w-4 h-[2px] bg-gray-600/70 rounded-full"></div>
            <div className="w-4 h-[2px] bg-gray-600/70 rounded-full"></div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 bg-[#00C853] rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-lg font-medium italic leading-none">e</span>
            </div>
            <span className="text-gray-700 text-sm font-medium">digital bank</span>
          </div>
        </div>

        {/* Right Side - Icons */}
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-gray-600" />
          <Bell className="w-4 h-4 text-gray-600" />
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
