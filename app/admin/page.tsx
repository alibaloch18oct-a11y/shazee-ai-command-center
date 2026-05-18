"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Eye,
  EyeOff,
  Globe2,
  KeyRound,
  Layers3,
  Loader2,
  Lock,
  RefreshCcw,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trash2,
  UserRound,
  WandSparkles,
  Zap,
} from "lucide-react";

const ADMIN_PASSCODE = "shazee-admin";

const CHAT_STORAGE_KEY = "shazee-ai-chat-history";
const PROJECT_IDEA_STORAGE_KEY = "shazee-ai-project-idea";
const PROJECT_ANALYSIS_STORAGE_KEY = "shazee-ai-project-analysis";

type SavedMessage = {
  role: "user" | "ai";
  text: string;
};

const stats = [
  {
    title: "AI Core",
    value: "Online",
    icon: Bot,
    text: "Groq API connected through a secure Next.js API route.",
    tone: "cyan",
  },
  {
    title: "Voice System",
    value: "Active",
    icon: Cpu,
    text: "Voice input and smoother Jarvis-style voice output are enabled.",
    tone: "emerald",
  },
  {
    title: "Deployment",
    value: "Live",
    icon: Rocket,
    text: "GitHub repository connected with Vercel auto-deployment.",
    tone: "blue",
  },
  {
    title: "Portfolio",
    value: "Ready",
    icon: Layers3,
    text: "About, skills, projects, resume reviewer, analyzer, and admin added.",
    tone: "purple",
  },
];

const checklist = [
  "Next.js project created",
  "Tailwind CSS configured",
  "Groq API connected",
  "AI chat working",
  "Chat memory added",
  "Saved browser history added",
  "Voice input added",
  "Smoother voice output added",
  "3D Jarvis globe added",
  "Portfolio sections added",
  "Project analyzer added",
  "Resume reviewer page added",
  "Admin dashboard added",
  "GitHub repository uploaded",
  "Vercel deployment completed",
];

const tools = [
  {
    name: "AI Console",
    status: "Live",
    health: "Excellent",
    details: "Main chat assistant with session memory, saved history, voice input, and voice output.",
  },
  {
    name: "Project Analyzer",
    status: "Live",
    health: "Excellent",
    details: "Turns project ideas into portfolio-ready technical plans using AI.",
  },
  {
    name: "Resume Reviewer",
    status: "Live",
    health: "Excellent",
    details: "Reviews resumes for ATS keywords, profile summary, skills, and improvements.",
  },
  {
    name: "Admin Dashboard",
    status: "Live",
    health: "Excellent",
    details: "Control panel for app status, saved data, reports, deployment checklist, and roadmap.",
  },
  {
    name: "PWA Setup",
    status: "Ready",
    health: "Good",
    details: "Manifest and app icon configured for installable web app behavior.",
  },
  {
    name: "Deployment Pipeline",
    status: "Live",
    health: "Excellent",
    details: "GitHub push triggers Vercel redeployment automatically.",
  },
];

const roadmap = [
  {
    title: "Premium AI Voice",
    level: "Next",
    text: "Use ElevenLabs or OpenAI TTS for a more realistic Jarvis-style voice.",
  },
  {
    title: "Real Login System",
    level: "Important",
    text: "Replace demo passcode with Clerk, Supabase Auth, Firebase Auth, or NextAuth.",
  },
  {
    title: "Database Storage",
    level: "Important",
    text: "Save user chat history, project analysis, and reports using Supabase or Firebase.",
  },
  {
    title: "Analytics Dashboard",
    level: "Advanced",
    text: "Track visitors, tool usage, messages, resume reviews, and project analysis count.",
  },
  {
    title: "PDF Export",
    level: "Useful",
    text: "Allow users to export resume review and project analyzer results as PDF.",
  },
];

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState("");
  const [loadingReport, setLoadingReport] = useState(false);

  const [savedChatCount, setSavedChatCount] = useState(0);
  const [savedProjectIdea, setSavedProjectIdea] = useState(false);
  const [savedProjectAnalysis, setSavedProjectAnalysis] = useState(false);
  const [lastRefresh, setLastRefresh] = useState("");

  const completionPercent = useMemo(() => {
    return Math.round((checklist.filter(Boolean).length / checklist.length) * 100);
  }, []);

  const liveToolsCount = useMemo(() => {
    return tools.filter((tool) => tool.status === "Live").length;
  }, []);

  useEffect(() => {
    refreshSavedData();
  }, []);

  function refreshSavedData() {
    if (typeof window === "undefined") return;

    try {
      const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      const savedIdea = localStorage.getItem(PROJECT_IDEA_STORAGE_KEY);
      const savedAnalysis = localStorage.getItem(PROJECT_ANALYSIS_STORAGE_KEY);

      if (savedMessages) {
        const parsed = JSON.parse(savedMessages) as SavedMessage[];
        setSavedChatCount(Array.isArray(parsed) ? parsed.length : 0);
      } else {
        setSavedChatCount(0);
      }

      setSavedProjectIdea(Boolean(savedIdea && savedIdea.trim().length > 0));
      setSavedProjectAnalysis(Boolean(savedAnalysis && savedAnalysis.trim().length > 0));
      setLastRefresh(new Date().toLocaleString());
    } catch {
      setSavedChatCount(0);
      setSavedProjectIdea(false);
      setSavedProjectAnalysis(false);
      setLastRefresh(new Date().toLocaleString());
    }
  }

  function clearSavedChat() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CHAT_STORAGE_KEY);
    refreshSavedData();
  }

  function clearAnalyzerData() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(PROJECT_IDEA_STORAGE_KEY);
    localStorage.removeItem(PROJECT_ANALYSIS_STORAGE_KEY);
    refreshSavedData();
  }

  function clearAllSavedData() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CHAT_STORAGE_KEY);
    localStorage.removeItem(PROJECT_IDEA_STORAGE_KEY);
    localStorage.removeItem(PROJECT_ANALYSIS_STORAGE_KEY);
    refreshSavedData();
  }

  function unlockDashboard() {
    if (passcode.trim() === ADMIN_PASSCODE) {
      setUnlocked(true);
      setError("");
      refreshSavedData();
      return;
    }

    setError("Wrong passcode. Try again.");
  }

  async function generateReport() {
    setLoadingReport(true);
    setReport("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `
Create a professional admin report for this portfolio project.

Project: Shazee AI Command Center
Creator: Shazee

Main features:
- AI chat
- Groq API backend route
- Voice input
- Smoother Jarvis-style voice output
- 3D Jarvis globe
- Chat memory
- Saved browser history
- AI project analyzer
- AI resume reviewer
- Portfolio sections
- Admin dashboard
- GitHub repository
- Vercel deployment

Current dashboard data:
- Completed checklist: ${completionPercent}%
- Live tools: ${liveToolsCount}/${tools.length}
- Saved chat messages in browser: ${savedChatCount}
- Saved project idea: ${savedProjectIdea ? "Yes" : "No"}
- Saved project analysis: ${savedProjectAnalysis ? "Yes" : "No"}

Return in this exact format:

Project Status:
Technical Strength:
Portfolio Value:
Best Features:
Weak Points:
Recommended Next Upgrades:
Short Pitch:
Final Rating:
          `,
          history: [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Report generation failed.");
      }

      setReport(data.reply || "No report generated.");
    } catch (err) {
      setReport(
        err instanceof Error
          ? `Error: ${err.message}`
          : "Error: Something went wrong."
      );
    } finally {
      setLoadingReport(false);
    }
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]" />
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />

        <section className="relative mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-5 py-6">
          <div className="w-full rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
                  <Lock size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Admin Dashboard Access</h1>
                  <p className="text-sm text-cyan-100/70">
                    Shazee AI Command Center control panel
                  </p>
                </div>
              </div>

              <Link
                href="/"
                className="rounded-2xl border border-cyan-300/25 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-white/10"
              >
                <ArrowLeft className="mr-2 inline h-4 w-4" />
                Home
              </Link>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/15 bg-black/35 p-5">
              <div className="mb-5 flex items-center gap-3">
                <KeyRound className="text-cyan-300" />
                <div>
                  <h2 className="text-xl font-bold">Enter Admin Passcode</h2>
                  <p className="text-sm leading-6 text-slate-400">
                    Demo passcode:
                    <span className="ml-2 rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 font-semibold text-cyan-200">
                      shazee-admin
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <input
                    type={showPasscode ? "text" : "password"}
                    value={passcode}
                    onChange={(event) => setPasscode(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") unlockDashboard();
                    }}
                    placeholder="Enter passcode..."
                    className="h-12 w-full rounded-2xl border border-cyan-300/15 bg-white/5 px-4 pr-12 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                  />
                  <button
                    onClick={() => setShowPasscode((old) => !old)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-200"
                    type="button"
                  >
                    {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button
                  onClick={unlockDashboard}
                  className="h-12 rounded-2xl bg-cyan-300 px-5 font-semibold text-slate-950 shadow-lg shadow-cyan-400/25 transition hover:scale-[1.02]"
                >
                  <ShieldCheck className="mr-2 inline h-5 w-5" />
                  Unlock
                </button>
              </div>

              {error && (
                <p className="mt-3 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-cyan-400/15 bg-black/25 p-4">
                <Sparkles className="mb-2 h-5 w-5 text-cyan-300" />
                <p className="text-sm font-semibold text-cyan-50">Portfolio Mode</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Demo admin area for project presentation.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-400/15 bg-black/25 p-4">
                <Terminal className="mb-2 h-5 w-5 text-cyan-300" />
                <p className="text-sm font-semibold text-cyan-50">AI Report</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Generate project analysis with Jarvis.
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-400/15 bg-black/25 p-4">
                <Database className="mb-2 h-5 w-5 text-cyan-300" />
                <p className="text-sm font-semibold text-cyan-50">Saved Data</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Monitor browser-saved chat and analyzer data.
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500">
              Note: This is a portfolio demo lock. For real production security,
              use Clerk, Supabase Auth, Firebase Auth, or NextAuth.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <section className="relative mx-auto min-h-screen w-full max-w-7xl px-5 py-6 lg:px-8">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-cyan-400/20 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">Admin Dashboard</h1>
              <p className="text-xs text-cyan-100/70">
                Shazee AI Command Center control panel
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-2xl border border-cyan-300/25 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 inline h-4 w-4" />
              Home
            </Link>

            <button
              onClick={() => {
                setUnlocked(false);
                setPasscode("");
              }}
              className="rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-400/20"
            >
              <Lock className="mr-2 inline h-4 w-4" />
              Lock
            </button>
          </div>
        </nav>

        <section className="mb-8 rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="mr-2 inline h-4 w-4" />
              Admin Mode
            </span>

            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
              {completionPercent}% Build Complete
            </span>

            <span className="rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-sm text-blue-100">
              {liveToolsCount}/{tools.length} Tools Live
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Project Control
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                  Dashboard.
                </span>
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                Monitor project health, saved browser data, tool status,
                deployment checklist, roadmap, and generate a professional AI
                project report for your portfolio.
              </p>
            </div>

            <button
              onClick={generateReport}
              disabled={loadingReport}
              className="rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/25 transition hover:scale-[1.02] disabled:opacity-50"
            >
              {loadingReport ? (
                <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
              ) : (
                <WandSparkles className="mr-2 inline h-5 w-5" />
              )}
              Generate AI Report
            </button>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-cyan-400/15 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
              >
                <Icon className="mb-4 h-8 w-8 text-cyan-300" />
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/60">
                  {item.title}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-cyan-50">
                  {item.value}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.text}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <Activity className="text-cyan-300" />
              <h3 className="text-2xl font-bold">Project Health</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Build Progress</span>
                  <span className="font-semibold text-cyan-100">
                    {completionPercent}%
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-cyan-300"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Live Tools</span>
                  <span className="font-semibold text-cyan-100">
                    {liveToolsCount}/{tools.length}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-300"
                    style={{
                      width: `${Math.round((liveToolsCount / tools.length) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                <p className="text-sm font-semibold text-emerald-100">
                  Status: Portfolio Ready
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  The app has enough features to present as a strong AI
                  portfolio project.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <Database className="text-cyan-300" />
              <h3 className="text-2xl font-bold">Saved Data</h3>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-cyan-400/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/60">
                  Saved Messages
                </p>
                <p className="mt-2 text-2xl font-bold text-cyan-50">
                  {savedChatCount}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-cyan-400/10 bg-black/30 p-4">
                  <p className="text-xs text-slate-400">Project Idea</p>
                  <p className="mt-1 font-semibold text-cyan-50">
                    {savedProjectIdea ? "Saved" : "Empty"}
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-400/10 bg-black/30 p-4">
                  <p className="text-xs text-slate-400">Analysis Result</p>
                  <p className="mt-1 font-semibold text-cyan-50">
                    {savedProjectAnalysis ? "Saved" : "Empty"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Last refresh: {lastRefresh || "Not refreshed yet"}
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={refreshSavedData}
                  className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
                >
                  <RefreshCcw className="mr-1 inline h-4 w-4" />
                  Refresh
                </button>

                <button
                  onClick={clearSavedChat}
                  className="rounded-xl border border-red-300/20 bg-red-400/10 px-3 py-2 text-xs font-semibold text-red-100 transition hover:bg-red-400/20"
                >
                  <Trash2 className="mr-1 inline h-4 w-4" />
                  Clear Chat
                </button>

                <button
                  onClick={clearAnalyzerData}
                  className="rounded-xl border border-red-300/20 bg-red-400/10 px-3 py-2 text-xs font-semibold text-red-100 transition hover:bg-red-400/20"
                >
                  Clear Analyzer
                </button>
              </div>

              <button
                onClick={clearAllSavedData}
                className="w-full rounded-2xl border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-400/20"
              >
                Clear All Saved Browser Data
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <ExternalLink className="text-cyan-300" />
              <h3 className="text-2xl font-bold">Quick Links</h3>
            </div>

            <div className="grid gap-3">
              <Link
                href="/"
                className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
              >
                <Globe2 className="mr-2 inline h-4 w-4" />
                Home App
              </Link>

              <Link
                href="/resume-reviewer"
                className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
              >
                <UserRound className="mr-2 inline h-4 w-4" />
                Resume Reviewer
              </Link>

              <a
                href="https://github.com/alibaloch18oct-a11y/shazee-ai-command-center"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
              >
                <Code2 className="mr-2 inline h-4 w-4" />
                GitHub Repo
              </a>

              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
              >
                <Server className="mr-2 inline h-4 w-4" />
                Vercel Dashboard
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <CheckCircle2 className="text-cyan-300" />
                <h3 className="text-2xl font-bold">Build Checklist</h3>
              </div>

              <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
                {checklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-cyan-400/10 bg-black/30 px-4 py-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <Zap className="text-cyan-300" />
                <h3 className="text-2xl font-bold">Next Roadmap</h3>
              </div>

              <div className="space-y-4">
                {roadmap.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-cyan-400/10 bg-black/30 p-5"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h4 className="font-bold text-cyan-50">{item.title}</h4>
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <BarChart3 className="text-cyan-300" />
                <h3 className="text-2xl font-bold">AI Tools Status</h3>
              </div>

              <div className="space-y-4">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded-3xl border border-cyan-400/10 bg-black/30 p-5"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                      <h4 className="font-bold text-cyan-50">{tool.name}</h4>
                      <div className="flex gap-2">
                        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                          {tool.status}
                        </span>
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                          {tool.health}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">
                      {tool.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Terminal className="text-cyan-300" />
                  <h3 className="text-2xl font-bold">AI Admin Report</h3>
                </div>

                <button
                  onClick={generateReport}
                  disabled={loadingReport}
                  className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/20 disabled:opacity-50"
                >
                  {loadingReport ? (
                    <Loader2 className="mr-1 inline h-4 w-4 animate-spin" />
                  ) : (
                    <WandSparkles className="mr-1 inline h-4 w-4" />
                  )}
                  Generate
                </button>
              </div>

              <div className="min-h-80 rounded-3xl border border-cyan-400/10 bg-slate-950/70 p-5">
                {loadingReport ? (
                  <div className="flex items-center gap-3 text-cyan-100">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Jarvis is generating admin report...
                  </div>
                ) : report ? (
                  <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                    {report}
                  </pre>
                ) : (
                  <div className="flex min-h-72 items-center justify-center rounded-2xl border border-dashed border-cyan-300/15 p-5 text-center text-sm leading-7 text-slate-500">
                    Click “Generate AI Report” to create a professional project
                    report for your portfolio.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="my-8 rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-white/5 p-6 backdrop-blur-xl">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-bold">Admin dashboard upgraded</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                This dashboard now feels more like a real product control panel:
                project health, local data monitor, tool status, checklist,
                roadmap, quick links, and AI reporting.
              </p>
            </div>

            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100">
              <Zap className="mr-2 inline h-5 w-5" />
              Upgrade Complete
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
