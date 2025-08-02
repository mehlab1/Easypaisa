import GradientHeader from "@/components/home/GradientHeader";
import BalanceCard from "@/components/home/BalanceCard";
import SuggestionCard from "@/components/home/SuggestionCard";
import QuickActionsGrid from "@/components/home/QuickActionsGrid";
import MoreWithEasypaisa from "@/components/home/MoreWithEasypaisa";
import OfferCard from "@/components/home/OfferCard";

export default function Home() {
  return (
    <div>
      <GradientHeader />
      <BalanceCard />
      <SuggestionCard />
      <QuickActionsGrid />
      <MoreWithEasypaisa />
      <OfferCard />
    </div>
  );
}
