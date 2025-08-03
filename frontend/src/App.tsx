import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProvinceProvider } from "@/contexts/ProvinceContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Budget from "@/pages/Budget";
import CashPoints from "@/pages/CashPoints";
import Account from "@/pages/Account";
import NotFound from "@/pages/not-found";


function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/budget" component={Budget} />
        <Route path="/cash-points" component={CashPoints} />
        <Route path="/account" component={Account} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="relative">
            {/* iPhone Frame */}
            <div className="relative w-[375px] h-[812px] bg-black rounded-[60px] p-3 shadow-2xl scale-75 sm:scale-90 md:scale-100">
              {/* Screen */}
              <div className="relative w-full h-full bg-white rounded-[52px] overflow-hidden">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-11 bg-white z-10 flex items-center justify-between px-8 pt-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium">Jazz</span>
                    <div className="w-4 h-2 bg-black rounded-sm"></div>
                  </div>
                  <span className="text-xs font-medium">00:32</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-2 bg-black rounded-sm"></div>
                    <div className="w-4 h-2 bg-black rounded-sm"></div>
                    <div className="w-6 h-3 bg-black rounded-sm"></div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="pt-11 h-full overflow-y-auto bg-white">
                  <ProvinceProvider>
                    <Router />
                  </ProvinceProvider>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
