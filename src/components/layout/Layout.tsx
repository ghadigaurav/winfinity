
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useState, useEffect } from "react";
import { Coins, Diamond, Crown } from "lucide-react";

export const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-winfinity-darker-blue flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <Diamond size={60} className="text-winfinity-purple animate-glow mb-6 mx-auto" />
            <Coins size={40} className="text-winfinity-cyan absolute -top-4 -left-4 animate-float" />
            <Crown size={40} className="text-winfinity-pink absolute -bottom-4 -right-4 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>
          <h1 className="text-4xl font-bold mb-2 gradient-text tracking-wider">WINFINITY 3.0</h1>
          <p className="text-winfinity-cyan animate-pulse">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-winfinity-darker-blue">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
