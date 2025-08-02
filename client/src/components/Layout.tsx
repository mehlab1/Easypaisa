import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import NavBar from "./NavBar";
import ChatDrawer from "./ChatDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const isMobile = useIsMobile();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className={`min-h-screen ${isMobile ? 'pb-20' : 'md:ml-20'}`}>
        {children}
      </div>

      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onOpen={() => setIsChatOpen(true)}
      />
    </div>
  );
}
