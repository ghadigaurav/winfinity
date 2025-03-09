
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Ticket, 
  Dices, 
  Spade, 
  TrendingUp, 
  Armchair, 
  Award, 
  Users, 
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Diamond
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  // Listen for wallet balance updates from other components
  useEffect(() => {
    const handleWalletUpdate = (event: CustomEvent) => {
      const { amount } = event.detail;
      setWalletBalance(prev => {
        const newBalance = prev + amount;
        return Math.max(0, newBalance); // Ensure balance doesn't go below 0
      });
    };

    window.addEventListener('walletUpdate', handleWalletUpdate as EventListener);
    
    return () => {
      window.removeEventListener('walletUpdate', handleWalletUpdate as EventListener);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const NavItem = ({ 
    to, 
    icon: Icon, 
    label 
  }: { 
    to: string; 
    icon: any; 
    label: string;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center py-2 px-3 rounded-lg transition-colors",
        isActive 
          ? "bg-winfinity-blue text-winfinity-cyan" 
          : "text-gray-400 hover:text-white hover:bg-winfinity-blue/30",
        isCollapsed && "justify-center px-2",
      )}
    >
      <Icon size={20} className={cn("min-w-[20px]", isCollapsed ? "mx-auto" : "mr-3")} />
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 bg-winfinity-dark-blue border-r border-winfinity-blue/20 transition-all duration-300 overflow-y-auto scrollbar-hidden z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full py-4">
        <div className="px-4 mb-6 flex items-center">
          {!isCollapsed && (
            <div className="flex flex-col items-center w-full">
              <div className="flex items-center gap-2">
                <Diamond size={28} className="text-winfinity-cyan animate-pulse" />
                <span className="text-xl font-bold tracking-wider text-white">WINFINITY</span>
              </div>
              <span className="text-winfinity-cyan text-sm mt-1">3.0</span>
            </div>
          )}
          {isCollapsed && (
            <Diamond size={28} className="text-winfinity-cyan mx-auto animate-pulse" />
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn(
            "absolute top-4 -right-3 h-6 w-6 rounded-full p-0 bg-winfinity-blue text-winfinity-cyan border border-winfinity-blue/40",
            "hover:bg-winfinity-cyan hover:text-winfinity-dark-blue"
          )}
          onClick={toggleSidebar}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </Button>
        
        <div className="space-y-1 px-3">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/lottery" icon={Ticket} label="Lottery" />
          <NavItem to="/casino" icon={Dices} label="Casino" />
          <NavItem to="/slots" icon={Spade} label="Slots" />
          <NavItem to="/blackjack" icon={Armchair} label="Blackjack" />
          <NavItem to="/crash" icon={TrendingUp} label="Crash" />
          <NavItem to="/plinko" icon={Dices} label="Plinko" />
        </div>
        
        <div className="mt-6 px-3">
          <div className={cn("text-xs font-semibold text-gray-500 mb-2", isCollapsed && "text-center")}>
            {!isCollapsed && "REWARDS"}
          </div>
          <div className="space-y-1">
            <NavItem to="/rewards" icon={Award} label="My Rewards" />
            <NavItem to="/community" icon={Users} label="Community" />
          </div>
        </div>
        
        <div className="mt-auto px-3">
          <div className="space-y-1">
            <NavItem to="/support" icon={LifeBuoy} label="Help & Support" />
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="mt-6 mx-3 p-3 rounded-lg bg-gradient-to-r from-winfinity-purple/20 to-winfinity-cyan/20 border border-white/5 mb-8">
            <p className="text-xs text-gray-300 mb-2">
              Current Balance
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <Diamond size={16} className="text-winfinity-cyan" />
                <span className="font-bold text-white">{walletBalance.toFixed(2)} WINF</span>
              </div>
              <Button 
                size="sm" 
                className="bg-winfinity-blue hover:bg-winfinity-blue/90 text-xs py-1 h-7"
                onClick={() => setIsWalletDialogOpen(true)}
              >
                View
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
        <DialogContent className="bg-winfinity-darker-blue border-winfinity-blue/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">WINF Token Details</DialogTitle>
            <DialogDescription className="text-white/70">
              Your WINF token holdings and value
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-between py-2 border-b border-winfinity-blue/20">
              <span className="text-white/70">WINF Balance:</span>
              <span className="text-white font-medium">{walletBalance.toFixed(2)} WINF</span>
            </div>
            <div className="flex justify-between py-2 border-b border-winfinity-blue/20">
              <span className="text-white/70">USD Value:</span>
              <span className="text-winfinity-cyan font-semibold">${(walletBalance * 0.25).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-winfinity-blue/20">
              <span className="text-white/70">Token Price:</span>
              <span className="text-winfinity-yellow font-semibold">$0.25 USD per WINF</span>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-winfinity-blue/20">
              <h4 className="font-medium text-white mb-2">Recent Transactions</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Cashback reward</span>
                  <span className="text-green-400">+0.35 WINF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Lottery consolation</span>
                  <span className="text-green-400">+0.20 WINF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Ticket purchase</span>
                  <span className="text-red-400">-0.15 WINF</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
};
