"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  X,
  ChevronDown,
  Clock,
  Laptop,
  BarChart3,
  Rocket,
  Users,
} from "lucide-react";
import { Button } from "@/components/shared/button";
import { useToast } from "@/components/practo/toast";
import { ToastProvider } from "@/components/practo/toast";
import { CourseHeader, CourseFooter } from "@/components/course/layout-components";
import { registrationSchema, syllabusSchema, MODULES } from "@/data/schemas";
import { cn } from "@/lib/utils";

const MODULES_LIST: { title: string; desc: string }[] = [
  {
    title: "Prompting & AI fundamentals",
    desc: "Write effective prompts, understand model limits, and work reliably with LLMs.",
  },
  {
    title: "AI tools for work",
    desc: "Hands-on with the tools teams use daily — writing, research, meetings and analysis.",
  },
  {
    title: "Automation with no-code tools",
    desc: "Connect apps and automate repetitive work without writing code.",
  },
  {
    title: "Building with AI",
    desc: "Ship small AI-powered apps and prototypes using no-code and low-code platforms.",
  },
  {
    title: "Content & design with AI",
    desc: "Create visuals, copy and multimedia with AI tools — and edit them for real use.",
  },
  {
    title: "Shipping a portfolio project",
    desc: "Build and publish one capstone project you can show employers.",
  },
];

const PROJECTS = [
  "An AI-assisted research assistant that summarises and cites sources.",
  "A no-code automation that moves data between your everyday tools.",
  "A small AI-powered web prototype built without a engineering team.",
  "A portfolio case study documenting your process and results.",
];

const AUDIENCE = [
  {
    title: "Students",
    desc: "Build practical AI skills to stand out for internships and placements.",
  },
  {
    title: "Early professionals",
    desc: "Automate routine work and ship AI-enhanced projects at your job.",
  },
  {
    title: "Career switchers",
    desc: "Add AI workflow and prototyping to your resume and portfolio.",
  },
];

const WEEKS = [
  {
    week: 1,
    title: "Foundations & prompting",
    focus: "How LLMs work, prompt writing, output evaluation.",
  },
  {
    week: 2,
    title: "AI tools for daily work",
    focus: "Writing, research, transcription and meeting workflows.",
  },
  {
    week: 3,
    title: "No-code automation",
    focus: "Connecting apps, triggers, actions and scheduled workflows.",
  },
  {
    week: 4,
    title: "Building with AI",
    focus: "No-code platforms, AI APIs, simple interactive prototypes.",
  },
  {
    week: 5,
    title: "Content & design with AI",
    focus: "Visuals, copy, video basics and editing for real distribution.",
  },
  {
    week: 6,
    title: "Capstone & shipping",
    focus: "Build your portfolio project and publish it.",
  },
];

export default function CoursePage() {
  return (
    <ToastProvider>
      <CourseBody />
    </ToastProvider>
  );
}

function CourseBody() {
  const { add } = useToast();
  const [syllabusOpen, setSyllabusOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(true);

  // Registration form state
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "student" as const,
    interest: MODULES[0],
    message: "",
    honeypot: "",
  });
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [registerSubmitted, setRegisterSubmitted] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  // Syllabus form state
  const [syllabusEmail, setSyllabusEmail] = useState("");
  const [syllabusError, setSyllabusError] = useState<string | null>(null);
  const [syllabusSubmitting, setSyllabusSubmitting] = useState(false);
  const [syllabusSubmitted, setSyllabusSubmitted] = useState(false);

  // Hide sticky mobile CTA once #register section is in view
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShowMobileCta(false);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("register");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleRegistration = useCallback(
    async (data: unknown) => {
      const parsed = registrationSchema.safeParse(data);
      if (!parsed.success) return parsed;
      setSubmitting(true);
      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        if (!res.ok) throw new Error("Submission failed");
        setSubmitting(false);
        setRegisterSubmitted(true);
        add({
          title: "Seat reserved",
          description: "Thanks — check your email for the confirmation.",
          type: "success",
        });
      } catch {
        setSubmitting(false);
        setRegisterError(true);
        add({
          title: "Submission failed",
          description: "Please try again later.",
          type: "error",
        });
      }
      return parsed;
    },
    [add]
  );

  const handleSyllabus = useCallback(
    async (data: unknown) => {
      const parsed = syllabusSchema.safeParse(data);
      if (!parsed.success) return parsed;
      setSyllabusSubmitting(true);
      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });
        if (!res.ok) throw new Error("Submission failed");
        setSyllabusSubmitting(false);
        setSyllabusSubmitted(true);
        setSyllabusOpen(false);
        add({
          title: "Syllabus sent",
          description: "Check your inbox for the download link.",
          type: "success",
        });
      } catch {
        setSyllabusSubmitting(false);
        setSyllabusError("Submission failed. Please try again later.");
        add({
          title: "Submission failed",
          description: "Please try again later.",
          type: "error",
        });
      }
      return parsed;
    },
    [add]
  );

  const setRegField = (key: string, value: string) => {
    setRegData((prev) => ({ ...prev, [key]: value }));
    setRegErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleRegSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegErrors({});
    if (regData.honeypot) {
      // Honeypot filled — likely a bot; silently succeed
      setSubmitting(false);
      setRegisterSubmitted(true);
      return;
    }
    const parsed = registrationSchema.safeParse(regData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, vals] of Object.entries(
        parsed.error.flatten().fieldErrors
      )) {
        fieldErrors[key] = (vals as string[])[0] ?? "";
      }
      setRegErrors(fieldErrors);
      return;
    }
    await handleRegistration(parsed.data);
  };

  const handleSyllabusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSyllabusError(null);
    const parsed = syllabusSchema.safeParse({ type: "syllabus", email: syllabusEmail });
    if (!parsed.success) {
      setSyllabusError("Please enter a valid email.");
      return;
    }
    await handleSyllabus(parsed.data);
  };

  return (
    <div className="min-h-full flex flex-col bg-course-bg text-course-text">
      <CourseHeader />

        <main className="flex-grow relative overflow-hidden">
          {/* Section 1: Hero */}
          <section className="relative px-6 py-12 lg:py-20 max-w-5xl mx-auto">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
              <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-course-accent/10 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-course-accent/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-lg bg-course-accent/10 px-3 py-1 text-[11px] font-bold text-course-accent uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-course-accent animate-pulse"></span>
                  6-week cohort &bull; next batch starts soon
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-course-text leading-tight tracking-tight">
                  Learn to build with <span className="text-course-accent">AI</span>
                </h1>
                <p className="text-lg lg:text-xl text-course-text-muted leading-relaxed max-w-md">
                  A practical, project-first AI and digital-skills programme for
                  students and young professionals. No fake guarantees &mdash; just
                  real tools, real projects and a portfolio you can show employers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="#register"
                    size="lg"
                    className="w-full sm:w-auto min-h-[52px] bg-course-accent text-course-bg hover:bg-course-accent/90 shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-course-accent focus-visible:ring-offset-2"
                  >
                    Reserve your seat
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setSyllabusOpen(true)}
                    className="w-full sm:w-auto min-h-[52px] border-course-border hover:border-course-accent text-course-text hover:text-course-accent"
                  >
                    Download syllabus
                  </Button>
                </div>
                <div className="mt-6 flex items-center gap-3 text-xs text-course-text-muted">
                  <CheckCircle2 className="w-3 h-3 text-course-accent" />
                  <span>Sample programme &mdash; no job guarantees</span>
                </div>
              </div>

              <div className="relative hidden lg:block">
                {/* Stylised workflow card stack (CSS/SVG only) */}
                <div className="relative h-[420px] w-full">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "absolute rounded-2xl border border-course-border bg-course-surface p-6 shadow-card transition-all duration-500",
                        i === 1
                          ? "top-0 left-0 w-full z-10"
                          : i === 2
                            ? "top-16 left-8 w-[85%] z-20 opacity-90"
                            : "top-32 left-16 w-[70%] z-30 opacity-80"
                      )}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded bg-course-accent/20 flex items-center justify-center text-course-accent font-bold">
                          {i}
                        </div>
                        <h4 className="font-bold text-course-text">
                          {i === 1 ? "Learn" : i === 2 ? "Build" : "Ship"}
                        </h4>
                      </div>
                      <p className="text-sm text-course-text-muted leading-relaxed">
                        {i === 1
                          ? "Prompting, AI tools and automation fundamentals."
                          : i === 2
                            ? "Build no-code prototypes and AI-powered mini-apps."
                            : "Publish a capstone portfolio project."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Problem and promise */}
          <section id="how-it-works" className="px-6 py-16 max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-course-text">Why most courses fail</h2>
                <ul className="space-y-4 text-course-text-muted text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-1 h-5 rounded-full bg-course-text/20 shrink-0 mt-0.5" />
                    <span>
                      Too much theory, not enough building &mdash; you finish with
                      certificates, not projects.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1 h-5 rounded-full bg-course-text/20 shrink-0 mt-0.5" />
                    <span>
                      Generic AI content you could find in a free YouTube playlist.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1 h-5 rounded-full bg-course-text/20 shrink-0 mt-0.5" />
                    <span>
                      No portfolio piece, nothing to show employers or clients.
                    </span>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-course-text">What&rsquo;s different here</h2>
                <ul className="space-y-4 text-course-text text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-course-accent shrink-0 mt-0.5" />
                    <span>
                      Project-first: every week ends with something you build.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-course-accent shrink-0 mt-0.5" />
                    <span>
                      Real tools used in real workflows &mdash; no toy examples.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-course-accent shrink-0 mt-0.5" />
                    <span>
                      One capstone project you publish and can show employers.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: What you will learn */}
          <section className="px-6 py-16 bg-course-surface/30 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-course-text mb-4">What you will learn</h2>
              <p className="text-course-text-muted">Six modules, one per week.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {MODULES_LIST.map((m) => (
                <div
                  key={m.title}
                  className="rounded-2xl border border-course-border bg-course-surface p-6 hover:border-course-accent/50 transition-colors"
                >
                  <h3 className="font-bold text-course-text mb-2">{m.title}</h3>
                  <p className="text-sm text-course-text-muted leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Outcomes and projects */}
          <section className="px-6 py-16 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-course-text">What you ship</h2>
              <span className="text-xs text-course-text-muted uppercase tracking-wider">
                Sample projects
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {PROJECTS.map((p) => (
                <div key={p} className="flex items-start gap-3 rounded-xl border border-course-border bg-course-surface p-5">
                  <Rocket className="w-5 h-5 text-course-accent shrink-0 mt-0.5" />
                  <p className="text-sm text-course-text">{p}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Who it is for */}
          <section className="px-6 py-16 bg-course-surface/30 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-course-text text-center mb-12">
              Who it is for
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {AUDIENCE.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl border border-course-border bg-course-surface p-6"
                >
                  <h3 className="font-bold text-course-text mb-2">{a.title}</h3>
                  <p className="text-sm text-course-text-muted leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Curriculum timeline */}
          <section id="curriculum" className="px-6 py-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-course-text mb-12">Curriculum &mdash; week by week</h2>
            <div className="space-y-5 border-l border-course-border/30 pl-6">
              {WEEKS.map((w) => (
                <div key={w.week} className="relative group">
                  <div className="absolute -left-[8px] top-2 w-2 h-2 rounded-full bg-course-accent" />
                  <div className="rounded-xl border border-course-border bg-course-surface p-5 hover:border-course-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-course-accent uppercase tracking-wider">
                        Week {w.week}
                      </span>
                      <span className="text-xs text-course-text-muted">
                        Weekend + 1 weeknight
                      </span>
                    </div>
                    <h4 className="font-bold text-course-text">{w.title}</h4>
                    <p className="text-sm text-course-text-muted">{w.focus}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-course-text-muted">
              Schedule is a fictional placeholder for this demo.
            </p>
          </section>

          {/* Section 7: Instructor */}
          <section className="px-6 py-16 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-course-border bg-course-surface p-8 md:p-12 flex flex-col lg:flex-row gap-10 items-center">
              <div className="w-20 h-20 rounded-full bg-course-accent/20 flex items-center justify-center text-course-accent font-bold text-2xl shrink-0">
                SA
              </div>
              <div>
                <h3 className="text-2xl font-bold text-course-text mb-2">Sample instructor</h3>
                <p className="text-course-text-muted mb-4">
                  Placeholder mentor &mdash; bio and credentials are sample data for this demo.
                </p>
                <div className="flex items-center gap-4 text-sm text-course-text-muted">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> 3+ years AI product experience
                  </div>
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4" /> Built & shipped AI prototypes
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Testimonials */}
          <section className="px-6 py-16 bg-course-surface/30 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-course-text">What learners say</h2>
              <span className="text-xs text-course-text-muted uppercase tracking-wider">
                Sample testimonials
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                "The capstone project gave me something real to show in interviews.",
                "I went from zero AI knowledge to building my own automation in week 3.",
                "Practical tools, not just theory &mdash; exactly what I needed.",
              ].map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-course-border bg-course-surface p-6"
                >
                  <p className="text-sm text-course-text italic mb-4">
                    &ldquo;{t}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-course-accent/20 flex items-center justify-center text-course-accent font-bold text-xs">
                      S{i + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-course-text">Sample learner {i + 1}</div>
                      <div className="text-[10px] text-course-text-muted">
                        Sample testimonial
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 9: Batch dates and pricing */}
          <section id="pricing" className="px-6 py-16 max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold text-course-text mb-4">
                  Batch & pricing
                </h2>
                <p className="text-course-text-muted mb-6 leading-relaxed">
                  Cohort-based, online, weekend + one weeknight session. Limited
                  seats per batch.
                </p>
                <ul className="space-y-3 text-course-text text-sm">
                  <li className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-course-accent shrink-0" />
                    <span>6 weeks, part-time</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Laptop className="w-4 h-4 text-course-accent shrink-0" />
                    <span>Online &mdash; join from anywhere</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-course-accent shrink-0" />
                    <span>One capstone portfolio project</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-course-border bg-course-surface p-8">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-course-accent uppercase tracking-wider">
                    Sample pricing
                  </span>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-course-text">₹9,999</span>
                    <span className="text-sm text-course-text-muted"> per batch</span>
                  </div>
                  <p className="text-xs text-course-text-muted mt-4">
                    Fictional placeholder price for this demo. Seats are limited
                    &mdash; sample seat limit only.
                  </p>
                </div>
                <Button
                  href="#register"
                  className="w-full mt-6 min-h-[52px] bg-course-accent text-course-bg shadow-glow hover:bg-course-accent/90"
                >
                  Reserve your seat
                </Button>
              </div>
            </div>
          </section>

          {/* Section 10: FAQ */}
          <section id="faq" className="px-6 py-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-course-text mb-10">FAQ</h2>
            <div className="space-y-3">
              {[
                {
                  q: "Is this programme right for beginners?",
                  a: "Yes. It starts with AI fundamentals and assumes no prior experience.",
                },
                {
                  q: "Do I need to know how to code?",
                  a: "No. The programme uses no-code tools alongside optional lightweight code.",
                },
                {
                  q: "Is the batch schedule real?",
                  a: "No &mdash; dates, pricing and seat limits are fictional placeholders for this demo.",
                },
                {
                  q: "Will I get a job after this?",
                  a: "No guarantees. You&rsquo;ll build a portfolio project to show employers.",
                },
                {
                  q: "Is the instructor real?",
                  a: "No &mdash; mentor details are labelled sample data for this demo.",
                },
                {
                  q: "What do I receive after enrolling?",
                  a: "A confirmation email, WhatsApp group invite and an optional call (demo flow).",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-course-border bg-course-surface overflow-hidden"
                >
                  <button
                    className="flex w-full items-center justify-between px-6 py-4 text-course-text font-medium hover:bg-course-surface/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-course-accent"
                    aria-expanded={false}
                    aria-controls={`faq-${i}`}
                  >
                    {item.q}
                    <ChevronDown className="w-4 h-4 text-course-text-muted transition-transform" />
                  </button>
                  <div
                    id={`faq-${i}`}
                    className="px-6 pb-4 text-course-text-muted text-sm leading-relaxed"
                    hidden
                  >
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-course-text-muted">
              All answers are sample content for demonstration purposes.
            </p>
          </section>

          {/* Section 11: Registration */}
          <section id="register" className="px-6 py-20 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-course-text mb-4">Reserve your seat</h2>
              <p className="text-course-text-muted">Next batch starts soon &mdash; sample dates.</p>
            </div>

            <AnimatePresence>
              {registerSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-course-border bg-course-surface p-8 md:p-12 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-course-accent/20 flex items-center justify-center mx-auto mb-6 text-course-accent">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-course-text mb-3">
                    Seat reserved
                  </h3>
                  <p className="text-course-text-muted mb-8 max-w-sm mx-auto leading-relaxed">
                    Thanks! Check your email for the confirmation. This is a demo &mdash;
                    no real enrolment occurs.
                  </p>
                  <h4 className="text-sm font-bold text-course-text mb-3 uppercase tracking-wider">
                    What happens next
                  </h4>
                  <ol className="text-sm text-course-text-muted space-y-3 text-left max-w-xs mx-auto leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-course-accent/20 text-course-accent flex items-center justify-center text-xs shrink-0 mt-0.5">
                        1
                      </span>
                      Confirmation email arrives shortly.
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-course-accent/20 text-course-accent flex items-center justify-center text-xs shrink-0 mt-0.5">
                        2
                      </span>
                      WhatsApp group invite (demo flow).
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-course-accent/20 text-course-accent flex items-center justify-center text-xs shrink-0 mt-0.5">
                        3
                      </span>
                      Optional prep call before the batch.
                    </li>
                  </ol>
                  <p className="mt-6 text-[10px] text-course-text-muted/70">
                    This is a demonstration page &mdash; no real enrolment or payment occurs.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleRegSubmit}
                  className="space-y-4 rounded-2xl border border-course-border bg-course-surface p-6 md:p-10"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-course-text-muted uppercase tracking-wider">
                        Full name
                      </label>
                      <input
                        name="name"
                        value={regData.name}
                        onChange={(e) => setRegField("name", e.target.value)}
                        placeholder="Aanya Sharma"
                        className={cn(
                          "w-full py-3 rounded-xl border bg-course-bg text-course-text placeholder-course-text-muted focus:outline-none focus:ring-2 focus:ring-course-accent",
                          regErrors.name ? "border-red-500" : "border-course-border"
                        )}
                      />
                      {regErrors.name && (
                        <p className="text-[10px] text-red-500">{regErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-course-text-muted uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={regData.email}
                        onChange={(e) => setRegField("email", e.target.value)}
                        placeholder="you@example.com"
                        className={cn(
                          "w-full py-3 rounded-xl border bg-course-bg text-course-text placeholder-course-text-muted focus:outline-none focus:ring-2 focus:ring-course-accent",
                          regErrors.email ? "border-red-500" : "border-course-border"
                        )}
                      />
                      {regErrors.email && (
                        <p className="text-[10px] text-red-500">{regErrors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-course-text-muted uppercase tracking-wider">
                        Phone / WhatsApp
                      </label>
                      <input
                        name="phone"
                        value={regData.phone}
                        onChange={(e) => setRegField("phone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className={cn(
                          "w-full py-3 rounded-xl border bg-course-bg text-course-text placeholder-course-text-muted focus:outline-none focus:ring-2 focus:ring-course-accent",
                          regErrors.phone ? "border-red-500" : "border-course-border"
                        )}
                      />
                      {regErrors.phone && (
                        <p className="text-[10px] text-red-500">{regErrors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-course-text-muted uppercase tracking-wider">
                        I am a
                      </label>
                      <select
                        name="status"
                        value={regData.status}
                        onChange={(e) => setRegField("status", e.target.value)}
                        className={cn(
                          "w-full py-3 rounded-xl border bg-course-bg text-course-text focus:outline-none focus:ring-2 focus:ring-course-accent",
                          regErrors.status ? "border-red-500" : "border-course-border"
                        )}
                      >
                        <option value="student">Student</option>
                        <option value="professional">Working professional</option>
                        <option value="career-switcher">Career switcher</option>
                      </select>
                      {regErrors.status && (
                        <p className="text-[10px] text-red-500">{regErrors.status}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-course-text-muted uppercase tracking-wider">
                      Main interest
                    </label>
                    <select
                      name="interest"
                      value={regData.interest}
                      onChange={(e) => setRegField("interest", e.target.value)}
                      className={cn(
                        "w-full py-3 rounded-xl border bg-course-bg text-course-text focus:outline-none focus:ring-2 focus:ring-course-accent",
                        regErrors.interest ? "border-red-500" : "border-course-border"
                      )}
                    >
                      {MODULES_LIST.map((m) => (
                        <option key={m.title} value={m.title}>
                          {m.title}
                        </option>
                      ))}
                    </select>
                    {regErrors.interest && (
                      <p className="text-[10px] text-red-500">{regErrors.interest}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-course-text-muted uppercase tracking-wider">
                      Message (optional)
                    </label>
                    <textarea
                      name="message"
                      value={regData.message}
                      onChange={(e) => setRegField("message", e.target.value)}
                      rows={2}
                      placeholder="Anything you want us to know?"
                      className="w-full py-3 rounded-xl border bg-course-bg text-course-text placeholder-course-text-muted focus:outline-none focus:ring-2 focus:ring-course-accent"
                    />
                  </div>

                  {/* Honeypot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                    aria-hidden="true"
                  >
                    <input
                      name="honeypot"
                      type="text"
                      tabIndex={-1}
                      value={regData.honeypot}
                      onChange={(e) => setRegField("honeypot", e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="flex-1 min-h-[52px] bg-course-accent text-course-bg shadow-glow hover:bg-course-accent/90 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Reserving…" : "Reserve your seat"}
                    </Button>
                  </div>

                  {registerError && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400 text-sm">
                      Submission failed. Please try again later.
                    </div>
                  )}
                </form>
              )}
            </AnimatePresence>
          </section>
        </main>

        {/* Sticky mobile CTA bar */}
        {showMobileCta && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-course-bg/95 backdrop-blur border-t border-course-border">
            <div className="flex items-center justify-between px-6 py-3">
              <span className="text-xs font-bold text-course-accent uppercase tracking-wider">
                Limited seats
              </span>
              <Button
                href="#register"
                size="sm"
                className="px-5 py-2.5 text-sm bg-course-accent text-course-bg shadow-glow hover:bg-course-accent/90 min-h-[44px]"
              >
                Reserve your seat
              </Button>
            </div>
          </div>
        )}

        {/* Syllabus capture dialog */}
        {syllabusOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSyllabusOpen(false)}
            aria-hidden="true"
          >
            <div
              className="bg-course-surface rounded-2xl border border-course-border p-6 max-w-md w-full shadow-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-course-text">Download syllabus</h3>
                <button
                  onClick={() => setSyllabusOpen(false)}
                  className="text-course-text-muted hover:text-course-accent"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-course-text-muted mb-6">
                Enter your email and we&rsquo;ll send the syllabus download link.
                Sample data for demonstration.
              </p>
              <form
                onSubmit={handleSyllabusSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-course-text-muted uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={syllabusEmail}
                    onChange={(e) => setSyllabusEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={cn(
                      "w-full py-3 rounded-xl border bg-course-bg text-course-text placeholder-course-text-muted focus:outline-none focus:ring-2 focus:ring-course-accent",
                      syllabusError ? "border-red-500" : "border-course-border"
                    )}
                  />
                  {syllabusError && (
                    <p className="text-[10px] text-red-500">{syllabusError}</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSyllabusOpen(false)}
                    className="flex-1 min-h-[44px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={syllabusSubmitting}
                    className="flex-1 min-h-[44px] bg-course-accent text-course-bg disabled:opacity-60"
                  >
                    {syllabusSubmitting ? "Sending…" : "Send syllabus"}
                  </Button>
                </div>
                {syllabusSubmitted && (
                  <div className="mt-4 rounded-lg border border-course-accent/30 bg-course-accent/10 p-4 text-course-accent text-sm">
                    Syllabus sent — check your inbox for the download link at
                    <a
                      href="/syllabus.pdf"
                      className="underline underline-offset-4"
                      target="_blank"
                      rel="noopener"
                    >
                      /syllabus.pdf
                    </a>
                    .
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        <CourseFooter />
      </div>
    );
}
