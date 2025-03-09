
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type ReferralLinkDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ReferralLinkDialog = ({ open, onOpenChange }: ReferralLinkDialogProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const referralLink = `https://winfinity.io/?ref=${Math.random().toString(36).substring(2, 10)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Share this link with friends to earn rewards!",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-winfinity-darker-blue border-winfinity-blue/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Your Referral Link</DialogTitle>
          <DialogDescription className="text-white/70">
            Share this link with friends to earn 10% commission on their gameplay.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center space-x-2">
            <Input 
              value={referralLink}
              readOnly
              className="bg-winfinity-blue/20 border-winfinity-blue/30 text-white"
            />
            <Button 
              variant="outline" 
              size="icon"
              className="bg-winfinity-blue/20 border-winfinity-cyan/30 text-winfinity-cyan hover:bg-winfinity-blue/30"
              onClick={handleCopy}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </Button>
          </div>
          
          <div className="mt-4 grid grid-cols-1 gap-3">
            <div className="bg-winfinity-blue/20 p-3 rounded-lg">
              <h4 className="font-medium text-white mb-1">Your benefits:</h4>
              <ul className="text-sm text-white/70 list-disc list-inside">
                <li>10% commission on all your referrals' bets</li>
                <li>5% bonus on their first deposit</li>
                <li>Additional rewards in WINF tokens</li>
              </ul>
            </div>
            
            <div className="bg-winfinity-blue/20 p-3 rounded-lg">
              <h4 className="font-medium text-white mb-1">Their benefits:</h4>
              <ul className="text-sm text-white/70 list-disc list-inside">
                <li>50 WINF tokens signup bonus</li>
                <li>100% first deposit bonus up to 500 WINF</li>
                <li>10 free lottery tickets</li>
              </ul>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            className="bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90 w-full"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy Referral Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
