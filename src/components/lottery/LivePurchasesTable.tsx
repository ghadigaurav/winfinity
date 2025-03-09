
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

type Purchase = {
  id: string;
  walletAddress: string;
  ticketCount: number;
  timestamp: Date;
};

type LivePurchasesTableProps = {
  purchases: Purchase[];
};

export const LivePurchasesTable = ({ purchases: initialPurchases }: LivePurchasesTableProps) => {
  const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);

  useEffect(() => {
    // Update the purchases when props change
    setPurchases(initialPurchases);
    
    // Simulate new real-time purchases coming in
    const interval = setInterval(() => {
      const dummyAddresses = [
        "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        "0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8",
        "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
        "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
        "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
        "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
      ];
      
      const newPurchase = {
        id: `purchase-${Date.now()}`,
        walletAddress: dummyAddresses[Math.floor(Math.random() * dummyAddresses.length)],
        ticketCount: Math.floor(Math.random() * 5) + 1,
        timestamp: new Date()
      };
      
      setPurchases(prev => [newPurchase, ...prev.slice(0, 9)]);
    }, 8000); // new purchase every 8 seconds
    
    return () => clearInterval(interval);
  }, [initialPurchases]);

  return (
    <div className="bg-winfinity-blue/10 rounded-lg p-4 overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-4">Live Purchases</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-winfinity-blue/20">
              <TableHead className="text-winfinity-cyan">Wallet</TableHead>
              <TableHead className="text-winfinity-cyan text-center">Tickets</TableHead>
              <TableHead className="text-winfinity-cyan text-right">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow 
                key={purchase.id}
                className="border-b border-winfinity-blue/20 hover:bg-winfinity-blue/20 transition-colors"
              >
                <TableCell className="text-white">
                  {purchase.walletAddress.slice(0, 6)}...{purchase.walletAddress.slice(-4)}
                </TableCell>
                <TableCell className="text-white text-center">
                  {purchase.ticketCount}
                </TableCell>
                <TableCell className="text-white/70 text-right">
                  {formatDistanceToNow(purchase.timestamp, { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
