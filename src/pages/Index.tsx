
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Diamond, Ticket, Dices, ChevronRight, ChevronLeft, TrendingUp, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const [jackpot, setJackpot] = useState("128.74");
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const slides = [
    
    {
      title: "Daily Crypto Rewards",
      subtitle: "Exclusive for members",
      description: "Get up to 70% cashback on your gameplay. Join now!",
      cta: "Claim Rewards",
      path: "/rewards",
      gradient: "from-winfinity-pink to-winfinity-orange",
      image: "/lovable-uploads/2f90c80e-b2f7-4d62-bbdb-f607c0b17acd.png"
    },
    {
      title: "Weekend Tournament",
      subtitle: "March 10-12, 2025",
      description: "$100,000 prize pool. Compete in slots, blackjack, and more!",
      cta: "Register Now",
      path: "/casino",
      gradient: "from-winfinity-cyan to-winfinity-yellow",
      image: "/lovable-uploads/9608690a-c7fb-46b5-8bf2-e02d4573fb15.png"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot(prev => {
        const newValue = parseFloat(prev) + (Math.random() * 0.01);
        return newValue.toFixed(2);
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setShowAnimation(false);
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
        setShowAnimation(true);
      }, 200);
    }, 8000);
    
    setShowAnimation(true);
    
    return () => clearInterval(carouselTimer);
  }, [slides.length]);

  const nextSlide = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
      setShowAnimation(true);
    }, 200);
  };

  const prevSlide = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
      setShowAnimation(true);
    }, 200);
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <div className="relative overflow-hidden rounded-xl hero-bg">
        <div className={cn(
          "transition-opacity duration-500 ease-in-out",
          showAnimation ? "opacity-100" : "opacity-0"
        )}>
          <div className="relative h-[400px] md:h-[480px] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-winfinity-darker-blue via-winfinity-dark-blue to-winfinity-blue opacity-80 z-10" />
            {slides[currentSlide].image && (
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            )}
            <div className="relative z-20 flex flex-col md:flex-row h-full">
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-winfinity-cyan font-semibold mb-2 tracking-wider">
                  {slides[currentSlide].subtitle}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-white/80 text-lg mb-6 max-w-lg">
                  {slides[currentSlide].description}
                </p>
                
                
                
                <div>
                  <Link to={slides[currentSlide].path}>
                    <Button size="lg" className={cn(
                      "bg-gradient-to-r text-white button-shine",
                      `${slides[currentSlide].gradient}`
                    )}>
                      {slides[currentSlide].cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 rounded-full bg-black/30 border-white/10 text-white hover:bg-black/50"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </Button>
        
        <Button 
          variant="outline" 
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 rounded-full bg-black/30 border-white/10 text-white hover:bg-black/50"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </Button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentSlide === index 
                  ? "bg-white w-6" 
                  : "bg-white/30 hover:bg-white/50"
              )}
              onClick={() => {
                setShowAnimation(false);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setShowAnimation(true);
                }, 200);
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/lottery" className="group">
          <Card className="bg-gradient-to-br from-winfinity-blue/20 to-winfinity-purple/20 border-winfinity-purple/20 hover:border-winfinity-purple/40 transition-all hover:shadow-lg hover:shadow-winfinity-purple/10 overflow-hidden relative h-[180px]">
            <div className="p-6 relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">Lottery</h3>
                  <p className="text-white/70 mt-1">Daily draws with massive prizes</p>
                </div>
                <Ticket size={40} className="text-winfinity-purple opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-auto">
                <div className="flex items-center text-winfinity-cyan font-medium">
                  <span>Play Now</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-winfinity-purple/20 rounded-tl-full" />
          </Card>
        </Link>
        
        <Link to="/casino" className="group">
          <Card className="bg-gradient-to-br from-winfinity-blue/20 to-winfinity-cyan/20 border-winfinity-cyan/20 hover:border-winfinity-cyan/40 transition-all hover:shadow-lg hover:shadow-winfinity-cyan/10 overflow-hidden relative h-[180px]">
            <div className="p-6 relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">Casino Games</h3>
                  <p className="text-white/70 mt-1">Slots, blackjack, and more</p>
                </div>
                <Dices size={40} className="text-winfinity-cyan opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-auto">
                <div className="flex items-center text-winfinity-cyan font-medium">
                  <span>Play Now</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-winfinity-cyan/20 rounded-tl-full" />
          </Card>
        </Link>
        
        <Link to="/crash" className="group">
          <Card className="bg-gradient-to-br from-winfinity-blue/20 to-winfinity-pink/20 border-winfinity-pink/20 hover:border-winfinity-pink/40 transition-all hover:shadow-lg hover:shadow-winfinity-pink/10 overflow-hidden relative h-[180px]">
            <div className="p-6 relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">Instant Wins</h3>
                  <p className="text-white/70 mt-1">Crash and Plinko games</p>
                </div>
                <TrendingUp size={40} className="text-winfinity-pink opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-auto">
                <div className="flex items-center text-winfinity-cyan font-medium">
                  <span>Play Now</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-winfinity-pink/20 rounded-tl-full" />
          </Card>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Trophy size={20} className="text-winfinity-yellow mr-2" />
                Active Tournaments
              </h3>
              <Button variant="link" className="text-winfinity-cyan text-sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 1, name: "Weekend Slots Battle", prize: "5,000 WINF", participants: 328, endsIn: "1d 6h" },
                { id: 2, name: "Blackjack Championship", prize: "2,500 WINF", participants: 124, endsIn: "12h 45m" },
                { id: 3, name: "Crypto Crash Contest", prize: "3,000 WINF", participants: 256, endsIn: "2d 4h" }
              ].map(tournament => (
                <div key={tournament.id} className="flex justify-between items-center p-3 bg-winfinity-blue/20 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{tournament.name}</div>
                    <div className="text-sm text-white/70 flex items-center mt-1">
                      <span>Prize: {tournament.prize}</span>
                      <span className="mx-2">•</span>
                      <span>{tournament.participants} players</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-winfinity-cyan">Ends in:</div>
                    <div className="font-semibold text-white">{tournament.endsIn}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Trophy size={20} className="text-winfinity-cyan mr-2" />
                Top Winners
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-white/70">Today</span>
                <span className="text-sm text-white/70">|</span>
                <span className="text-sm text-winfinity-cyan">This Week</span>
                <span className="text-sm text-white/70">|</span>
                <span className="text-sm text-white/70">All Time</span>
              </div>
            </div>
            
            <div className="space-y-1">
              {[
                { rank: 1, user: "CryptoWhale", winnings: "32.45 ETH", game: "Mega Jackpot" },
                { rank: 2, user: "BlockchainBaron", winnings: "24.78 ETH", game: "Crypto Crash" },
                { rank: 3, user: "SatoshiSamurai", winnings: "18.92 ETH", game: "Slots" },
                { rank: 4, user: "EtherExplorer", winnings: "15.33 ETH", game: "Blackjack" },
                { rank: 5, user: "TokenTitan", winnings: "12.68 ETH", game: "Plinko" }
              ].map(winner => (
                <div key={winner.rank} className="flex items-center p-3 hover:bg-winfinity-blue/20 rounded-lg transition-colors">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white font-bold",
                    winner.rank === 1 ? "bg-winfinity-yellow" : 
                    winner.rank === 2 ? "bg-gray-300" : 
                    winner.rank === 3 ? "bg-amber-700" : "bg-winfinity-blue"
                  )}>
                    {winner.rank}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{winner.user}</div>
                    <div className="text-sm text-white/70">{winner.game}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-winfinity-cyan">{winner.winnings}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
