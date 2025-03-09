
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Diamond, Gift, ExternalLink, Trophy, ChevronRight, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ReferralLinkDialog } from "@/components/shared/ReferralLinkDialog";

const RewardsPage = () => {
  const [referralDialogOpen, setReferralDialogOpen] = useState(false);
  const [claimableAmount, setClaimableAmount] = useState(12.5);
  const { toast } = useToast();
  
  // This is a shared function to update the wallet balance across components
  const updateWalletBalance = (amount: number) => {
    // Create and dispatch a custom event for other components to listen to
    const event = new CustomEvent('walletUpdate', { detail: { amount } });
    window.dispatchEvent(event);
  };

  const handleClaimRewards = () => {
    if (claimableAmount > 0) {
      // Update wallet balance
      updateWalletBalance(claimableAmount);
      
      toast({
        title: "Rewards Claimed",
        description: `${claimableAmount} WINF has been added to your wallet`,
      });
      
      setClaimableAmount(0);
    } else {
      toast({
        title: "No Rewards Available",
        description: "There are no rewards available to claim",
        variant: "destructive",
      });
    }
  };

  const handleGetReferralLink = () => {
    setReferralDialogOpen(true);
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="hero-bg rounded-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          Rewards Center
        </h1>
        <p className="text-white/80 mb-6 max-w-3xl">
          Earn WINF tokens through gameplay, referrals, and daily bonuses. 
          Use your tokens for exclusive benefits across the platform.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 hover:border-winfinity-cyan/40 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-winfinity-cyan/20 flex items-center justify-center mb-4">
                  <Diamond className="text-winfinity-cyan" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Claimable Rewards</h3>
                <div className="text-3xl font-bold text-winfinity-cyan mb-4">{claimableAmount.toFixed(2)} WINF</div>
                <Button 
                  className="w-full bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90"
                  onClick={handleClaimRewards}
                  disabled={claimableAmount <= 0}
                >
                  Claim Now
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 hover:border-winfinity-pink/40 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-winfinity-pink/20 flex items-center justify-center mb-4">
                  <Gift className="text-winfinity-pink" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Daily Bonus</h3>
                <div className="text-3xl font-bold text-winfinity-pink mb-4">5.00 WINF</div>
                <Button 
                  className="w-full bg-winfinity-pink text-white hover:bg-winfinity-pink/90"
                >
                  Collect in 12:35:42
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 hover:border-winfinity-purple/40 transition-all">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-winfinity-purple/20 flex items-center justify-center mb-4">
                  <LinkIcon className="text-winfinity-purple" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Referral Program</h3>
                <div className="text-lg text-white/70 mb-4">Earn 10% commission on all referrals</div>
                <Button 
                  variant="outline"
                  className="w-full border-winfinity-purple/30 text-winfinity-purple hover:bg-winfinity-purple/20"
                  onClick={handleGetReferralLink}
                >
                  Get Referral Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Reward History</h3>
            <div className="space-y-3">
              {[
                { type: "Cashback", amount: "+2.50 WINF", date: "2025-03-08 14:35", source: "Blackjack" },
                { type: "Referral", amount: "+5.00 WINF", date: "2025-03-07 09:22", source: "CryptoWizard" },
                { type: "Daily Bonus", amount: "+5.00 WINF", date: "2025-03-06 12:00", source: "Login Reward" },
                { type: "Cashback", amount: "+3.75 WINF", date: "2025-03-05 21:17", source: "Slots" },
                { type: "Tournament", amount: "+25.00 WINF", date: "2025-03-04 18:45", source: "2nd Place" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-winfinity-blue/20 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{item.type}</div>
                    <div className="text-sm text-white/70">{item.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-400">{item.amount}</div>
                    <div className="text-sm text-white/70">{item.source}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Loyalty Level</h3>
            <div className="bg-winfinity-blue/20 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-white">Silver Member</div>
                <div className="text-sm text-white/70">245 / 500 XP to Gold</div>
              </div>
              <div className="w-full bg-winfinity-blue/30 rounded-full h-2.5 mb-4">
                <div className="bg-winfinity-cyan h-2.5 rounded-full" style={{width: "49%"}}></div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-white/70">
                <div>Silver</div>
                <div>Gold</div>
                <div>Platinum</div>
                <div>Diamond</div>
              </div>
            </div>
            
            <h4 className="font-semibold text-white mb-2">Your Benefits:</h4>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-white/70">
                <Trophy size={16} className="text-winfinity-cyan mr-2" />
                5% cashback on all bets
              </li>
              <li className="flex items-center text-white/70">
                <Trophy size={16} className="text-winfinity-cyan mr-2" />
                Daily bonus of 5 WINF tokens
              </li>
              <li className="flex items-center text-white/70">
                <Trophy size={16} className="text-winfinity-cyan mr-2" />
                Monthly reload bonus of 50 WINF
              </li>
            </ul>
            
            <div className="mt-4">
              <Button variant="link" className="text-winfinity-cyan p-0 h-auto flex items-center">
                View All Loyalty Benefits
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <div>
        <Card className="bg-winfinity-blue/10 border-winfinity-blue/30 p-6">
          <h3 className="text-xl font-bold text-white mb-4">WINF Token</h3>
          <p className="text-white/80 mb-4">
            WINF is our utility token that powers the Winfinity platform. You can earn WINF through gameplay, 
            referrals, and participation in tournaments. Use your tokens for enhanced rewards, reduced fees, 
            and exclusive access to premium features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-winfinity-blue/20 p-4 rounded-lg text-center">
              <div className="text-sm text-white/70 mb-1">Current Price</div>
              <div className="text-xl font-bold text-winfinity-cyan">$0.25 USD</div>
            </div>
            <div className="bg-winfinity-blue/20 p-4 rounded-lg text-center">
              <div className="text-sm text-white/70 mb-1">Circulating Supply</div>
              <div className="text-xl font-bold text-winfinity-cyan">12.5M WINF</div>
            </div>
            <div className="bg-winfinity-blue/20 p-4 rounded-lg text-center">
              <div className="text-sm text-white/70 mb-1">Market Cap</div>
              <div className="text-xl font-bold text-winfinity-cyan">$3.12M USD</div>
            </div>
          </div>
          <div className="text-center">
            <Button 
              variant="outline" 
              className="border-winfinity-cyan/30 text-winfinity-cyan hover:bg-winfinity-blue/20"
            >
              View Token Details
              <ExternalLink size={16} className="ml-2" />
            </Button>
          </div>
        </Card>
      </div>
      
      <ReferralLinkDialog 
        open={referralDialogOpen} 
        onOpenChange={setReferralDialogOpen} 
      />
    </div>
  );
};

export default RewardsPage;
