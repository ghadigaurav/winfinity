
import React from "react";
import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { Optimism } from "@thirdweb-dev/chains";

export const ThirdwebProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThirdwebSDKProvider
      activeChain={Optimism}
      clientId="your-client-id" // Replace with your thirdweb client ID
    >
      {children}
    </ThirdwebSDKProvider>
  );
};
