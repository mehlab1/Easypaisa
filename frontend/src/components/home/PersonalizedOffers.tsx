import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tag, Clock, Gift, Ticket, ArrowRight } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "30% Cashback",
    description: "On your first metro ticket purchase",
    expiresIn: "2 days",
    backgroundColor: "from-[#FF6B6B] to-[#FFE66D]",
    icon: Ticket,
    borderColor: "border-red-400",
    type: "Limited Time"
  },
  {
    id: 2,
    title: "Buy 1 Get 1",
    description: "On selected food items via easypaisa",
    expiresIn: "7 days",
    backgroundColor: "from-[#4ECDC4] to-[#A1F4E0]",
    icon: Gift,
    borderColor: "border-teal-400",
    type: "Special Deal"
  },
  {
    id: 3,
    title: "500 Bonus Points",
    description: "On bill payments above Rs. 5000",
    expiresIn: "5 days",
    backgroundColor: "from-[#9B5DE5] to-[#F15BB5]",
    icon: Tag,
    borderColor: "border-purple-400",
    type: "Rewards"
  }
];

export default function PersonalizedOffers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const currentOffer = offers[currentIndex];

  return (
    <div className="px-4 mt-6 mb-8">
      <div className="max-w-[324px] mx-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-[#333333]">Personalized Offers</p>
          <button className="flex items-center text-[10px] text-[#00C853] hover:text-[#00B548]">
            View All <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        {/* Navigation dots at the top */}
        <div className="flex justify-center gap-1.5 mb-3">
          {offers.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-[#00C853]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="relative">
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" 
                 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {offers.map((offer, index) => (
                <Card
                  key={offer.id}
                  className={`relative border ${offer.borderColor} flex-shrink-0 w-full hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${offer.backgroundColor} opacity-10`} />
                  
                  <div className="relative p-3 flex items-start">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${offer.backgroundColor} flex items-center justify-center flex-shrink-0`}>
                      {offer.icon && <offer.icon className="w-4 h-4 text-white" />}
                    </div>
                    
                    <div className="ml-2.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-[#333333] truncate">{offer.title}</p>
                        <div className="flex items-center text-[10px] text-gray-500">
                          <Clock className="w-3 h-3 mr-0.5" />
                          {offer.expiresIn}
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-600">{offer.description}</p>
                      <p className="text-[9px] text-[#00C853] mt-1">{offer.type}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
