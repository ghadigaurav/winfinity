
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Diamond, 
  Ticket, 
  Trophy, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Info,
  AlertCircle,
  CheckCircle2,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LivePurchasesTable } from "@/components/lottery/LivePurchasesTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLotteryContract } from "@/services/LotteryContract";
import { useAddress } from "@thirdweb-dev/react";

const LotteryPage = () => {
  const [jackpot, setJackpot] = useState(128.74);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [ticketCount, setTicketCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0.01);
  const [currentDraw, setCurrentDraw] = useState(123);
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
  const [myNumbers, setMyNumbers] = useState<number[]>([]);
  const [isGeneratingNumbers, setIsGeneratingNumbers] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [myTickets, setMyTickets] = useState<{id: number, numbers: number[], purchaseDate: Date}[]>([]);
  const { toast } = useToast();
  const { purchaseTickets, isLoading } = useLotteryContract();
  const walletAddress = useAddress();

  // This is a shared function to update the wallet balance across components
  const updateWalletBalance = (amount: number) => {
    // Create and dispatch a custom event for other components to listen to
    const event = new CustomEvent('walletUpdate', { detail: { amount } });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot(prev => {
        const newValue = prev + (Math.random() * 0.01);
        return parseFloat(newValue.toFixed(2));
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
          simulateDraw();
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTotalPrice(ticketCount * 0.01);
  }, [ticketCount]);

  const simulateDraw = () => {
    const generated = Array.from({ length: 5 }, () => Math.floor(Math.random() * 99) + 1);
    setWinningNumbers(generated);
    setCurrentDraw(prev => prev + 1);
    
    toast({
      title: "Lottery Draw Complete!",
      description: `Draw #${currentDraw} winning numbers: ${generated.join(', ')}`,
    });
  };

  const generateRandomNumbers = () => {
    setIsGeneratingNumbers(true);
    
    setTimeout(() => {
      const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 99) + 1);
      setMyNumbers(numbers);
      setIsGeneratingNumbers(false);
      
      toast({
        title: "Random Numbers Generated",
        description: `Your numbers: ${numbers.join(', ')}`,
      });
    }, 800);
  };

  const handleConfirmPurchase = async () => {
    setConfirmationOpen(false);
    setIsPurchasing(true);
    
    try {
      // Call the blockchain contract
      const result = await purchaseTickets(ticketCount, myNumbers, totalPrice);
      
      if (result.success) {
        setTxHash(result.data.receipt.transactionHash);
        setPurchaseSuccess(true);
        
        const newTickets = Array.from({ length: ticketCount }, (_, i) => ({
          id: myTickets.length + i + 1,
          numbers: myNumbers,
          purchaseDate: new Date()
        }));
        
        setMyTickets(prev => [...prev, ...newTickets]);
        
        toast({
          title: "Tickets Purchased Successfully!",
          description: `You've purchased ${ticketCount} ticket(s) for the next draw.`,
        });
        
        // Update wallet balance after successful purchase
        updateWalletBalance(-totalPrice);
        
        setTimeout(() => {
          setPurchaseSuccess(false);
        }, 5000);
      } else {
        toast({
          variant: "destructive",
          title: "Transaction Failed",
          description: "There was an error processing your ticket purchase.",
        });
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast({
        variant: "destructive",
        title: "Transaction Failed",
        description: "There was an error processing your ticket purchase.",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleTicketPurchase = () => {
    if (!walletAddress) {
      toast({
        variant: "destructive",
        title: "Wallet Not Connected",
        description: "Please connect your wallet to purchase tickets.",
      });
      return;
    }
    
    if (myNumbers.length === 0) {
      toast({
        variant: "destructive",
        title: "No numbers selected",
        description: "Please generate or select your numbers first.",
      });
      return;
    }
    
    setConfirmationOpen(true);
  };

  const increaseTickets = () => {
    setTicketCount(prev => Math.min(prev + 1, 100));
  };

  const decreaseTickets = () => {
    setTicketCount(prev => Math.max(prev - 1, 1));
  };

  const pastDraws = [
    { id: 122, date: "Mar 07, 2025", numbers: [12, 34, 56, 78, 90], winner: "0x3a...1b4c", prize: "89.45 ETH" },
    { id: 121, date: "Mar 06, 2025", numbers: [5, 17, 22, 41, 63], winner: "0x7f...9d2e", prize: "76.32 ETH" },
    { id: 120, date: "Mar 05, 2025", numbers: [8, 19, 27, 33, 59], winner: "0x4b...6a8c", prize: "65.18 ETH" }
  ];

  const [livePurchases, setLivePurchases] = useState<{
    id: string;
    walletAddress: string;
    ticketCount: number;
    timestamp: Date;
  }[]>([]);

  useEffect(() => {
    const dummyAddresses = [
      "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      "0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8",
      "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
      "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
      "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
      "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
    ];

    const initialPurchases = Array.from({ length: 10 }, (_, i) => ({
      id: `purchase-${i}`,
      walletAddress: dummyAddresses[Math.floor(Math.random() * dummyAddresses.length)],
      ticketCount: Math.floor(Math.random() * 5) + 1,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24))
    }));

    setLivePurchases(initialPurchases);

    const interval = setInterval(() => {
      const newPurchase = {
        id: `purchase-${Date.now()}`,
        walletAddress: dummyAddresses[Math.floor(Math.random() * dummyAddresses.length)],
        ticketCount: Math.floor(Math.random() * 5) + 1,
        timestamp: new Date()
      };

      setLivePurchases(prev => [newPurchase, ...prev.slice(0, 9)]);
      
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Decentralized Lottery
            </h1>
            <p className="text-white/80 mb-6">
              Transparent, fair, and trustless lottery powered by blockchain technology.
              Buy tickets, wait for the draw, and win big with provably fair results!
            </p>
            
            <div className="bg-winfinity-blue/20 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center mb-2">
                <Diamond className="text-winfinity-cyan mr-2" size={28} />
                <span className="text-xl text-white font-semibold">Current Jackpot:</span>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-winfinity-cyan mb-4 animate-pulse">
                {jackpot.toFixed(2)} ETH
              </div>
              
              <div className="flex items-center mb-3">
                <Clock className="text-winfinity-purple mr-2" size={20} />
                <span className="text-white font-medium">Next Draw In:</span>
              </div>
              
              <div className="flex space-x-3 mb-6">
                <div className="bg-winfinity-blue/50 rounded-lg p-2 w-20 text-center">
                  <div className="text-2xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-white/70">Hours</div>
                </div>
                <div className="bg-winfinity-blue/50 rounded-lg p-2 w-20 text-center">
                  <div className="text-2xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-white/70">Minutes</div>
                </div>
                <div className="bg-winfinity-blue/50 rounded-lg p-2 w-20 text-center">
                  <div className="text-2xl font-bold text-white">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-xs text-white/70">Seconds</div>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-white/70 mb-2">
                <Info size={14} className="mr-1" />
                Draw #{currentDraw} • 0.01 ETH per ticket
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  className="bg-winfinity-blue/30 border-winfinity-cyan/20 text-white hover:bg-winfinity-blue/50 col-span-3"
                  onClick={generateRandomNumbers}
                  disabled={isGeneratingNumbers}
                >
                  {isGeneratingNumbers ? "Generating..." : "Generate Random Numbers"}
                </Button>
                
                <div className="flex items-center col-span-3 md:col-span-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-winfinity-blue/30 border-winfinity-cyan/20 text-white"
                    onClick={decreaseTickets}
                    disabled={ticketCount <= 1}
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <div className="flex-1 mx-2">
                    <Input
                      type="number"
                      min={1}
                      max={100}
                      value={ticketCount}
                      onChange={(e) => setTicketCount(Math.min(Math.max(parseInt(e.target.value) || 1, 1), 100))}
                      className="bg-winfinity-blue/30 border-winfinity-cyan/20 text-white text-center"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-winfinity-blue/30 border-winfinity-cyan/20 text-white"
                    onClick={increaseTickets}
                    disabled={ticketCount >= 100}
                  >
                    <ChevronRight size={20} />
                  </Button>
                </div>
                
                <div className="col-span-3 md:col-span-1 flex items-center justify-center bg-winfinity-blue/30 rounded-md px-4 py-2">
                  <div className="text-center">
                    <div className="text-xs text-white/70">Total:</div>
                    <div className="font-semibold text-white">{totalPrice.toFixed(2)} ETH</div>
                  </div>
                </div>
                
                <Button 
                  className="bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90 col-span-3 md:col-span-1"
                  onClick={handleTicketPurchase}
                  disabled={isPurchasing || myNumbers.length === 0}
                >
                  {isPurchasing ? (
                    "Processing..."
                  ) : (
                    <>
                      <Ticket size={16} className="mr-2" />
                      Buy Tickets
                    </>
                  )}
                </Button>
              </div>
              
              {purchaseSuccess && (
                <div className="mt-4 bg-winfinity-cyan/20 border border-winfinity-cyan/30 rounded-lg p-3 animate-pulse">
                  <div className="flex items-center">
                    <CheckCircle2 className="text-winfinity-cyan mr-2" size={20} />
                    <div>
                      <p className="text-white font-medium">Transaction Successful!</p>
                      <a 
                        href={`https://optimism.etherscan.io/tx/${txHash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-winfinity-cyan text-sm hover:underline"
                      >
                        View on Etherscan
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 overflow-hidden h-full">
              <Tabs defaultValue="my-tickets">
                <TabsList className="w-full grid grid-cols-2 bg-winfinity-blue/20">
                  <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
                  <TabsTrigger value="past-draws">Past Draws</TabsTrigger>
                </TabsList>
                
                <TabsContent value="my-tickets" className="p-4">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">Your Numbers</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {myNumbers.length > 0 ? (
                        myNumbers.map((number, index) => (
                          <div key={index} className="bg-winfinity-cyan/20 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold border border-winfinity-cyan/40">
                            {number}
                          </div>
                        ))
                      ) : (
                        <div className="text-white/70 py-4 text-center w-full">
                          No numbers selected yet. Generate or choose your lucky numbers!
                        </div>
                      )}
                    </div>
                    
                    <Separator className="my-4 bg-winfinity-blue/30" />
                    
                    <h3 className="text-xl font-bold text-white mb-2">Your Active Tickets</h3>
                    <div className="space-y-3">
                      {myTickets.length > 0 ? (
                        myTickets.map((ticket) => (
                          <div key={ticket.id} className="bg-winfinity-blue/30 rounded-lg p-3 border border-winfinity-cyan/30">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-white font-medium">Ticket #{ticket.id}</div>
                              <div className="text-white/70 text-sm">
                                {ticket.purchaseDate.toLocaleDateString()} {ticket.purchaseDate.toLocaleTimeString()}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {ticket.numbers.map((number, idx) => (
                                <div key={idx} className="bg-winfinity-cyan/20 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm border border-winfinity-cyan/40">
                                  {number}
                                </div>
                              ))}
                            </div>
                            <div className="text-right">
                              <a 
                                href={`https://optimism.etherscan.io/tx/0x${Math.random().toString(16).slice(2)}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-winfinity-cyan text-xs hover:underline"
                              >
                                View Transaction
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-white/70 py-8 text-center">
                          You don't have any active tickets for the current draw.
                          <div className="mt-2">
                            <Button
                              variant="link"
                              className="text-winfinity-cyan"
                              onClick={generateRandomNumbers}
                            >
                              Generate numbers and buy tickets now!
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="past-draws" className="p-4">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Draws</h3>
                  <div className="space-y-3">
                    {pastDraws.map(draw => (
                      <div key={draw.id} className="bg-winfinity-blue/20 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="text-lg font-semibold text-white">Draw #{draw.id}</div>
                            <div className="text-sm text-white/70">{draw.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-white/70">Prize</div>
                            <div className="text-winfinity-cyan font-semibold">{draw.prize}</div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-sm text-white/70 mb-1">Winning Numbers:</div>
                          <div className="flex gap-2">
                            {draw.numbers.map((number, index) => (
                              <div key={index} className="bg-winfinity-purple/20 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium border border-winfinity-purple/40">
                                {number}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-white/70">
                            Winner: <span className="text-white">{draw.winner}</span>
                          </div>
                          <Button variant="link" className="text-winfinity-cyan p-0 h-auto text-xs">
                            View on Explorer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <LivePurchasesTable purchases={livePurchases} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 hover:border-winfinity-cyan/40 transition-all p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-winfinity-purple/20 flex items-center justify-center mb-4">
                <Ticket size={24} className="text-winfinity-purple" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Buy Tickets</h3>
              <p className="text-white/70">
                Purchase lottery tickets for 0.01 ETH each. Choose your own numbers or generate random ones.
              </p>
            </div>
          </Card>
          
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 hover:border-winfinity-cyan/40 transition-all p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-winfinity-cyan/20 flex items-center justify-center mb-4">
                <Clock size={24} className="text-winfinity-cyan" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Wait for the Draw</h3>
              <p className="text-white/70">
                Draws happen daily. The smart contract uses Chainlink VRF for truly random and verifiable results.
              </p>
            </div>
          </Card>
          
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 hover:border-winfinity-cyan/40 transition-all p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-winfinity-pink/20 flex items-center justify-center mb-4">
                <Trophy size={24} className="text-winfinity-pink" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Win Prizes</h3>
              <p className="text-white/70">
                Match the winning numbers to win. Prizes are distributed automatically to winners' wallets.
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Prize Structure</h2>
        <Card className="bg-winfinity-blue/10 border-winfinity-blue/30">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-b from-winfinity-yellow/20 to-transparent rounded-lg p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-winfinity-yellow/30 flex items-center justify-center mx-auto mb-2">
                  <Trophy size={24} className="text-winfinity-yellow" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">1st Prize</h3>
                <div className="text-white/80 mb-1">Match all 5 numbers</div>
                <div className="text-winfinity-yellow font-bold">60% of Jackpot</div>
              </div>
              
              <div className="bg-gradient-to-b from-winfinity-cyan/20 to-transparent rounded-lg p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-winfinity-cyan/30 flex items-center justify-center mx-auto mb-2">
                  <Trophy size={24} className="text-winfinity-cyan" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">2nd Prize</h3>
                <div className="text-white/80 mb-1">Match 4 numbers</div>
                <div className="text-winfinity-cyan font-bold">30% of Jackpot</div>
              </div>
              
              <div className="bg-gradient-to-b from-winfinity-pink/20 to-transparent rounded-lg p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-winfinity-pink/30 flex items-center justify-center mx-auto mb-2">
                  <Trophy size={24} className="text-winfinity-pink" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">3rd Prize</h3>
                <div className="text-white/80 mb-1">Match 3 numbers</div>
                <div className="text-winfinity-pink font-bold">10% of Jackpot</div>
              </div>
            </div>
            
            <div className="mt-6 text-center text-white/70 text-sm">
              <p>
                10% of each ticket purchase goes to the community reward pool, and 10% goes to platform development.
                The remaining 80% is added to the prize pool for the current draw.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent className="bg-winfinity-darker-blue border-winfinity-blue/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Confirm Purchase</DialogTitle>
            <DialogDescription className="text-white/70">
              You are about to purchase {ticketCount} lottery ticket{ticketCount > 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-between py-2 border-b border-winfinity-blue/20">
              <span className="text-white/70">Tickets:</span>
              <span className="text-white font-medium">{ticketCount} x 0.01 ETH</span>
            </div>
            <div className="flex justify-between py-2 border-b border-winfinity-blue/20">
              <span className="text-white/70">Total Amount:</span>
              <span className="text-winfinity-cyan font-semibold">{totalPrice.toFixed(2)} ETH</span>
            </div>
            
            <div className="mt-4 flex items-start gap-2 bg-winfinity-blue/20 p-3 rounded-lg">
              <AlertCircle className="text-winfinity-yellow flex-shrink-0 mt-0.5" size={16} />
              <div className="text-sm text-white/90">
                This will trigger a blockchain transaction. Confirm in your wallet to complete the purchase.
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-winfinity-blue/30 text-white hover:bg-winfinity-blue/20"
              onClick={() => setConfirmationOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90"
              onClick={handleConfirmPurchase}
              disabled={isPurchasing}
            >
              {isPurchasing ? (
                <>
                  <span className="mr-2">Processing...</span>
                </>
              ) : (
                <>
                  Confirm & Pay
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LotteryPage;
