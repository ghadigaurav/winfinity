
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spade, Coins, Diamond } from "lucide-react";

const SlotsPage = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [slots, setSlots] = useState([0, 0, 0]);
  
  const symbols = ["🍒", "🔔", "🍋", "💎", "7️⃣", "🍀", "⭐"];
  
  const spinSlots = () => {
    setIsSpinning(true);
    
    // Simulate spinning animation
    const spinInterval = setInterval(() => {
      setSlots([
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length)
      ]);
    }, 100);
    
    // Stop spinning after 2 seconds
    setTimeout(() => {
      clearInterval(spinInterval);
      setIsSpinning(false);
      
      // Final result
      setSlots([
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length)
      ]);
    }, 2000);
  };
  
  const checkWin = () => {
    if (slots[0] === slots[1] && slots[1] === slots[2]) {
      return true;
    }
    return false;
  };
  
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Crypto Slots
        </h1>
        <p className="text-white/80 mb-6 max-w-3xl">
          Spin the reels and match symbols to win. All results are provably fair using Chainlink VRF.
        </p>
        
        <Card className="bg-winfinity-blue/20 border-winfinity-purple/20 overflow-hidden p-6 max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-center items-center gap-4 my-8">
              {slots.map((symbolIndex, index) => (
                <div 
                  key={index} 
                  className="w-28 h-28 bg-winfinity-darker-blue flex items-center justify-center rounded-lg border-2 border-winfinity-purple text-5xl"
                >
                  {symbols[symbolIndex]}
                </div>
              ))}
            </div>
            
            {!isSpinning && checkWin() && (
              <div className="text-center my-4">
                <div className="inline-block animate-bounce bg-winfinity-cyan px-4 py-2 rounded-full text-winfinity-darker-blue font-bold">
                  Winner! 🎉
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-winfinity-blue text-winfinity-cyan">
                <Coins className="mr-2 h-4 w-4" />
                0.01 ETH
              </Button>
              <Button variant="outline" className="border-winfinity-blue text-winfinity-cyan">
                <Coins className="mr-2 h-4 w-4" />
                0.05 ETH
              </Button>
              <Button variant="outline" className="border-winfinity-blue text-winfinity-cyan">
                <Coins className="mr-2 h-4 w-4" />
                0.1 ETH
              </Button>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-winfinity-purple to-winfinity-cyan text-white button-shine px-8 py-6 text-lg"
              disabled={isSpinning}
              onClick={spinSlots}
            >
              {isSpinning ? "Spinning..." : "Spin"}
            </Button>
          </div>
        </Card>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Popular Slots</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { id: 1, title: "Crypto Vault", image: "https://images.unsplash.com/photo-1642790551116-304f59842e88?q=80&w=300&auto=format&fit=crop" },
            { id: 2, title: "Neon City", image: "https://images.unsplash.com/photo-1545486332-9e0999c535b2?q=80&w=300&auto=format&fit=crop" },
            { id: 3, title: "Diamond Rush", image: "https://images.unsplash.com/photo-1600077105425-1a8490f10a43?q=80&w=300&auto=format&fit=crop" },
            { id: 4, title: "Cosmic Spins", image: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=300&auto=format&fit=crop" }
          ].map(game => (
            <Card key={game.id} className="bg-winfinity-blue/20 border-winfinity-blue/30 overflow-hidden hover:border-winfinity-cyan/50 transition-all hover:shadow-lg hover:shadow-winfinity-cyan/10 group">
              <div className="relative h-36 overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-winfinity-darker-blue to-transparent opacity-60" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-sm font-semibold text-white">{game.title}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-white/80 mb-4">
          Our slots use Chainlink VRF (Verifiable Random Function) to generate provably fair outcomes.
          Each spin result is determined by cryptographic randomness that cannot be manipulated.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-winfinity-blue/20 p-4 rounded-lg">
            <Spade className="text-winfinity-purple mb-2" size={24} />
            <h3 className="text-white font-bold mb-2">Provably Fair</h3>
            <p className="text-white/70 text-sm">All results use verifiable on-chain randomness</p>
          </div>
          <div className="bg-winfinity-blue/20 p-4 rounded-lg">
            <Coins className="text-winfinity-cyan mb-2" size={24} />
            <h3 className="text-white font-bold mb-2">Instant Payouts</h3>
            <p className="text-white/70 text-sm">Winnings are automatically sent to your wallet</p>
          </div>
          <div className="bg-winfinity-blue/20 p-4 rounded-lg">
            <Diamond className="text-winfinity-pink mb-2" size={24} />
            <h3 className="text-white font-bold mb-2">96% RTP</h3>
            <p className="text-white/70 text-sm">Higher return-to-player than traditional casinos</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SlotsPage;
