import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Dices, Spade, TrendingUp, Armchair } from "lucide-react";

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
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Games</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { id: 1, title: "Sweet Bonanza", image: "https://images.unsplash.com/photo-1611486212355-d276af4581e0?q=80&w=300&auto=format&fit=crop" },
            { id: 2, title: "Fruit Party", image: "https://images.unsplash.com/photo-1595778835999-6b77e4ba0e16?q=80&w=300&auto=format&fit=crop" },
            { id: 3, title: "Gates of Olympus", image: "https://images.unsplash.com/photo-1566345984367-57e7ec5133a5?q=80&w=300&auto=format&fit=crop" },
            { id: 4, title: "Sugar Rush", image: "https://images.unsplash.com/photo-1630479543894-a79a71fedefe?q=80&w=300&auto=format&fit=crop" },
            { id: 5, title: "Wild West", image: "https://images.unsplash.com/photo-1472698938026-79bed881e5b7?q=80&w=300&auto=format&fit=crop" },
            { id: 6, title: "Starlight Princess", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=300&auto=format&fit=crop" }
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
        
        <div className="text-center mt-6">
          <Button variant="outline" className="border-winfinity-blue/40 text-winfinity-cyan hover:bg-winfinity-blue/20">
            View All Games <ChevronRight size={16} className="ml-2" />
          </Button>
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
