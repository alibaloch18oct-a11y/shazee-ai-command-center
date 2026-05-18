"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Bot,
  ClipboardCheck,
  FileText,
  Loader2,
  Mail,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function ResumeReviewerPage() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function reviewResume() {
    if (!resumeText.trim() || loading) return;

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `
You are an expert AI resume reviewer.

Review this resume text professionally:

${resumeText}

Return the review in this exact format:

Overall Score:
Strong Points:
Weak Points:
Improved Profile Summary:
Skills to Add:
ATS Keywords:
Experience Improvements:
Final Advice:

Rules:
- Be practical and professional.
- Keep it useful for job applications.
- Focus on ATS, clarity, impact, and portfolio strength.
- Do not be too long.
          `,
          history: [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Resume review failed.");
      }

      setResult(data.reply || "No review generated.");
    } catch (error) {
      setResult(
        error instanceof Error
          ? `Error: ${error.message}`
          : "Error: Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setResumeText("");
    setResult("");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <section className="relative mx-auto min-h-screen w-full max-w-6xl px-5 py-6 lg:px-8">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-cyan-400/20 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">
                AI Resume Reviewer
              </h1>
              <p className="text-xs text-cyan-100/70">
                Shazee AI Command Center tool
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-cyan-300/25 bg-white/5 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 inline h-4 w-4" />
            Back Home
          </Link>
        </nav>

        <div className="mb-8 rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="mr-2 inline h-4 w-4" />
              AI Career Tool
            </span>

            <span className="rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-sm text-blue-100">
              ATS + Skills Review
            </span>
          </div>

          <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Review your resume
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
              with AI.
            </span>
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            Paste your resume text below and Jarvis will analyze it for profile
            summary, weak points, ATS keywords, missing skills, and improvement
            advice.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-cyan-400/20 bg-black/40 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <FileText className="text-cyan-300" />
              <div>
                <h3 className="text-xl font-bold">Paste Resume Text</h3>
                <p className="text-sm text-slate-400">
                  Copy your resume content and paste it here.
                </p>
              </div>
            </div>

            <textarea
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              placeholder="Paste your resume text here..."
              className="min-h-[420px] w-full resize-none rounded-3xl border border-cyan-300/15 bg-slate-950/70 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={reviewResume}
                disabled={loading}
                className="rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/25 transition hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
                ) : (
                  <ClipboardCheck className="mr-2 inline h-5 w-5" />
                )}
                Review Resume
              </button>

              <button
                onClick={clearAll}
                className="rounded-2xl border border-cyan-300/25 bg-white/5 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-white/10"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-black/40 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <Zap className="text-cyan-300" />
              <div>
                <h3 className="text-xl font-bold">AI Review Result</h3>
                <p className="text-sm text-slate-400">
                  Your professional resume feedback appears here.
                </p>
              </div>
            </div>

            <div className="min-h-[420px] rounded-3xl border border-cyan-400/10 bg-slate-950/70 p-5">
              {loading ? (
                <div className="flex items-center gap-3 text-cyan-100">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Jarvis is reviewing your resume...
                </div>
              ) : result ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {result}
                </pre>
              ) : (
                <div className="flex h-full min-h-[360px] items-center justify-center rounded-2xl border border-dashed border-cyan-300/15 p-5 text-center text-sm leading-7 text-slate-500">
                  Paste resume text and click “Review Resume”.
                </div>
              )}
            </div>

            <div className="mt-4 rounded-3xl border border-cyan-400/15 bg-white/[0.04] p-4">
              <p className="text-sm leading-7 text-slate-300">
                Tip: For best result, paste your full resume including profile
                summary, experience, education, and skills.
              </p>
            </div>
          </div>
        </div>

        <section className="my-8 rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-white/5 p-6 backdrop-blur-xl">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-bold">Need help improving it?</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                You can use the AI review to improve your resume summary,
                skills, experience bullets, and job application emails.
              </p>
            </div>

            <a
              href="mailto:alibaloch18oct@gmail.com"
              className="rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/25 transition hover:scale-[1.02]"
            >
              <Mail className="mr-2 inline h-5 w-5" />
              Contact Shazee
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
