import { FileText } from "lucide-react";
import { suggestions } from "@/lib/mockData";

export default function SuggestionCard() {
  const suggestion = suggestions[0];

  return (
    <div className="px-4 mt-4">
      <div className="bg-[#E6F4EA] rounded-xl p-3 flex items-center space-x-3">
        <div className="w-8 h-8 bg-[#A7C638]/20 rounded-full flex items-center justify-center">
          <FileText className="w-4 h-4 text-[#A7C638]" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-[#333333]">{suggestion.title}</p>
          <p className="text-xs text-gray-600">{suggestion.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
