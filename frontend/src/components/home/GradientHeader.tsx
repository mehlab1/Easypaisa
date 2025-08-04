import { useState } from "react";
import { Search, Bell, ChevronRight, Menu } from "lucide-react";

interface GradientHeaderProps {
  onOpenChat?: () => void;
}

export default function GradientHeader({ onOpenChat }: GradientHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-[#E0F7E0] to-[#C0EBC0] h-14 relative px-4 pt-2">
      <div className="flex justify-between items-center h-12">
        {/* Left Side - Profile and Menu */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#D3D3D3] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">MM</span>
          </div>
          <Menu className="w-6 h-6 text-white" />
        </div>

        {/* Center - Logo */}
        <div className="flex items-center space-x-1">
          <div className="w-8 h-8 bg-[#00C853] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg italic">e</span>
          </div>
          <span className="text-black font-bold text-lg">digital bank</span>
        </div>

        {/* Right Side - Navigation Icons */}
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 text-white" />
          <Bell className="w-6 h-6 text-white" />
          <ChevronRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
