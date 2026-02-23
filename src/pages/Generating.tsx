import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Compass } from "lucide-react";

const tips = [
  "💡 Tip: Many tech giants started in small towns.",
  "🌍 Over 60% of future jobs haven't been invented yet.",
  "📱 The most in-demand skills can be learned for free online.",
  "🎯 Career paths are rarely linear — and that's okay!",
  "🚀 Your unique background is your superpower.",
  "📚 Consistency beats intensity — 30 min/day can change your life.",
];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const Generating = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tipIndex, setTipIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const formData = location.state?.formData;
  const hasFetched = useRef(false);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex((i) => (i + 1) % tips.length);
    }, 3000);
    return () => clearInterval(tipInterval);
  }, []);

  // Visual simulation of progress up to 90% while waiting for API
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return 90;
        return p + 1;
      });
    }, 100);
    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (!formData) {
      navigate("/");
      return;
    }

    const generateRoadmap = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const response = await fetch(`${BACKEND_URL}/api/generate-roadmap`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            educationLevel: formData.education,
            location: formData.location,
            interests: formData.interests,
            challenges: formData.challenges,
          })
        });

        if (!response.ok) {
          throw new Error("Failed to generate roadmap");
        }

        const data = await response.json();

        // Save to DB on generation success
        if (data.careerTitle !== "Career guidance unavailable") {
          try {
            // Fire and forget save roadmap
            fetch(`${BACKEND_URL}/api/save-roadmap`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                educationLevel: formData.education,
                location: formData.location,
                interests: formData.interests,
                challenges: formData.challenges,
                aiResponse: data
              })
            }).catch(err => console.error("Non-fatal: failed to save", err));
          } catch (e) {
            console.error(e)
          }
        }

        setProgress(100);
        setTimeout(() => {
          navigate("/roadmap", { state: { roadmapData: data, profile: formData } });
        }, 500);

      } catch (error) {
        console.error("Network or severe error generating roadmap:", error);
        // On complete network failure, use the fallback JSON
        const fallbackData = {
          careerTitle: "Career guidance unavailable",
          whyThisFitsYou: "We're having trouble connecting to the generation service right now. Please check your connection and try again.",
          milestones: [],
          skillGaps: [],
          resources: [],
          actionPlan: []
        };
        setProgress(100);
        setTimeout(() => {
          navigate("/roadmap", { state: { roadmapData: fallbackData, profile: formData } });
        }, 500);
      }
    };

    generateRoadmap();
  }, [formData, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/20 blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 text-center px-4 max-w-md">
        {/* Spinning logo */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-[0_0_60px_-10px_hsl(var(--primary)/0.6)] animate-spin-slow">
          <Compass className="h-10 w-10 text-primary-foreground" />
        </div>

        <h1 className="text-2xl font-bold mb-3 animate-fade-in">
          Analyzing your goals...
        </h1>
        <p className="text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Building your personalized career roadmap
        </p>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden mb-8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Rotating tips */}
        <div className="glass-card px-6 py-4 text-sm text-muted-foreground animate-fade-in min-h-[60px] flex items-center justify-center" key={tipIndex}>
          <p className="animate-fade-in">{tips[tipIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default Generating;
