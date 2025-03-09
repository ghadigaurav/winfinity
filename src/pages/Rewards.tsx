
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Award, Gift, Trophy, Users, Diamond, Clock, ChevronRight, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RewardsPage = () => {
  const [activeTab, setActiveTab] = useState("cashback");
  const [walletBalance, setWalletBalance] = useState(0);
  const [pendingCashback, setPendingCashback] = useState(0.042);
  const [isClaimingCashback, setIsClaimingCashback] = useState(false);
  const { toast } = useToast();
  
  // Simulate wallet balance fetching
  useEffect(() => {
    // Set initial balance
    setWalletBalance(0.75);
    
    // Check localStorage for any previously claimed rewards
    const claimedRewards = localStorage.getItem('claimedRewards');
    if (claimedRewards) {
      const rewardsData = JSON.parse(claimedRewards);
      setWalletBalance(prev => prev + rewardsData.total);
    }
  }, []);
  
  const handleClaimCashback = () => {
    setIsClaimingCashback(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      // Update wallet balance
      setWalletBalance(prev => {
        const newBalance = prev + pendingCashback;
        
        // Store claimed rewards in localStorage
        const storedRewards = localStorage.getItem('claimedRewards');
        const rewardsData = storedRewards ? JSON.parse(storedRewards) : { total: 0, claims: [] };
        rewardsData.total += pendingCashback;
        rewardsData.claims.push({
          amount: pendingCashback,
          timestamp: new Date().toISOString(),
          type: 'cashback'
        });
        localStorage.setItem('claimedRewards', JSON.stringify(rewardsData));
        
        return newBalance;
      });
      
      // Reset pending cashback
      setPendingCashback(0);
      
      setIsClaimingCashback(false);
      
      toast({
        title: "Cashback Claimed Successfully",
        description: `${pendingCashback} WINF has been added to your wallet`,
      });
      
      // Generate new pending cashback after some time
      setTimeout(() => {
        setPendingCashback(0.015);
      }, 30000);
    }, 2000);
  };
  
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Rewards & Loyalty
        </h1>
        <p className="text-white/80 mb-6 max-w-3xl">
          Earn cashback, participate in tournaments, and unlock exclusive rewards as you play.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-winfinity-blue/20 to-winfinity-purple/20 border-winfinity-purple/20 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <Award className="text-winfinity-purple" size={32} />
              <div className="bg-winfinity-purple/20 text-winfinity-purple text-xs font-semibold px-2 py-1 rounded-full">
                Daily
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cashback Rewards</h3>
            <p className="text-white/70 mb-4 flex-grow">
              Earn up to 10% cashback on all your bets, claimable daily. Higher loyalty levels unlock better rates.
            </p>
            <Button className="w-full bg-winfinity-purple text-white hover:bg-winfinity-purple/90">
              Claim Rewards
            </Button>
          </Card>
          
          <Card className="bg-gradient-to-br from-winfinity-blue/20 to-winfinity-cyan/20 border-winfinity-cyan/20 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <Trophy className="text-winfinity-cyan" size={32} />
              <div className="bg-winfinity-cyan/20 text-winfinity-cyan text-xs font-semibold px-2 py-1 rounded-full">
                Weekly
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tournaments</h3>
            <p className="text-white/70 mb-4 flex-grow">
              Compete in weekly tournaments across various games. Top players win exclusive prizes and $WINF tokens.
            </p>
            <Button className="w-full bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90">
              Join Tournament
            </Button>
          </Card>
          
          <Card className="bg-gradient-to-br from-winfinity-blue/20 to-winfinity-pink/20 border-winfinity-pink/20 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <Gift className="text-winfinity-pink" size={32} />
              <div className="bg-winfinity-pink/20 text-winfinity-pink text-xs font-semibold px-2 py-1 rounded-full">
                Monthly
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">NFT Rewards</h3>
            <p className="text-white/70 mb-4 flex-grow">
              Collect exclusive NFTs by achieving milestones or winning jackpots. These can grant special perks and bonuses.
            </p>
            <Button className="w-full bg-winfinity-pink text-white hover:bg-winfinity-pink/90">
              View Collection
            </Button>
          </Card>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="bg-winfinity-blue/20 border border-winfinity-blue/20 p-1 w-full md:w-auto">
          <TabsTrigger value="cashback" className="data-[state=active]:bg-winfinity-blue data-[state=active]:text-white text-white/70">
            Cashback
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="data-[state=active]:bg-winfinity-blue data-[state=active]:text-white text-white/70">
            Tournaments
          </TabsTrigger>
          <TabsTrigger value="nfts" className="data-[state=active]:bg-winfinity-blue data-[state=active]:text-white text-white/70">
            NFT Rewards
          </TabsTrigger>
          <TabsTrigger value="loyalty" className="data-[state=active]:bg-winfinity-blue data-[state=active]:text-white text-white/70">
            Loyalty Program
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="cashback" className="mt-6">
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Cashback Rewards</h2>
            <p className="text-white/80 mb-6">
              Earn WINF tokens based on your gameplay volume. The more you play, the more you earn!
            </p>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-semibold">Current Cashback</h3>
                    <span className="text-winfinity-cyan">7%</span>
                  </div>
                  <Progress value={70} className="h-2 bg-winfinity-blue/30" indicatorClassName="bg-winfinity-cyan" />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-semibold">Wagering Progress</h3>
                    <span className="text-white/70">2.37 ETH / 5.00 ETH</span>
                  </div>
                  <Progress value={47} className="h-2 bg-winfinity-blue/30" indicatorClassName="bg-winfinity-purple" />
                  <p className="text-white/70 text-sm mt-2">
                    Wager 2.63 ETH more to unlock 8% cashback
                  </p>
                </div>
                
                <div className="bg-winfinity-blue/20 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-semibold flex items-center">
                      <Clock size={16} className="mr-2 text-winfinity-cyan" />
                      Time until next claim
                    </h3>
                    <span className="text-white">06:24:15</span>
                  </div>
                  <Progress value={75} className="h-2 bg-winfinity-blue/30" indicatorClassName="bg-winfinity-cyan" />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-white font-semibold mb-2">Your WINF Wallet</h3>
                  <div className="bg-winfinity-blue/20 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Diamond size={18} className="text-winfinity-cyan mr-2" />
                        <span className="text-white">Current Balance:</span>
                      </div>
                      <span className="text-winfinity-cyan font-bold">{walletBalance.toFixed(3)} WINF</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-winfinity-purple to-winfinity-cyan text-white button-shine"
                  onClick={handleClaimCashback}
                  disabled={pendingCashback <= 0 || isClaimingCashback}
                >
                  {isClaimingCashback ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : pendingCashback <= 0 ? (
                    <>
                      <Check size={16} className="mr-2" />
                      No Cashback Available
                    </>
                  ) : (
                    <>
                      Claim {pendingCashback} WINF Cashback
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-4">Cashback History</h3>
                <div className="space-y-3">
                  {/* Combine static data with dynamic claimed rewards */}
                  {(() => {
                    // Get claimed rewards from localStorage
                    const claimedRewards = localStorage.getItem('claimedRewards');
                    const claimedHistory = claimedRewards 
                      ? JSON.parse(claimedRewards).claims.map((claim: any) => ({
                          date: new Date(claim.timestamp).toLocaleDateString(),
                          amount: `${claim.amount} WINF`,
                          status: "Claimed"
                        }))
                      : [];
                    
                    // Combine with static data
                    const allHistory = [
                      ...claimedHistory,
                      { date: "Mar 7, 2025", amount: "0.038 WINF", status: "Claimed" },
                      { date: "Mar 6, 2025", amount: "0.052 WINF", status: "Claimed" },
                      { date: "Mar 5, 2025", amount: "0.017 WINF", status: "Claimed" },
                      { date: "Mar 4, 2025", amount: "0.063 WINF", status: "Claimed" },
                      { date: "Mar 3, 2025", amount: "0.029 WINF", status: "Claimed" }
                    ];
                    
                    // Sort by date (most recent first) and limit to 5 entries
                    return allHistory.slice(0, 5).map((entry, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-winfinity-blue/20 rounded-lg">
                        <div>
                          <div className="text-white">{entry.amount}</div>
                          <div className="text-white/60 text-sm">{entry.date}</div>
                        </div>
                        <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                          {entry.status}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="tournaments" className="mt-6">
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Active Tournaments</h2>
            <p className="text-white/80 mb-6">
              Compete against other players in various games for a chance to win big prizes!
            </p>
            
            <div className="space-y-6">
              {[
                {
                  title: "Weekend Slots Challenge",
                  game: "Slots",
                  prize: "5,000 WINF",
                  participants: 342,
                  endsIn: "1d 13h",
                  progress: 68
                },
                {
                  title: "High Roller Blackjack",
                  game: "Blackjack",
                  prize: "2,500 WINF + Exclusive NFT",
                  participants: 128,
                  endsIn: "2d 5h",
                  progress: 42
                },
                {
                  title: "Crash Kings",
                  game: "Crypto Crash",
                  prize: "3,000 WINF",
                  participants: 256,
                  endsIn: "3d 8h",
                  progress: 25
                }
              ].map((tournament, index) => (
                <div key={index} className="bg-winfinity-blue/20 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{tournament.title}</h3>
                      <p className="text-white/70">Game: {tournament.game}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <div className="text-winfinity-cyan font-semibold">Prize: {tournament.prize}</div>
                      <div className="text-white/70">{tournament.participants} participants</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Ends in: {tournament.endsIn}</span>
                      <span className="text-white/70">Your position: #12</span>
                    </div>
                    <Progress value={tournament.progress} className="h-2 bg-winfinity-blue/30" indicatorClassName="bg-winfinity-purple" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button variant="outline" className="border-winfinity-blue/40 text-winfinity-cyan">
                      View Leaderboard
                    </Button>
                    <Button className="bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90">
                      Enter Tournament
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="nfts" className="mt-6">
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">NFT Rewards</h2>
            <p className="text-white/80 mb-6">
              Collect unique Winfinity NFTs that offer special perks and benefits on the platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Winfinity Champion",
                  image: "https://images.unsplash.com/photo-1634986666676-ec9f8ec8ca8e?q=80&w=300&auto=format&fit=crop",
                  rarity: "Legendary",
                  perk: "+10% Cashback Boost",
                  owned: true
                },
                {
                  name: "Lucky Dice",
                  image: "https://images.unsplash.com/photo-1630712052886-6bdb418cf555?q=80&w=300&auto=format&fit=crop",
                  rarity: "Rare",
                  perk: "Daily Free Spin",
                  owned: true
                },
                {
                  name: "Royal Flush",
                  image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=300&auto=format&fit=crop",
                  rarity: "Epic",
                  perk: "5% Loss Protection",
                  owned: false
                },
                {
                  name: "Cosmic Slots",
                  image: "https://images.unsplash.com/photo-1614812513172-567d2fe96a75?q=80&w=300&auto=format&fit=crop",
                  rarity: "Rare",
                  perk: "Slot Multiplier Boost",
                  owned: false
                },
                {
                  name: "Crypto Whale",
                  image: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=300&auto=format&fit=crop",
                  rarity: "Epic",
                  perk: "VIP Tournament Access",
                  owned: false
                },
                {
                  name: "Diamond Hands",
                  image: "https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=300&auto=format&fit=crop",
                  rarity: "Legendary",
                  perk: "Exclusive Game Access",
                  owned: false
                }
              ].map((nft, index) => (
                <div key={index} className="bg-winfinity-blue/20 rounded-lg overflow-hidden">
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={nft.image} 
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-winfinity-darker-blue to-transparent opacity-60" />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      nft.rarity === "Legendary" ? "bg-winfinity-purple/20 text-winfinity-purple" :
                      nft.rarity === "Epic" ? "bg-winfinity-pink/20 text-winfinity-pink" :
                      "bg-winfinity-cyan/20 text-winfinity-cyan"
                    }`}>
                      {nft.rarity}
                    </div>
                    {nft.owned && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        Owned
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-1">{nft.name}</h3>
                    <p className="text-white/70 text-sm mb-3">{nft.perk}</p>
                    <Button className={`w-full ${
                      nft.owned 
                        ? "bg-winfinity-blue text-white" 
                        : "bg-gradient-to-r from-winfinity-purple to-winfinity-pink text-white"
                    }`}>
                      {nft.owned ? "View Details" : "How to Obtain"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="loyalty" className="mt-6">
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Loyalty Program</h2>
            <p className="text-white/80 mb-6">
              Climb the loyalty tiers to unlock exclusive benefits, higher cashback rates, and special privileges.
            </p>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-semibold">Current Level: Silver</h3>
                <span className="text-winfinity-cyan">5.75 ETH / 10 ETH to Gold</span>
              </div>
              <div className="relative">
                <Progress value={57.5} className="h-4 bg-winfinity-blue/30" indicatorClassName="bg-gradient-to-r from-winfinity-blue to-winfinity-cyan" />
                <div className="absolute top-0 left-0 right-0 flex justify-between px-2 text-xs mt-6">
                  <div className="text-white/70">Bronze</div>
                  <div className="text-white">Silver</div>
                  <div className="text-white/70">Gold</div>
                  <div className="text-white/70">Platinum</div>
                  <div className="text-white/70">Diamond</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  level: "Bronze",
                  requirement: "0 - 5 ETH Wagered",
                  benefits: ["5% Cashback", "Daily Bonus Spin", "Weekly Tournaments"],
                  current: false
                },
                {
                  level: "Silver",
                  requirement: "5 - 10 ETH Wagered",
                  benefits: ["7% Cashback", "2x Daily Bonus Spins", "Exclusive Weekly Tournaments", "Monthly NFT Drop"],
                  current: true
                },
                {
                  level: "Gold",
                  requirement: "10 - 25 ETH Wagered",
                  benefits: ["10% Cashback", "3x Daily Bonus Spins", "VIP Tournaments", "Monthly NFT Drop", "Reduced House Edge"],
                  current: false
                },
                {
                  level: "Platinum",
                  requirement: "25 - 50 ETH Wagered",
                  benefits: ["12% Cashback", "5x Daily Bonus Spins", "VIP Tournaments with Higher Prizes", "Monthly NFT Drop", "Reduced House Edge", "Personal VIP Manager"],
                  current: false
                },
                {
                  level: "Diamond",
                  requirement: "50+ ETH Wagered",
                  benefits: ["15% Cashback", "10x Daily Bonus Spins", "Exclusive Diamond Tournaments", "Special NFT Collection", "Lowest House Edge", "Personal VIP Manager", "Custom Rewards"],
                  current: false
                }
              ].map((tier, index) => (
                <div key={index} className={`rounded-lg p-6 ${
                  tier.current 
                    ? "bg-gradient-to-r from-winfinity-blue/30 to-winfinity-cyan/20 border border-winfinity-cyan/30" 
                    : "bg-winfinity-blue/20"
                }`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Diamond className={`mr-3 ${
                        tier.level === "Bronze" ? "text-amber-700" :
                        tier.level === "Silver" ? "text-gray-400" :
                        tier.level === "Gold" ? "text-yellow-500" :
                        tier.level === "Platinum" ? "text-cyan-400" :
                        "text-winfinity-cyan"
                      }`} size={24} />
                      <h3 className="text-xl font-bold text-white">{tier.level}</h3>
                    </div>
                    {tier.current && (
                      <div className="px-3 py-1 bg-winfinity-cyan/20 text-winfinity-cyan rounded-full text-sm">
                        Current Level
                      </div>
                    )}
                  </div>
                  
                  <p className="text-white/70 mb-4">{tier.requirement}</p>
                  
                  <h4 className="text-white font-semibold mb-2">Benefits:</h4>
                  <ul className="space-y-1 text-white/80">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-5 text-winfinity-cyan">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">Invite Friends & Earn Together</h2>
            <p className="text-white/80 max-w-xl">
              Share your unique referral link and earn 10% of your friends' cashback as a bonus reward!
            </p>
          </div>
          <Button className="bg-gradient-to-r from-winfinity-purple to-winfinity-cyan text-white">
            <Users size={16} className="mr-2" />
            Get Referral Link
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RewardsPage;
