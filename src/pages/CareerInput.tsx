import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowLeft, ArrowRight, GraduationCap, Heart, AlertTriangle } from "lucide-react";

const steps = [
  { label: "Basic Info", icon: GraduationCap },
  { label: "Interests", icon: Heart },
  { label: "Challenges", icon: AlertTriangle },
];

const educationLevels = [
  "No formal education",
  "Primary school",
  "Middle school",
  "High school",
  "Some college",
  "Associate degree",
  "Bachelor's degree",
  "Other",
];

const CareerInput = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    education: "",
    location: "",
    interests: "",
    challenges: "",
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const validationErrors: Record<number, Record<string, string>> = {
    0: {
      ...(!formData.education && touched.education ? { education: "Please select your education level" } : {}),
      ...(!formData.location.trim() && touched.location ? { location: "Please enter your location" } : {}),
    },
    1: {
      ...(!formData.interests.trim() && touched.interests ? { interests: "Tell us at least a little about what you enjoy" } : {}),
    },
  };

  const stepErrors = validationErrors[currentStep] || {};

  const canProceed =
    currentStep === 0
      ? formData.education !== "" && formData.location.trim() !== ""
      : currentStep === 1
        ? formData.interests.trim().length > 0
        : true;

  const handleNext = () => {
    if (!canProceed) {
      // touch all fields in current step
      if (currentStep === 0) setTouched((t) => ({ ...t, education: true, location: true }));
      if (currentStep === 1) setTouched((t) => ({ ...t, interests: true }));
      return;
    }
    setDirection("next");
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        navigate("/generating", { state: { formData } });
      }, 300);
    }
  };

  const handleBack = () => {
    setDirection("back");
    if (currentStep > 0) setCurrentStep((s) => s - 1);
    else navigate("/");
  };

  const slideClass =
    direction === "next"
      ? "animate-[slide-in-next_0.35s_ease-out_forwards]"
      : "animate-[slide-in-back_0.35s_ease-out_forwards]";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 section-container">
        <div className="mx-auto max-w-2xl">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2 text-sm">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 ${i <= currentStep
                      ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_15px_-3px_hsl(var(--primary)/0.5)]"
                      : "bg-secondary text-muted-foreground"
                      }`}
                  >
                    {i + 1}
                  </div>
                  <span className={`hidden sm:block transition-colors duration-200 ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form steps */}
          <div className={`glass-card p-8 sm:p-10 ${slideClass}`} key={currentStep}>
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
                  <p className="text-muted-foreground text-sm">This helps us tailor your career roadmap.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Education Level <span className="text-destructive">*</span></label>
                  <select
                    value={formData.education}
                    onChange={(e) => {
                      setFormData({ ...formData, education: e.target.value });
                      setTouched((t) => ({ ...t, education: true }));
                    }}
                    onBlur={() => setTouched((t) => ({ ...t, education: true }))}
                    className={`w-full rounded-xl bg-secondary border px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${stepErrors.education ? "border-destructive" : "border-border"
                      }`}
                  >
                    <option value="">Select your education level</option>
                    {educationLevels.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                  {stepErrors.education && (
                    <p className="text-destructive text-xs mt-1.5 animate-fade-in">{stepErrors.education}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location / Country <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    placeholder="e.g., Lagos, Nigeria"
                    value={formData.location}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                      setTouched((t) => ({ ...t, location: true }));
                    }}
                    onBlur={() => setTouched((t) => ({ ...t, location: true }))}
                    className={`w-full rounded-xl bg-secondary border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${stepErrors.location ? "border-destructive" : "border-border"
                      }`}
                  />
                  {stepErrors.location && (
                    <p className="text-destructive text-xs mt-1.5 animate-fade-in">{stepErrors.location}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">What excites you?</h2>
                  <p className="text-muted-foreground text-sm">Tell us about your interests, hobbies, or things you enjoy doing.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Interests & Hobbies <span className="text-destructive">*</span></label>
                  <textarea
                    placeholder="e.g., I love drawing, solving puzzles, helping people, working with my hands..."
                    value={formData.interests}
                    onChange={(e) => {
                      setFormData({ ...formData, interests: e.target.value });
                      setTouched((t) => ({ ...t, interests: true }));
                    }}
                    onBlur={() => setTouched((t) => ({ ...t, interests: true }))}
                    rows={5}
                    className={`w-full rounded-xl bg-secondary border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none ${stepErrors.interests ? "border-destructive" : "border-border"
                      }`}
                  />
                  {stepErrors.interests && (
                    <p className="text-destructive text-xs mt-1.5 animate-fade-in">{stepErrors.interests}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Any challenges?</h2>
                  <p className="text-muted-foreground text-sm">Optional — share anything that might affect your career path so we can work around it.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Challenges or Limitations</label>
                  <textarea
                    placeholder="e.g., Limited internet access, need to earn income soon, no laptop..."
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    rows={5}
                    className="w-full rounded-xl bg-secondary border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={isSubmitting}
              className={`flex items-center gap-2 transition ${isSubmitting ? "text-muted-foreground/50 cursor-not-allowed" : "text-muted-foreground hover:text-foreground"}`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className={`glow-button-sm flex items-center gap-2 transition-all duration-200 ${!canProceed || isSubmitting ? "opacity-40 cursor-not-allowed shadow-none hover:scale-100" : ""
                }`}
            >
              {isSubmitting ? "Processing..." : (currentStep === steps.length - 1 ? "Generate Roadmap" : "Next")}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerInput;
