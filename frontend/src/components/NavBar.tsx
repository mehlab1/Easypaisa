import { useLocation } from "wouter";
import { 
  Home, 
  MapPin, 
  QrCode, 
  Gift, 
  User,
  PiggyBank
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "cash-points", label: "Cash Points", icon: MapPin, path: "/cash-points" },
  { id: "qr", label: "QR", icon: QrCode, path: "/qr" },
  { id: "budget", label: "Budget", icon: PiggyBank, path: "/budget" },
  { id: "account", label: "My Account", icon: User, path: "/account" }
];

export default function NavBar() {
  const [location, navigate] = useLocation();

  const handleNavigation = (path: string, id: string) => {
    if (id === "qr") {
      // Handle QR scanner functionality
      return;
    }
    navigate(path);
  };

  // Always show mobile navigation for iPhone frame
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
      <div className="flex justify-around items-center">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          const isQR = item.id === "qr";
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path, item.id)}
              className={cn(
                "flex flex-col items-center space-y-1",
                isQR && "-mt-4",
                isActive ? "text-[#A7C638]" : "text-gray-400"
              )}
            >
              {isQR ? (
                <div className="w-12 h-12 bg-[#A7C638] rounded-full flex items-center justify-center shadow-lg">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <>
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}


