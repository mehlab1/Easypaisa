import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProvince } from "@/contexts/ProvinceContext";

export interface Province {
  id: string;
  name: string;
  flag: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  theme: {
    gradient: string;
    buttonColor: string;
    buttonHover: string;
  };
}

export const provinces: Province[] = [
  {
    id: "none",
    name: "Pakistan",
    flag: "🇵🇰",
    colors: {
      primary: "#A7C638",
      secondary: "#96B032",
      accent: "#7A9A28"
    },
    theme: {
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
      buttonColor: "bg-green-600",
      buttonHover: "hover:bg-green-700"
    },
    cultural: {
      icons: ["🏛️", "🌿", "💚"],
      patterns: ["geometric", "floral"],
      landmarks: ["Minar-e-Pakistan", "Faisal Mosque"],
      colors: ["#228B22", "#32CD32", "#006400"]
    }
  },
  {
    id: "punjab",
    name: "Punjab",
    flag: "🟡",
    colors: {
      primary: "#FFD700", // Gold
      secondary: "#FFA500", // Orange
      accent: "#FF8C00" // Dark Orange
    },
    theme: {
      gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
      buttonColor: "bg-yellow-500",
      buttonHover: "hover:bg-yellow-600"
    },
    cultural: {
      icons: ["🌾", "🏺", "🎭", "🪕"],
      patterns: ["phulkari", "geometric"],
      landmarks: ["Badshahi Mosque", "Lahore Fort", "Shalimar Gardens"],
      colors: ["#FFD700", "#FFA500", "#FF8C00", "#FF4500"]
    }
  },
  {
    id: "sindh",
    name: "Sindh",
    flag: "🟢",
    colors: {
      primary: "#228B22", // Forest Green
      secondary: "#32CD32", // Lime Green
      accent: "#006400" // Dark Green
    },
    theme: {
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      buttonColor: "bg-green-600",
      buttonHover: "hover:bg-green-700"
    },
    cultural: {
      icons: ["🌊", "🐪", "🏺", "🎨"],
      patterns: ["ajrak", "geometric"],
      landmarks: ["Mohenjo-daro", "Makli Necropolis", "Clifton Beach"],
      colors: ["#228B22", "#32CD32", "#006400", "#90EE90"]
    }
  },
  {
    id: "kpk",
    name: "Khyber Pakhtunkhwa",
    flag: "🔴",
    colors: {
      primary: "#DC143C", // Crimson
      secondary: "#FF4500", // Orange Red
      accent: "#8B0000" // Dark Red
    },
    theme: {
      gradient: "bg-gradient-to-br from-red-500 to-red-700",
      buttonColor: "bg-red-600",
      buttonHover: "hover:bg-red-700"
    },
    cultural: {
      icons: ["🏔️", "⚔️", "🎭", "🪕"],
      patterns: ["pashtun", "geometric"],
      landmarks: ["Khyber Pass", "Peshawar Museum", "Bala Hisar Fort"],
      colors: ["#DC143C", "#FF4500", "#8B0000", "#FF6347"]
    }
  },
  {
    id: "balochistan",
    name: "Balochistan",
    flag: "🔵",
    colors: {
      primary: "#4169E1", // Royal Blue
      secondary: "#1E90FF", // Dodger Blue
      accent: "#000080" // Navy
    },
    theme: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
      buttonColor: "bg-blue-600",
      buttonHover: "hover:bg-blue-700"
    },
    cultural: {
      icons: ["🏜️", "🐪", "⚓", "🏺"],
      patterns: ["balochi", "geometric"],
      landmarks: ["Gwadar Port", "Hingol National Park", "Ziarat"],
      colors: ["#4169E1", "#1E90FF", "#000080", "#87CEEB"]
    }
  }
];

export default function ProvinceSelector() {
  const { selectedProvince, setSelectedProvince } = useProvince();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Province Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="flex items-center justify-center bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 w-8 h-8 p-0"
      >
        <Globe className="w-4 h-4" />
      </Button>

             {/* Dropdown */}
       {isOpen && (
         <Card className="absolute top-full mt-2 right-0 w-64 bg-white shadow-lg border-0 z-50">
           <div className="p-3">
             <p className="text-xs text-gray-500 mb-3 px-1">Select Province</p>
             {provinces.map((province) => (
               <button
                 key={province.id}
                 onClick={() => {
                   setSelectedProvince(province);
                   setIsOpen(false);
                 }}
                 className={`w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                   selectedProvince.id === province.id ? 'bg-gray-100' : ''
                 }`}
               >
                 <div className="flex items-center space-x-3">
                   <span className="text-xl">{province.flag}</span>
                   <div>
                     <div className="text-sm font-medium text-gray-800">{province.name}</div>
                     <div className="flex space-x-1 mt-1">
                       {province.cultural.icons.slice(0, 3).map((icon, index) => (
                         <span key={index} className="text-xs">{icon}</span>
                       ))}
                     </div>
                   </div>
                 </div>
                 {selectedProvince.id === province.id && (
                   <Badge className="text-xs bg-green-100 text-green-800">Active</Badge>
                 )}
               </button>
             ))}
           </div>
         </Card>
       )}
    </div>
  );
} 