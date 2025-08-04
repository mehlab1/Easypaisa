import { Home, MapPin, PiggyBank, User } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
      <div className="flex justify-around items-center">
        <Link href="/">
          <a className={`flex flex-col items-center space-y-1 ${location === '/' ? 'text-[#00C853]' : 'text-gray-400'}`}>
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </a>
        </Link>
        
        <Link href="/cash-points">
          <a className={`flex flex-col items-center space-y-1 ${location === '/cash-points' ? 'text-[#00C853]' : 'text-gray-400'}`}>
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Cash Points</span>
          </a>
        </Link>

        <Link href="/budget">
          <a className={`flex flex-col items-center space-y-1 ${location === '/budget' ? 'text-[#00C853]' : 'text-gray-400'}`}>
            <PiggyBank className="w-5 h-5" />
            <span className="text-xs">Budget</span>
          </a>
        </Link>

        <Link href="/account">
          <a className={`flex flex-col items-center space-y-1 ${location === '/account' ? 'text-[#00C853]' : 'text-gray-400'}`}>
            <User className="w-5 h-5" />
            <span className="text-xs">My Account</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}
