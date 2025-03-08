
import React from "react";
import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react";

// Optimism Goerli testnet
const activeChainId = 420;

export const ThirdwebProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebSDKProvider
      activeChain={activeChainId}
      clientId="your-client-id" // Replace with your thirdweb client ID
      supportedChains={[activeChainId]}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};
