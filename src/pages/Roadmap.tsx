import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import {
  Target, Brain, BookOpen, CalendarDays, RefreshCw, Download,
  GraduationCap, MapPin, Briefcase, Code, Palette, Users, TrendingUp,
  ExternalLink, Clock, Star, Sparkles, Compass, Pencil, Rocket
} from "lucide-react";

/* ── Skeleton placeholder ── */
const SkeletonCard = ({ lines = 3 }: { lines?: number }) => (
  <div className="glass-card p-6 sm:p-8 animate-pulse space-y-4">
    <div className="h-5 w-40 rounded-lg bg-muted" />
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-4 rounded-lg bg-muted" style={{ width: `${85 - i * 12}%` }} />
    ))}
  </div>
);

/* ── Empty state ── */
const EmptyState = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <Navbar />
    <div className="relative text-center px-4 max-w-md">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-primary/15 blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="relative z-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]">
          <Compass className="h-10 w-10 text-primary animate-float" />
        </div>
        <h2 className="text-2xl font-bold mb-3">No Roadmap Yet</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Start your journey by generating your personalized AI career roadmap.
        </p>
        <Link to="/career-input" className="glow-button inline-flex items-center gap-2 text-lg animate-glow-pulse">
          <Rocket className="h-5 w-5" />
          Generate My Roadmap
        </Link>
      </div>
    </div>
  </div>
);

const getIconForMilestone = (index: number) => {
  const icons = [Palette, Code, Users, Briefcase, TrendingUp, Target, Brain, Star];
  return icons[index % icons.length];
};

const Roadmap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const roadmapData = location.state?.roadmapData;
  const profile = location.state?.profile;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!roadmapData || !profile) return <EmptyState />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-container">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent mb-4">
              <Star className="h-4 w-4" />
              Your AI-Generated Career Roadmap
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
              Recommended: <span className="gradient-text">{roadmapData.careerTitle}</span>
            </h1>
          </div>

          {/* ── Top section: Why card + Profile card ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Why This Career Fits You — spans 2 cols */}
            {isLoading ? (
              <div className="lg:col-span-2"><SkeletonCard lines={4} /></div>
            ) : (
              <div className="lg:col-span-2 glass-card-hover p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Why This Career Fits You
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{roadmapData.whyThisFitsYou}</p>
              </div>
            )}

            {/* Profile Summary — 1 col, stacks on top on mobile via order */}
            {isLoading ? (
              <div className="order-first lg:order-none"><SkeletonCard lines={4} /></div>
            ) : (
              <div className="order-first lg:order-none glass-card-hover p-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Profile</h3>
                  <button
                    onClick={() => navigate("/career-input")}
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-accent transition-colors"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit Responses
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-muted-foreground text-xs block">Education</span>
                      <span>{profile.education}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-muted-foreground text-xs block">Location</span>
                      <span>{profile.location}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-muted-foreground text-xs block">Interests</span>
                      <span>{profile.interests}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-muted-foreground text-xs block">Challenges</span>
                      <span>{profile.challenges || "None specified"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Career Path Timeline */}
          {isLoading ? (
            <div className="mb-8"><SkeletonCard lines={5} /></div>
          ) : (
            <div className="glass-card-hover p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-6">
                <Target className="h-5 w-5 text-accent" />
                Career Path Timeline
              </h3>
              <div className="space-y-0">
                {roadmapData.milestones?.map((milestone: any, i: number) => {
                  const Icon = getIconForMilestone(i);
                  return (
                    <div key={milestone.title + i} className="relative flex gap-4 pb-8 last:pb-0">
                      {i < roadmapData.milestones.length - 1 && (
                        <div className="absolute left-5 top-10 bottom-0 w-px bg-gradient-to-b from-primary/50 to-primary/10" />
                      )}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-semibold">{milestone.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skill Gap */}
          {isLoading ? (
            <div className="mb-8"><SkeletonCard lines={2} /></div>
          ) : (
            <div className="glass-card-hover p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Brain className="h-5 w-5 text-accent" />
                Skills to Develop
              </h3>
              <div className="flex flex-wrap gap-2">
                {roadmapData.skillGaps?.map((skill: string, i: number) => (
                  <span key={skill + i} className="glow-pill">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Free Learning Resources */}
          {isLoading ? (
            <div className="mb-8"><SkeletonCard lines={4} /></div>
          ) : (
            <div className="glass-card-hover p-6 sm:p-8 mb-8 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <BookOpen className="h-5 w-5 text-accent" />
                Free Learning Resources
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {roadmapData.resources?.map((resource: any, i: number) => {
                  let platform = "Online";
                  try {
                    const urlObj = new URL(resource.url);
                    platform = urlObj.hostname.replace("www.", "");
                  } catch (e) {
                    // Invalid URL
                  }

                  return (
                    <a
                      key={resource.title + i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 hover:bg-secondary hover:shadow-[0_0_15px_-5px_hsl(var(--primary)/0.2)] transition-all duration-200 group"
                    >
                      <div>
                        <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{resource.title}</h4>
                        <p className="text-xs text-muted-foreground">{platform}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="glow-pill-accent text-[11px]">Free</span>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Plan */}
          {isLoading ? (
            <div className="mb-10"><SkeletonCard lines={3} /></div>
          ) : (
            <div className="glass-card-hover p-6 sm:p-8 mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <CalendarDays className="h-5 w-5 text-accent" />
                Action Plan
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {roadmapData.actionPlan?.map((item: any, i: number) => (
                  <div
                    key={item.phase + i}
                    className="p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/20 hover:shadow-[0_0_10px_-4px_hsl(var(--primary)/0.15)] transition-all duration-200"
                  >
                    <span className="text-xs font-semibold text-primary">{item.phase} ({item.duration})</span>
                    <p className="text-sm mt-1">{Array.isArray(item.steps) ? item.steps.join(", ") : item.steps}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Primary Action Buttons ── */}
          {!isLoading && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
              <button
                className="glow-button flex items-center justify-center gap-2 w-full sm:w-auto"
                onClick={() => window.print()}
              >
                <Download className="h-4 w-4" />
                Download My Career Plan
              </button>
              <Link
                to="/career-input"
                className="glow-button-outline flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate Roadmap
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
