
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Loader2 } from "lucide-react";

export const ConnectWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    
    // Mock connection for demo
    setTimeout(() => {
      const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
      setWalletAddress(mockAddress);
      setIsConnected(true);
      setIsConnecting(false);
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
      variant: "destructive",
    });
  };

  if (isConnected) {
    return (
      <Button 
        variant="outline" 
        className="bg-winfinity-blue/20 border-winfinity-cyan/30 text-winfinity-cyan hover:bg-winfinity-blue/30"
        onClick={handleDisconnect}
      >
        <Wallet size={16} className="mr-2" />
        {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
      </Button>
    );
  }

  return (
    <Button 
      className="bg-winfinity-cyan text-winfinity-dark-blue hover:bg-winfinity-cyan/90"
      disabled={isConnecting}
      onClick={handleConnect}
    >
      {isConnecting ? (
        <>
          <Loader2 size={16} className="mr-2 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet size={16} className="mr-2" />
          Connect Wallet
        </>
      )}
    </Button>
  );
};
