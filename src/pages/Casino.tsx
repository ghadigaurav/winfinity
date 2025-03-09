
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dices, Spade, TrendingUp, Armchair } from "lucide-react";

const CasinoPage = () => {
  const games = [
    {
      id: 1, 
      title: "Slots", 
      description: "Play a variety of exciting slot machines with different themes and bonus features.",
      icon: Spade,
      path: "/slots",
      color: "winfinity-purple",
      bgColor: "from-winfinity-blue/20 to-winfinity-purple/20"
    },
    {
      id: 2, 
      title: "Blackjack", 
      description: "Challenge the dealer in this classic card game. Get as close to 21 without going over.",
      icon: Armchair,
      path: "/blackjack",
      color: "winfinity-cyan",
      bgColor: "from-winfinity-blue/20 to-winfinity-cyan/20"
    },
    {
      id: 3, 
      title: "Crypto Crash", 
      description: "Place your bet and watch the multiplier rise. Cash out before it crashes!",
      icon: TrendingUp,
      path: "/crash",
      color: "winfinity-pink",
      bgColor: "from-winfinity-blue/20 to-winfinity-pink/20"
    },
    {
      id: 4, 
      title: "Plinko", 
      description: "Drop the ball and watch it bounce through pegs to determine your prize.",
      icon: Dices,
      path: "/plinko",
      color: "winfinity-yellow",
      bgColor: "from-winfinity-blue/20 to-winfinity-yellow/20"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Casino Games
        </h1>
        <p className="text-white/80 mb-6 max-w-3xl">
          Experience the thrill of our provably fair casino games. 
          All games use Chainlink VRF technology to ensure transparent and verifiable results.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map(game => (
            <Link key={game.id} to={game.path}>
              <Card className={`bg-gradient-to-br ${game.bgColor} border-${game.color}/20 hover:border-${game.color}/40 transition-all h-full hover:shadow-lg hover:shadow-${game.color}/10`}>
                <div className="p-6 h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-full bg-${game.color}/20 flex items-center justify-center mb-4`}>
                    <game.icon size={24} className={`text-${game.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-white/70 mb-4 flex-grow">{game.description}</p>
                  <Button className={`bg-${game.color} text-winfinity-darker-blue hover:bg-${game.color}/90 w-full mt-auto`}>
                    Play Now
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      
      <div>
        <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Provably Fair Gaming</h2>
          <p className="text-white/80 mb-4">
            All our casino games use Chainlink VRF (Verifiable Random Function) to ensure that the outcomes
            are completely random and cannot be manipulated by anyone, including us. This technology provides 
            mathematical proof that the results are fair and transparent.
          </p>
          <p className="text-white/80">
            You can verify the randomness of each game round on the blockchain, providing complete transparency
            and trust in the gaming experience.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CasinoPage;
