import { FileText } from "lucide-react";
import { suggestions } from "@/lib/mockData";

export default function SuggestionCard() {
  const suggestion = suggestions[0];

  return (
    <div className="px-4 mt-6">
      <div className="bg-[#E6F4EA] rounded-xl p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#A7C638]/20 rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-[#A7C638]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-[#333333]">{suggestion.title}</p>
          <p className="text-xs text-gray-600">{suggestion.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
