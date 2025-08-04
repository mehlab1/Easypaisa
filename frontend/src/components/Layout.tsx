import { useState } from "react";
import NavBar from "./NavBar";
import ChatDrawer from "./ChatDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-full flex flex-col">
      <NavBar />
      
      <div className="flex-1 pb-20">
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
