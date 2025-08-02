import { useLocation } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Home, 
  MapPin, 
  QrCode, 
  Gift, 
  User,
  Wallet,
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
  const isMobile = useIsMobile();

  const handleNavigation = (path: string, id: string) => {
    if (id === "qr") {
      // Handle QR scanner functionality
      return;
    }
    navigate(path);
  };

  if (isMobile) {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
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
                  <div className="w-14 h-14 bg-[#A7C638] rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <>
                    <Icon className="w-6 h-6" />
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

  return (
    <div className="hidden md:block fixed left-0 top-0 h-full w-20 bg-white shadow-md z-40">
      <div className="flex flex-col items-center py-6 h-full">
        <div className="mb-8">
          <div className="w-10 h-10 easypaisa-gradient rounded-full flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
        </div>
        
        <nav className="flex flex-col space-y-6 flex-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            const isQR = item.id === "qr";
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path, item.id)}
                className={cn(
                  "flex flex-col items-center space-y-1 hover:text-[#A7C638] transition-colors",
                  isActive ? "text-[#A7C638]" : "text-gray-400"
                )}
              >
                {isQR ? (
                  <div className="w-12 h-12 bg-[#A7C638] rounded-full flex items-center justify-center -mt-2">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <>
                    <Icon className="w-6 h-6" />
                    <span className="text-xs">{item.label}</span>
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
