import { ReactNode } from "react";

interface iPhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export default function iPhoneFrame({ children, className = "" }: iPhoneFrameProps) {
  console.log("iPhoneFrame component is rendering");
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative">
        {/* iPhone Frame */}
        <div className="relative w-[375px] h-[812px] bg-black rounded-[60px] p-3 shadow-2xl scale-75 sm:scale-90 md:scale-100 border-4 border-red-500">
          {/* Screen */}
          <div className="relative w-full h-full bg-white rounded-[52px] overflow-hidden">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-11 bg-white z-10 flex items-center justify-between px-8 pt-2">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-medium">Jazz</span>
                <div className="w-4 h-2 bg-black rounded-sm"></div>
              </div>
              <span className="text-xs font-medium">00:32</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 bg-black rounded-sm"></div>
                <div className="w-4 h-2 bg-black rounded-sm"></div>
                <div className="w-6 h-3 bg-black rounded-sm"></div>
              </div>
            </div>

            {/* Content Area */}
            <div className="pt-11 h-full overflow-y-auto">
              {children}
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
} 