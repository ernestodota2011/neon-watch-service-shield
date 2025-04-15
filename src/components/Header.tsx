
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-black/50 backdrop-blur-lg border-b border-neon-primary/20 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="ServiceWatch" className="h-8 w-8" />
          <span className="text-neon-primary font-semibold text-xl">
            ServiceWatch
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          <a
            href="#"
            className="text-white/70 hover:text-neon-primary transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-white/70 hover:text-neon-primary transition-colors"
          >
            Services
          </a>
          <a
            href="#"
            className="text-white/70 hover:text-neon-primary transition-colors"
          >
            Settings
          </a>
        </nav>
        <div className="flex items-center">
          <Activity className="h-5 w-5 text-neon-primary animate-glow-pulse" />
        </div>
      </div>
    </header>
  );
};

export default Header;
