
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThirdwebProvider } from "@/providers/ThirdwebProvider";
import { Layout } from "@/components/layout/Layout";
import HomePage from "@/pages/Index";
import LotteryPage from "@/pages/Lottery";
import CasinoPage from "@/pages/Casino";
import SlotsPage from "@/pages/Slots";
import BlackjackPage from "@/pages/Blackjack";
import CrashPage from "@/pages/Crash";
import PlinkoPage from "@/pages/Plinko";
import RewardsPage from "@/pages/Rewards";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThirdwebProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="lottery" element={<LotteryPage />} />
              <Route path="casino" element={<CasinoPage />} />
              <Route path="slots" element={<SlotsPage />} />
              <Route path="blackjack" element={<BlackjackPage />} />
              <Route path="crash" element={<CrashPage />} />
              <Route path="plinko" element={<PlinkoPage />} />
              <Route path="rewards" element={<RewardsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThirdwebProvider>
  </QueryClientProvider>
);

export default App;
