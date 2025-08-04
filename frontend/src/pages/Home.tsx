import { useState } from "react";
import GradientHeader from "@/components/home/GradientHeader";
import BalanceCard from "@/components/home/BalanceCard";
import QuickActionsGrid from "@/components/home/QuickActionsGrid";
import MoreWithEasypaisa from "@/components/home/MoreWithEasypaisa";
import PersonalizedOffers from "@/components/home/PersonalizedOffers";
import SuggestionCard from "@/components/home/SuggestionCard";
import ChatDrawer from "@/components/ChatDrawer";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7E0] via-[#C0EBC0] to-white">
      <GradientHeader onOpenChat={() => setIsChatOpen(true)} />
      <BalanceCard />
      <SuggestionCard />
      <QuickActionsGrid />
      <MoreWithEasypaisa />
      <PersonalizedOffers />
      
      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onOpen={() => setIsChatOpen(true)}
      />
    </div>
  );
}
