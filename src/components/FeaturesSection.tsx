import { Brain, BookOpen, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Career Path",
    description: "Our AI analyzes your skills, interests, and background to suggest careers that truly fit your life.",
  },
  {
    icon: BookOpen,
    title: "Free Learning Resources",
    description: "Get curated links to free courses, tutorials, and certifications — no paywalls, no barriers.",
  },
  {
    icon: Shield,
    title: "Built for Real-Life Constraints",
    description: "We account for your location, budget, and time. No ivory tower advice — just realistic next steps.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            Why <span className="gradient-text">ClearPath</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built specifically for underserved youth who deserve equal access to career guidance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="glass-card-hover p-8 group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 group-hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)] transition-shadow duration-300">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
