import { useState } from "react";
import GradientHeader from "@/components/home/GradientHeader";
import BalanceCard from "@/components/home/BalanceCard";
import SuggestionCard from "@/components/home/SuggestionCard";
import QuickActionsGrid from "@/components/home/QuickActionsGrid";
import MoreWithEasypaisa from "@/components/home/MoreWithEasypaisa";
import OfferCard from "@/components/home/OfferCard";
import ChatDrawer from "@/components/ChatDrawer";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <GradientHeader onOpenChat={() => setIsChatOpen(true)} />
      <BalanceCard />
      <SuggestionCard />
      <QuickActionsGrid />
      <MoreWithEasypaisa />
      <OfferCard />
      
      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onOpen={() => setIsChatOpen(true)}
      />
    </div>
  );
}
