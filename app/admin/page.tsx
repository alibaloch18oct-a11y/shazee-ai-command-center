"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bot,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Eye,
  EyeOff,
  Code2,
  Globe2,
  KeyRound,
  Layers3,
  Loader2,
  Lock,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserRound,
  WandSparkles,
  Zap,
} from "lucide-react";

const ADMIN_PASSCODE = "shazee-admin";

const stats = [
  {
    title: "AI Core",
    value: "Online",
    icon: Bot,
    text: "Groq API connected through secure Next.js API route.",
  },
  {
    title: "Voice System",
    value: "Active",
    icon: Cpu,
    text: "Voice input and browser speech output enabled.",
  },
  {
    title: "Deployment",
    value: "Live",
    icon: Rocket,
    text: "Project deployed on Vercel with GitHub auto-deploy.",
  },
  {
    title: "Portfolio",
    value: "Ready",
    icon: Layers3,
    text: "About, skills, projects, resume reviewer, and analyzer added.",
  },
];

const checklist = [
  "Next.js project created",
  "Tailwind CSS configured",
  "Groq API connected",
  "AI chat working",
  "Voice input added",
  "Voice output added",
  "3D Jarvis globe added",
  "Portfolio sections added",
  "Chat memory added",
  "Project analyzer added",
  "Resume reviewer added",
  "Saved browser history added",
  "GitHub repository uploaded",
  "Vercel deployment completed",
];

const tools = [
  {
    name: "AI Console",
    status: "Live",
    details: "Main chat assistant with session memory and voice support.",
  },
  {
    name: "Project Analyzer",
    status: "Live",
    details: "Turns project ideas into portfolio-ready development plans.",
  },
  {
    name: "Resume Reviewer",
    status: "Live",
    details: "Reviews resumes for ATS, profile summary, skills, and improvements.",
  },
  {
    name: "Admin Dashboard",
    status: "Added",
    details: "Private-style dashboard for monitoring the portfolio app.",
  },
];

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState("");
  const [loadingReport, setLoadingReport] = useState(false);

  const completionPercent = useMemo(() => {
    return Math.round((checklist.length / checklist.length) * 100);
  }, []);

  function unlockDashboard() {
    if (passcode.trim() === ADMIN_PASSCODE) {
      setUnlocked(true);
      setError("");
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
Create a professional admin report for this portfolio project:

Project: Shazee AI Command Center
Creator: Shazee
Main features:
- AI chat
- Voice input
- Voice output
- 3D Jarvis globe
- Chat memory
- Saved browser history
- AI project analyzer
- AI resume reviewer
- Portfolio sections
- GitHub repo
- Vercel deployment
- Admin dashboard

Return in this format:

Project Status:
Strong Points:
Portfolio Value:
Technical Highlights:
Recommended Next Upgrades:
Short Pitch:
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
                  <h1 className="text-2xl font-bold">
                    Admin Dashboard Access
                  </h1>
                  <p className="text-sm text-cyan-100/70">
                    Shazee AI Command Center
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
              <div className="mb-4 flex items-center gap-3">
                <KeyRound className="text-cyan-300" />
                <div>
                  <h2 className="text-xl font-bold">Enter Admin Passcode</h2>
                  <p className="text-sm text-slate-400">
                    Demo passcode for this portfolio dashboard:
                    <span className="ml-1 font-semibold text-cyan-200">
                      shazee-admin
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
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
                  >
                    {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button
                  onClick={unlockDashboard}
                  className="h-12 rounded-2xl bg-cyan-300 px-5 font-semibold text-slate-950 shadow-lg shadow-cyan-400/25 transition hover:scale-[1.02]"
                >
                  Unlock
                </button>
              </div>

              {error && (
                <p className="mt-3 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500">
              Note: This is a portfolio demo lock. For real production security,
              use authentication such as Clerk, NextAuth, Firebase Auth, or
              Supabase Auth.
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
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-cyan-400/20 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">
                Admin Dashboard
              </h1>
              <p className="text-xs text-cyan-100/70">
                Shazee AI Command Center control panel
              </p>
            </div>
          </div>

          <div className="flex gap-3">
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
              {completionPercent}% Complete
            </span>

            <span className="rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-sm text-blue-100">
              Portfolio Ready
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
                Monitor features, deployment status, technical highlights, and
                generate a professional AI report for the Shazee AI Command
                Center portfolio project.
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

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <CheckCircle2 className="text-cyan-300" />
                <h3 className="text-2xl font-bold">Build Checklist</h3>
              </div>

              <div className="space-y-3">
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
                <ExternalLink className="text-cyan-300" />
                <h3 className="text-2xl font-bold">Quick Links</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
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
                  Vercel
                </a>
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
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h4 className="font-bold text-cyan-50">{tool.name}</h4>
                      <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                        {tool.status}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">
                      {tool.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <Terminal className="text-cyan-300" />
                <h3 className="text-2xl font-bold">AI Project Report</h3>
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
              <h3 className="text-2xl font-bold">Admin dashboard added</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                This gives your app a more complete product feel with private
                controls, tool status, checklist, and AI reporting.
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
