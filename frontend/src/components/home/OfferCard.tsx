import { Gift } from "lucide-react";
import { offers } from "@/lib/mockData";

export default function OfferCard() {
  const offer = offers[0];

  return (
    <div className="px-4 mt-4 mb-6">
      <div className="bg-[#FFF9E6] rounded-xl p-3 flex items-center space-x-3">
        <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
          <Gift className="w-4 h-4 text-yellow-600" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-[#333333]">{offer.text}</p>
        </div>
      </div>
    </div>
  );
}
