
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Bell,
  User,
  Menu,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConnectWallet } from "../web3/ConnectWallet";

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-winfinity-blue/20 backdrop-blur-lg bg-winfinity-darker-blue/80">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" className="text-winfinity-cyan">
            <Menu size={24} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        
        {/* Removed website name and navigation links that are in sidebar */}
        <div className="flex-1"></div>
        
        <div className="flex items-center gap-4">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center relative md:w-64">
              <input
                type="search"
                placeholder="Search games..."
                className="w-full bg-winfinity-blue/20 text-white border-0 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-winfinity-cyan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Search className="absolute left-3 text-winfinity-cyan" size={18} />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute right-1"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={18} />
              </Button>
            </form>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-winfinity-cyan"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={24} />
              <span className="sr-only">Search</span>
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="text-winfinity-cyan">
            <Bell size={24} />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <div className="hidden md:block">
            <ConnectWallet />
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full bg-winfinity-blue/20">
            <User size={24} className="text-winfinity-cyan" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
