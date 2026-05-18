"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Bot,
  MessageSquare,
  FileText,
  Lightbulb,
  ShieldCheck,
  Download,
  RefreshCcw,
  Trash2,
  TrendingUp,
} from "lucide-react";
import {
  AnalyticsData,
  defaultAnalytics,
  getAnalytics,
  resetAnalytics,
} from "@/lib/analytics";

const cards = [
  {
    key: "visits",
    label: "Page Visits",
    icon: TrendingUp,
  },
  {
    key: "chatMessages",
    label: "Chat Messages",
    icon: MessageSquare,
  },
  {
    key: "projectAnalyses",
    label: "Project Analyses",
    icon: Lightbulb,
  },
  {
    key: "resumeReviews",
    label: "Resume Reviews",
    icon: FileText,
  },
  {
    key: "adminReports",
    label: "Admin Reports",
    icon: ShieldCheck,
  },
  {
    key: "pdfDownloads",
    label: "PDF Downloads",
    icon: Download,
  },
] as const;

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(defaultAnalytics);

  function refresh() {
    setAnalytics(getAnalytics());
  }

  function clear() {
    resetAnalytics();
    refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  const total =
    analytics.visits +
    analytics.chatMessages +
    analytics.projectAnalyses +
    analytics.resumeReviews +
    analytics.adminReports +
    analytics.pdfDownloads;

  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <section className="relative mx-auto min-h-screen w-full max-w-7xl px-5 py-6 lg:px-8">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-cyan-400/20 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
              <BarChart3 size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">
                Analytics Dashboard
              </h1>
              <p className="text-xs text-cyan-100/70">
                Shazee AI Command Center usage tracker
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
        </nav>

        <section className="mb-8 rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              <Bot className="mr-2 inline h-4 w-4" />
              Local Analytics
            </span>

            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
              Total Events: {total}
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                App Usage
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                  Analytics.
                </span>
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                Track visits, AI messages, resume reviews, project analysis,
                admin reports, and PDF downloads. This version stores analytics
                in browser localStorage; later we will move it to Supabase.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={refresh}
                className="rounded-2xl border border-cyan-300/25 bg-white/5 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-white/10"
              >
                <RefreshCcw className="mr-2 inline h-5 w-5" />
                Refresh
              </button>

              <button
                onClick={clear}
                className="rounded-2xl border border-red-300/20 bg-red-400/10 px-5 py-3 font-semibold text-red-100 transition hover:bg-red-400/20"
              >
                <Trash2 className="mr-2 inline h-5 w-5" />
                Reset
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            const value = analytics[card.key];

            return (
              <div
                key={card.key}
                className="rounded-3xl border border-cyan-400/15 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
              >
                <Icon className="mb-4 h-8 w-8 text-cyan-300" />
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/60">
                  {card.label}
                </p>
                <h3 className="mt-3 text-4xl font-black text-cyan-50">
                  {value}
                </h3>
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
}
