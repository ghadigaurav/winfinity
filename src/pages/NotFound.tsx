
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Diamond } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-lg px-4">
        <div className="relative mb-8 inline-block">
          <Diamond size={60} className="text-winfinity-purple animate-pulse" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
            404
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4 gradient-text">Page Not Found</h1>
        <p className="text-white/70 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to the game.
        </p>
        <Link to="/">
          <Button className="bg-winfinity-cyan text-winfinity-darker-blue hover:bg-winfinity-cyan/90">
            <ChevronLeft size={16} className="mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
