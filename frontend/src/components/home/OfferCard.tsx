import { Card } from "@/components/ui/card";

export default function OfferCard() {
  return (
    <div className="px-4 mt-6 mb-6">
      <Card className="bg-green-50 rounded-2xl p-4 max-w-[324px] mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-black mb-1">Get your easypaisa Debit Card</h3>
            <p className="text-xs text-gray-600">Apply now for easy access to your money</p>
          </div>
          <div className="w-16 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">CARD</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
