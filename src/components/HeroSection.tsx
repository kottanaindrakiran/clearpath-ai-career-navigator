import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="section-container relative z-10 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-4 w-4" />
            AI-Powered Career Navigation
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Your Future,{" "}
            <span className="gradient-text">Mapped by AI</span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Tell us about yourself and get a realistic, personalized career roadmap — completely free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/career-input" className="glow-button text-lg flex items-center gap-2 animate-glow-pulse">
              Get My Roadmap
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
