
import React from "react";
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

export const LivePurchasesTable = ({ purchases }: LivePurchasesTableProps) => {
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

