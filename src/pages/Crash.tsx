
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, AlertTriangle, RefreshCw } from "lucide-react";

const CrashPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCrashed, setHasCrashed] = useState(false);
  const [multiplier, setMultiplier] = useState(1.00);
  const [betAmount, setBetAmount] = useState("0.01");
  const [hasPlacedBet, setHasPlacedBet] = useState(false);
  const [hasCashedOut, setHasCashedOut] = useState(false);
  const [crashPoint, setCrashPoint] = useState(0);
  const [winAmount, setWinAmount] = useState(0);
  const [recentResults, setRecentResults] = useState<number[]>([2.35, 1.42, 4.87, 1.12, 3.65, 1.92, 8.76, 1.08]);
  
  const gameLoopRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Generate a random crash point between 1 and 10 (biased towards lower values for realism)
  const generateCrashPoint = () => {
    // This uses a simple distribution to favor lower values
    // A more complex mathematical model would be used in a real game
    const rand = Math.random();
    return 1 + Math.pow(rand, 0.8) * 9; // Adjust distribution as needed
  };
  
  const startGame = () => {
    if (!betAmount || parseFloat(betAmount) <= 0) return;
    
    const newCrashPoint = generateCrashPoint();
    setCrashPoint(newCrashPoint);
    setIsPlaying(true);
    setHasCrashed(false);
    setHasCashedOut(false);
    setHasPlacedBet(true);
    setMultiplier(1.00);
    
    // Start the multiplier growing
    const startTime = Date.now();
    const gameLoop = () => {
      const currentTime = Date.now();
      const elapsedSeconds = (currentTime - startTime) / 1000;
      
      // Exponential growth formula for multiplier
      const newMultiplier = Math.pow(Math.E, 0.06 * elapsedSeconds) * 0.97;
      
      if (newMultiplier >= newCrashPoint) {
        // Game crashed
        setMultiplier(newCrashPoint);
        setHasCrashed(true);
        setIsPlaying(false);
        
        // Add to recent results
        setRecentResults(prev => [newCrashPoint, ...prev].slice(0, 8));
        
        // Cancel the animation loop
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
        return;
      }
      
      setMultiplier(newMultiplier);
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };
  
  const cashOut = () => {
    if (!isPlaying || hasCrashed || hasCashedOut) return;
    
    setHasCashedOut(true);
    setIsPlaying(false);
    setWinAmount(parseFloat(betAmount) * multiplier);
    
    // Cancel the animation loop
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };
  
  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);
  
  // Draw the crash graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const graphHeight = canvas.height - 40;
    const graphWidth = canvas.width - 40;
    
    // Draw axes
    ctx.strokeStyle = '#2A3146';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, graphHeight + 10);
    ctx.lineTo(graphWidth + 30, graphHeight + 10);
    ctx.stroke();
    
    // Draw grid lines
    ctx.strokeStyle = '#2A3146';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 1; i <= 4; i++) {
      const y = graphHeight - (i * (graphHeight / 5)) + 10;
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(graphWidth + 30, y);
      ctx.stroke();
      
      // Labels
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px Arial';
      ctx.fillText((i * 2).toFixed(1) + 'x', 5, y + 4);
    }
    
    // If not playing, show placeholder line
    if (!isPlaying && !hasCrashed && !hasCashedOut) {
      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(30, graphHeight + 10);
      ctx.lineTo(graphWidth / 3, graphHeight - (graphHeight / 4));
      ctx.stroke();
      return;
    }
    
    // Draw crash curve
    ctx.strokeStyle = hasCrashed ? '#EF4444' : hasCashedOut ? '#10B981' : '#60A5FA';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(30, graphHeight + 10);
    
    // Calculate how far along the graph the multiplier should be
    const maxMultiplier = Math.max(10, multiplier);
    const multiplierPercentage = Math.min(1, Math.log(multiplier) / Math.log(maxMultiplier));
    const x = 30 + (multiplierPercentage * graphWidth);
    const y = graphHeight - ((multiplier - 1) / 9) * graphHeight + 10;
    
    // Draw bezier curve for smooth animation
    const controlX = 30 + (multiplierPercentage * graphWidth * 0.5);
    const controlY = graphHeight + 10 - ((multiplier - 1) / 9) * graphHeight * 0.5;
    ctx.bezierCurveTo(controlX, graphHeight + 10, controlX, controlY, x, y);
    ctx.stroke();
    
    // Mark crash point with X if crashed
    if (hasCrashed) {
      ctx.strokeStyle = '#EF4444';
      ctx.lineWidth = 2;
      const size = 10;
      ctx.beginPath();
      ctx.moveTo(x - size, y - size);
      ctx.lineTo(x + size, y + size);
      ctx.moveTo(x + size, y - size);
      ctx.lineTo(x - size, y + size);
      ctx.stroke();
    }
    
    // Mark cash out point with circle if cashed out
    if (hasCashedOut) {
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    
  }, [isPlaying, multiplier, hasCrashed, hasCashedOut]);
  
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Crypto Crash
        </h1>
        <p className="text-white/80 mb-6 max-w-3xl">
          Place your bet, watch the multiplier rise, and cash out before it crashes!
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Graph */}
          <Card className="lg:col-span-3 bg-winfinity-blue/20 border-winfinity-blue/30 overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-2xl font-bold">
                {hasCrashed ? (
                  <span className="text-red-500 flex items-center">
                    <AlertTriangle size={20} className="mr-2" />
                    Crashed @ {crashPoint.toFixed(2)}x
                  </span>
                ) : hasCashedOut ? (
                  <span className="text-green-500">
                    Cashed Out @ {multiplier.toFixed(2)}x
                  </span>
                ) : isPlaying ? (
                  <span className="text-winfinity-cyan animate-pulse flex items-center">
                    <TrendingUp size={20} className="mr-2" />
                    {multiplier.toFixed(2)}x
                  </span>
                ) : (
                  <span className="text-white">Ready to Play</span>
                )}
              </div>
              
              <div className="flex gap-2">
                {recentResults.map((result, index) => (
                  <div 
                    key={index} 
                    className={`text-xs px-2 py-1 rounded ${
                      result >= 2 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {result.toFixed(2)}x
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[300px] w-full">
              <canvas 
                ref={canvasRef}
                width={800}
                height={400}
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </Card>
          
          {/* Game Controls */}
          <Card className="bg-winfinity-blue/20 border-winfinity-blue/30 overflow-hidden p-6">
            <h3 className="text-white font-bold mb-4">Place Your Bet</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm block mb-2">Bet Amount (ETH)</label>
                <Input
                  type="number"
                  min="0.001"
                  step="0.001"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  disabled={isPlaying || hasCashedOut}
                  className="bg-winfinity-darker-blue border-winfinity-blue/30 text-white"
                />
              </div>
              
              <div className="flex gap-2">
                {["0.01", "0.05", "0.1"].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-winfinity-blue/30 text-winfinity-cyan"
                    disabled={isPlaying || hasCashedOut}
                    onClick={() => setBetAmount(amount)}
                  >
                    {amount}
                  </Button>
                ))}
              </div>
              
              <div className="pt-4 border-t border-winfinity-blue/20">
                {!isPlaying && !hasCashedOut ? (
                  <Button
                    className="w-full bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90"
                    onClick={startGame}
                  >
                    Place Bet
                  </Button>
                ) : isPlaying ? (
                  <Button
                    className="w-full bg-winfinity-pink text-white hover:bg-winfinity-pink/90"
                    onClick={cashOut}
                  >
                    Cash Out @ {multiplier.toFixed(2)}x
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-winfinity-blue text-white hover:bg-winfinity-blue/90"
                    onClick={() => {
                      setHasPlacedBet(false);
                      setHasCashedOut(false);
                      setHasCrashed(false);
                    }}
                  >
                    <RefreshCw size={16} className="mr-2" />
                    New Bet
                  </Button>
                )}
              </div>
              
              {hasCashedOut && (
                <div className="mt-4 p-3 bg-green-500/20 rounded-lg">
                  <h4 className="text-green-400 font-bold">You won!</h4>
                  <p className="text-white">
                    {parseFloat(betAmount).toFixed(3)} ETH × {multiplier.toFixed(2)} = {winAmount.toFixed(3)} ETH
                  </p>
                </div>
              )}
              
              {hasCrashed && hasPlacedBet && !hasCashedOut && (
                <div className="mt-4 p-3 bg-red-500/20 rounded-lg">
                  <h4 className="text-red-400 font-bold">Crashed!</h4>
                  <p className="text-white">
                    You lost {parseFloat(betAmount).toFixed(3)} ETH
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
        <div className="text-white/80 space-y-3">
          <p>1. Enter the amount you want to bet</p>
          <p>2. Click "Place Bet" to start the game</p>
          <p>3. Watch as the multiplier increases</p>
          <p>4. Click "Cash Out" before the graph crashes to win your bet multiplied by the current value</p>
          <p>5. If the graph crashes before you cash out, you lose your bet</p>
        </div>
      </Card>
    </div>
  );
};

export default CrashPage;
