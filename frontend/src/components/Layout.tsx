import { useState } from "react";
import NavBar from "./NavBar";
import ChatDrawer from "./ChatDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="h-full">
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
