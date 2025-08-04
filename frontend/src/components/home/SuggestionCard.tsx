import { FileText, Zap, Receipt, Smartphone, Gift, ChevronLeft, ChevronRight } from "lucide-react";
import { suggestions } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRef, useState } from "react";

export default function SuggestionCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'bill':
        return <Receipt className="w-4 h-4 text-[#00C853]" />;
      case 'saving':
        return <Zap className="w-4 h-4 text-[#00C853]" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-[#00C853]" />;
      case 'offer':
        return <Gift className="w-4 h-4 text-[#00C853]" />;
      default:
        return <Zap className="w-4 h-4 text-[#00C853]" />;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else {
      setCurrentIndex(prev => Math.min(suggestions.length - 1, prev + 1));
    }
  };

  return (
    <div className="px-4 mt-4">
      <div className="max-w-[324px] mx-auto">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-[#333333]">Smart Suggestions</p>
          <div className="flex space-x-1">
            {suggestions.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#00C853]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <Card className="bg-[#E6F4EA] p-2.5 flex items-center w-full">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            className="h-6 w-6 p-0 mr-1 hover:bg-[#00C853]/10"
          >
            <ChevronLeft className="w-4 h-4 text-[#00C853]" />
          </Button>

          <div className="overflow-hidden flex-1">
            <div 
              ref={scrollRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {suggestions.map((suggestion) => (
                <div 
                  key={suggestion.id}
                  className="flex items-center gap-2 w-full flex-shrink-0"
                >
                  <div className="w-7 h-7 bg-[#00C853]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    {getIcon(suggestion.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-[#333333] truncate">{suggestion.title}</p>
                    <p className="text-[11px] text-gray-600 truncate mt-0.5">{suggestion.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => scroll('right')}
            disabled={currentIndex === suggestions.length - 1}
            className="h-6 w-6 p-0 ml-1 hover:bg-[#00C853]/10"
          >
            <ChevronRight className="w-4 h-4 text-[#00C853]" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
