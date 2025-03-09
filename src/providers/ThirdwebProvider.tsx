
import React from "react";
import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { Optimism, OptimismGoerli, Polygon, Mumbai } from "@thirdweb-dev/chains";

export const ThirdwebProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebSDKProvider
      supportedChains={[Optimism, OptimismGoerli, Polygon, Mumbai]}
      activeChain={OptimismGoerli}
      clientId="7a97eea9ac1d4d5c2ee8c6f8bf28af69" // Using a demo client ID
    >
      {children}
    </ThirdwebSDKProvider>
  );
};
