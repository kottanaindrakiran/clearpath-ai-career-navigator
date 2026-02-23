import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Clear<span className="gradient-text">Path</span>
          </span>
        </Link>
        <Link to="/career-input" className="glow-button-sm text-sm">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
