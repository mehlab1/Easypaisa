import { useState } from "react";
import NavBar from "./NavBar";
import ChatDrawer from "./ChatDrawer";
import CulturalTheme from "./home/CulturalTheme";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-full bg-white">
      <CulturalTheme />
      <NavBar />
      
      <div className="h-full pb-20">
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
