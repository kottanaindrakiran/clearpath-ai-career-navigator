import { UserCircle, Cpu, Map } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    step: "01",
    title: "Tell Us About You",
    description: "Share your education, interests, and any challenges you face.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analyzes Your Profile",
    description: "Our AI matches your unique profile to thousands of career paths.",
  },
  {
    icon: Map,
    step: "03",
    title: "Get Your Roadmap",
    description: "Receive a personalized plan with skills, resources, and timelines.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div className="section-container relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three simple steps to your personalized career roadmap.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50" />

          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] relative z-10">
                <step.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 block">
                Step {step.step}
              </span>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
