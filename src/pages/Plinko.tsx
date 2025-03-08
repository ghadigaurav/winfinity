
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dices, ArrowDown, RefreshCw } from "lucide-react";

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  path: Array<{ x: number; y: number }>;
  slotIndex: number | null;
  complete: boolean;
}

interface Peg {
  x: number;
  y: number;
  radius: number;
}

interface Slot {
  x: number;
  y: number;
  width: number;
  multiplier: number;
}

const PlinkoPage = () => {
  const [betAmount, setBetAmount] = useState("0.01");
  const [activeBall, setActiveBall] = useState<Ball | null>(null);
  const [result, setResult] = useState<{ multiplier: number; win: number } | null>(null);
  const [pegs, setPegs] = useState<Peg[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [gameHistory, setGameHistory] = useState<Array<{ multiplier: number; win: number }>>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Set up the game board when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Create pegs
    const rows = 8;
    const pegRadius = 6;
    const pegGap = 40;
    const pegStartY = 100;
    
    const newPegs: Peg[] = [];
    
    for (let row = 0; row < rows; row++) {
      const pegCount = row + 3;
      const rowWidth = pegCount * pegGap;
      const startX = (width - rowWidth) / 2 + (row % 2 === 0 ? 0 : pegGap / 2);
      
      for (let i = 0; i < pegCount; i++) {
        newPegs.push({
          x: startX + i * pegGap,
          y: pegStartY + row * pegGap,
          radius: pegRadius
        });
      }
    }
    
    setPegs(newPegs);
    
    // Create slots
    const slotCount = 9;
    const slotWidth = width / slotCount;
    const slotY = height - 40;
    
    // Multipliers (higher in middle, lower on sides)
    const multipliers = [0.2, 0.5, 1, 2, 5, 2, 1, 0.5, 0.2];
    
    const newSlots: Slot[] = [];
    
    for (let i = 0; i < slotCount; i++) {
      newSlots.push({
        x: i * slotWidth,
        y: slotY,
        width: slotWidth,
        multiplier: multipliers[i]
      });
    }
    
    setSlots(newSlots);
    
    // Initial render
    renderGame(null, newPegs, newSlots);
  }, []);
  
  const renderGame = (ball: Ball | null, gamePegs: Peg[], gameSlots: Slot[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = '#1A2035';
    ctx.fillRect(0, 0, width, height);
    
    // Draw pegs
    for (const peg of gamePegs) {
      ctx.beginPath();
      ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#60A5FA';
      ctx.fill();
      ctx.strokeStyle = '#2A3146';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Draw slots
    for (const slot of gameSlots) {
      ctx.fillStyle = '#2A3146';
      ctx.fillRect(slot.x, slot.y, slot.width, 40);
      
      // Draw multiplier text
      ctx.fillStyle = slot.multiplier >= 2 ? '#10B981' : slot.multiplier >= 1 ? '#FBBF24' : '#EF4444';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${slot.multiplier}x`, slot.x + slot.width / 2, slot.y + 25);
      
      // Draw divider
      if (slot.x > 0) {
        ctx.beginPath();
        ctx.moveTo(slot.x, slot.y);
        ctx.lineTo(slot.x, slot.y + 40);
        ctx.strokeStyle = '#1A2035';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    
    // Draw ball
    if (ball) {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#F43F5E';
      ctx.fill();
      ctx.strokeStyle = '#D1D5DB';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw ball path
      if (ball.path.length > 1) {
        ctx.beginPath();
        ctx.moveTo(ball.path[0].x, ball.path[0].y);
        
        for (let i = 1; i < ball.path.length; i++) {
          ctx.lineTo(ball.path[i].x, ball.path[i].y);
        }
        
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    
    // Draw starting position indicator
    const startX = width / 2;
    const startY = 40;
    
    ctx.beginPath();
    ctx.moveTo(startX, startY - 10);
    ctx.lineTo(startX, startY + 10);
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(startX - 10, startY);
    ctx.lineTo(startX + 10, startY);
    ctx.stroke();
  };
  
  const createBall = () => {
    if (!canvasRef.current) return null;
    
    const width = canvasRef.current.width;
    
    return {
      x: width / 2,
      y: 40,
      vx: 0,
      vy: 0,
      radius: 8,
      path: [{ x: width / 2, y: 40 }],
      slotIndex: null,
      complete: false
    };
  };
  
  const updateBall = (ball: Ball) => {
    if (ball.complete) return ball;
    
    // Apply gravity
    ball.vy += 0.2;
    
    // Update position
    ball.x += ball.vx;
    ball.y += ball.vy;
    
    // Add point to path
    ball.path.push({ x: ball.x, y: ball.y });
    
    // Truncate path if too long
    if (ball.path.length > 30) {
      ball.path.shift();
    }
    
    // Check for collisions with pegs
    for (const peg of pegs) {
      const dx = ball.x - peg.x;
      const dy = ball.y - peg.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < ball.radius + peg.radius) {
        // Calculate reflection vector
        const nx = dx / distance;
        const ny = dy / distance;
        
        // Adjust position to prevent sticking
        const penetration = ball.radius + peg.radius - distance;
        ball.x += nx * penetration;
        ball.y += ny * penetration;
        
        // Reflect velocity with some randomness and damping
        const dampingFactor = 0.8;
        const randomFactor = 0.4;
        
        const dot = ball.vx * nx + ball.vy * ny;
        
        ball.vx = (ball.vx - 2 * dot * nx) * dampingFactor;
        ball.vy = (ball.vy - 2 * dot * ny) * dampingFactor;
        
        // Add some randomness to make the game less predictable
        ball.vx += (Math.random() - 0.5) * randomFactor;
      }
    }
    
    // Check if ball has entered a slot
    if (ball.y > slots[0].y && ball.slotIndex === null) {
      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        if (ball.x >= slot.x && ball.x < slot.x + slot.width) {
          ball.slotIndex = i;
          
          // Calculate win
          const multiplier = slot.multiplier;
          const bet = parseFloat(betAmount);
          const win = bet * multiplier;
          
          setResult({ multiplier, win });
          setGameHistory(prev => [{ multiplier, win }, ...prev].slice(0, 5));
          
          // Complete after a short delay
          setTimeout(() => {
            setActiveBall(prev => prev ? { ...prev, complete: true } : null);
          }, 500);
          
          break;
        }
      }
    }
    
    return ball;
  };
  
  const dropBall = () => {
    // Reset any existing game
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    setResult(null);
    
    // Create a new ball
    const ball = createBall();
    if (!ball) return;
    
    setActiveBall(ball);
    
    // Start animation loop
    const animate = () => {
      setActiveBall(prev => {
        if (!prev) return null;
        return updateBall({ ...prev });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Render the game on each frame
  useEffect(() => {
    renderGame(activeBall, pegs, slots);
  }, [activeBall, pegs, slots]);
  
  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Crypto Plinko
        </h1>
        <p className="text-white/80 mb-6 max-w-3xl">
          Drop the ball and watch it bounce through the pegs to determine your prize!
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Board */}
          <Card className="lg:col-span-3 bg-winfinity-blue/20 border-winfinity-blue/30 overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Plinko Board</h2>
              
              {result && (
                <div className={`px-4 py-1 rounded-full ${
                  result.multiplier >= 2 ? 'bg-green-500/20 text-green-400' : 
                  result.multiplier >= 1 ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-red-500/20 text-red-400'
                }`}>
                  {result.multiplier}x - {result.win.toFixed(3)} ETH
                </div>
              )}
            </div>
            
            <div className="relative rounded-lg overflow-hidden border border-winfinity-blue/30 w-full">
              <canvas 
                ref={canvasRef}
                width={600}
                height={500}
                className="w-full"
              />
              
              {!activeBall && !result && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <ArrowDown className="text-yellow-400 animate-bounce" size={32} />
                  <p className="text-white bg-winfinity-blue/40 px-3 py-1 rounded-full mt-2">
                    Drop Here
                  </p>
                </div>
              )}
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
                  disabled={!!activeBall && !activeBall.complete}
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
                    disabled={!!activeBall && !activeBall.complete}
                    onClick={() => setBetAmount(amount)}
                  >
                    {amount}
                  </Button>
                ))}
              </div>
              
              <div className="pt-4 border-t border-winfinity-blue/20">
                <Button
                  className="w-full bg-gradient-to-r from-winfinity-purple to-winfinity-pink text-white"
                  onClick={dropBall}
                  disabled={!!activeBall && !activeBall.complete}
                >
                  {!activeBall ? (
                    <>
                      <Dices className="mr-2 h-4 w-4" />
                      Drop Ball
                    </>
                  ) : activeBall.complete ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Play Again
                    </>
                  ) : (
                    "Ball Dropping..."
                  )}
                </Button>
              </div>
              
              {result && (
                <div className={`mt-4 p-3 rounded-lg ${
                  result.multiplier >= 2 ? 'bg-green-500/20' : 
                  result.multiplier >= 1 ? 'bg-yellow-500/20' : 
                  'bg-red-500/20'
                }`}>
                  <h4 className={`font-bold ${
                    result.multiplier >= 2 ? 'text-green-400' : 
                    result.multiplier >= 1 ? 'text-yellow-400' : 
                    'text-red-400'
                  }`}>
                    {result.multiplier >= 2 ? 'Big Win!' : 
                     result.multiplier >= 1 ? 'You won!' : 
                     'Better luck next time!'}
                  </h4>
                  <p className="text-white">
                    {parseFloat(betAmount).toFixed(3)} ETH × {result.multiplier}x = {result.win.toFixed(3)} ETH
                  </p>
                </div>
              )}
              
              {gameHistory.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-white/70 text-sm mb-2">Recent Results</h4>
                  <div className="space-y-2">
                    {gameHistory.map((game, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-2 bg-winfinity-blue/10 rounded"
                      >
                        <span className={`text-sm ${
                          game.multiplier >= 2 ? 'text-green-400' : 
                          game.multiplier >= 1 ? 'text-yellow-400' : 
                          'text-red-400'
                        }`}>
                          {game.multiplier}x
                        </span>
                        <span className="text-white text-sm">
                          {game.win.toFixed(3)} ETH
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
        <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/80">
          <div className="space-y-2">
            <h3 className="text-winfinity-cyan font-bold">1. Place Your Bet</h3>
            <p>Choose your bet amount using the controls on the right.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-winfinity-pink font-bold">2. Drop the Ball</h3>
            <p>Click "Drop Ball" and watch as it bounces through the pegs.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-winfinity-purple font-bold">3. Win Prizes</h3>
            <p>Your payout depends on which slot the ball lands in. Multipliers range from 0.2x to 5x.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlinkoPage;
