
import React from "react";
import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { Optimism } from "@thirdweb-dev/chains";

export const ThirdwebProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebSDKProvider
      activeChain={Optimism}
      clientId="7a97eea9ac1d4d5c2ee8c6f8bf28af69" // Using a demo client ID
    >
      {children}
    </ThirdwebSDKProvider>
  );
};
