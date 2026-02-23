import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.05] to-transparent" />
        <div className="section-container relative text-center">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Ready to Find Your <span className="gradient-text">Path</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join thousands of young people who've discovered their career direction with ClearPath.
          </p>
          <Link to="/career-input" className="glow-button inline-flex items-center gap-2 text-lg animate-glow-pulse">
            Start Now — It's Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Compass className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">ClearPath</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 ClearPath. Built for underserved youth everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
