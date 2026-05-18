"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Brain,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Layers3,
  Lightbulb,
  Loader2,
  Mail,
  Mic,
  MicOff,
  MonitorSmartphone,
  Rocket,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserRound,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import Link from "next/link";
import * as THREE from "three";
import jsPDF from "jspdf";
import { trackAnalytics } from "@/lib/analytics";

type Message = {
  role: "user" | "ai";
  text: string;
};

type SpeechRecognitionEventType = Event & {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
};

type SpeechRecognitionErrorEventType = Event & {
  error: string;
};

type SpeechRecognitionType = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventType) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventType) => void) | null;
  onend: (() => void) | null;
};

type WindowWithSpeech = Window & {
  SpeechRecognition?: new () => SpeechRecognitionType;
  webkitSpeechRecognition?: new () => SpeechRecognitionType;
};

const CHAT_STORAGE_KEY = "shazee-ai-chat-history";
const PROJECT_IDEA_STORAGE_KEY = "shazee-ai-project-idea";
const PROJECT_ANALYSIS_STORAGE_KEY = "shazee-ai-project-analysis";

const initialMessages: Message[] = [
  {
    role: "ai",
    text: "Welcome Shazee. I am your AI Command Center. I can remember this chat session, answer with voice, and help showcase your portfolio.",
  },
];

function JarvisCore({ speaking }: { speaking: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.35;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;

      const pulse = speaking
        ? 1 + Math.sin(t * 10) * 0.11
        : 1 + Math.sin(t * 2) * 0.03;

      meshRef.current.scale.setScalar(pulse);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.7;
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }

    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.z = -t * 0.55;
      ringTwoRef.current.rotation.y = Math.sin(t * 0.25) * 0.25;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          emissive="#0891b2"
          emissiveIntensity={speaking ? 2.4 : 0.8}
        />
      </mesh>

      <mesh ref={ringRef}>
        <torusGeometry args={[1.7, 0.015, 16, 128]} />
        <meshStandardMaterial
          color="#67e8f9"
          emissive="#06b6d4"
          emissiveIntensity={2}
        />
      </mesh>

      <mesh ref={ringTwoRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.01, 16, 128]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={speaking ? 2.5 : 1.5}
        />
      </mesh>

      <pointLight
        position={[3, 4, 3]}
        intensity={speaking ? 55 : 40}
        color="#38bdf8"
      />
      <pointLight
        position={[-3, -2, -2]}
        intensity={speaking ? 35 : 20}
        color="#0ea5e9"
      />
    </group>
  );
}

function AIGlobe({ active }: { active: boolean }) {
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-black/50 shadow-2xl shadow-cyan-500/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.25),transparent_55%)]" />

      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <Stars radius={70} depth={40} count={1800} factor={4} fade speed={1} />
        <JarvisCore speaking={active} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>

      <motion.div
        className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.95)]"
        animate={{
          scaleX: active ? [0.8, 1.12, 0.8] : [0.95, 1, 0.95],
          opacity: active ? [0.5, 1, 0.5] : [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: active ? 0.35 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-cyan-300/20 bg-black/60 p-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div
            className={`h-3 w-3 rounded-full ${
              active ? "animate-pulse bg-emerald-400" : "bg-cyan-400"
            }`}
          />
          <p className="text-sm text-cyan-100">
            {active
              ? "Jarvis voice module active..."
              : "System online — waiting for command"}
          </p>
        </div>
      </div>
    </div>
  );
}

const featureCards = [
  {
    icon: Brain,
    title: "AI Brain",
    text: "Connected with real AI through a secure Next.js server route using Groq API.",
  },
  {
    icon: Volume2,
    title: "Jarvis Voice",
    text: "Smoother human-like voice output using the best available browser voice.",
  },
  {
    icon: Save,
    title: "Saved Chat",
    text: "Chat history and project analysis are saved in the browser after refresh.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    text: "Tracks visits, chat messages, project analyses, resume reviews, reports, and PDF downloads.",
  },
];

const skills = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "TypeScript",
  "Groq API",
  "AI Chat Integration",
  "Voice Input",
  "Voice Output",
  "Saved Chat",
  "Analytics",
  "PDF Export",
  "Three.js",
  "React Three Fiber",
  "Framer Motion",
  "Responsive UI",
  "PWA Setup",
  "GitHub",
  "Vercel Deployment",
];

const projects = [
  {
    title: "Shazee AI Command Center",
    tech: "Next.js, Groq API, Tailwind, Three.js",
    text: "A futuristic AI portfolio assistant with real AI chat, voice input, smoother voice output, animated 3D globe, saved chat history, analytics, project analyzer, and responsive web design.",
  },
  {
    title: "AI Resume Reviewer",
    tech: "Next.js, Groq API, Career AI Tool",
    text: "A separate AI-powered resume reviewer that scores resumes, suggests ATS keywords, improves profile summaries, and exports PDF reports.",
  },
  {
    title: "Admin Dashboard",
    tech: "Next.js, AI Report Generator, Portfolio Controls",
    text: "A private-style admin area with project status cards, build checklist, quick links, analytics, and AI-generated project report.",
  },
  {
    title: "Analytics Dashboard",
    tech: "LocalStorage, Next.js, UI Tracking",
    text: "Tracks user activity such as visits, chat usage, PDF downloads, resume reviews, project analyses, and admin reports.",
  },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [projectIdea, setProjectIdea] = useState("");
  const [projectAnalysis, setProjectAnalysis] = useState("");
  const [analyzerLoading, setAnalyzerLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loadedSavedData, setLoadedSavedData] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const systemStatus = useMemo(
    () => [
      { label: "AI Core", value: "Online" },
      {
        label: "Voice",
        value: speaking ? "Speaking" : listening ? "Listening" : "Ready",
      },
      { label: "Analytics", value: "Active" },
      { label: "Admin", value: "Added" },
    ],
    [speaking, listening]
  );

  useEffect(() => {
    trackAnalytics("visits");
  }, []);

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      const savedIdea = localStorage.getItem(PROJECT_IDEA_STORAGE_KEY);
      const savedAnalysis = localStorage.getItem(PROJECT_ANALYSIS_STORAGE_KEY);

      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages) as Message[];

        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      }

      if (savedIdea) setProjectIdea(savedIdea);
      if (savedAnalysis) setProjectAnalysis(savedAnalysis);
    } catch {
      setMessages(initialMessages);
    } finally {
      setLoadedSavedData(true);
    }
  }, []);

  useEffect(() => {
    if (!loadedSavedData) return;
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages, loadedSavedData]);

  useEffect(() => {
    if (!loadedSavedData) return;
    localStorage.setItem(PROJECT_IDEA_STORAGE_KEY, projectIdea);
  }, [projectIdea, loadedSavedData]);

  useEffect(() => {
    if (!loadedSavedData) return;
    localStorage.setItem(PROJECT_ANALYSIS_STORAGE_KEY, projectAnalysis);
  }, [projectAnalysis, loadedSavedData]);

  useEffect(() => {
    const browserWindow = window as WindowWithSpeech;
    const SpeechRecognitionClass =
      browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setVoiceSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEventType) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      setSpeaking(true);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEventType) => {
      setListening(false);
      setSpeaking(false);

      setMessages((old) => [
        ...old,
        {
          role: "ai",
          text: `Voice error: ${event.error}. Try again or type your command.`,
        },
      ]);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, listening]);

  function cleanTextForSpeech(text: string) {
    return text
      .replace(/```[\s\S]*?```/g, "Code block skipped.")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/\n+/g, ". ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function speakText(text: string) {
  if (!speechEnabled) return;
  if (typeof window === "undefined") return;

  if (!("speechSynthesis" in window)) {
    setMessages((old) => [
      ...old,
      {
        role: "ai",
        text: "Speech output is not supported in this browser.",
      },
    ]);
    return;
  }

  window.speechSynthesis.cancel();

  const cleanedText = cleanTextForSpeech(text);
  const utterance = new SpeechSynthesisUtterance(cleanedText);

  // Jarvis-style: smooth British/English assistant voice
  utterance.lang = "en-GB";
  utterance.rate = 0.9;
  utterance.pitch = 0.88;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();

  const preferredVoice =
    voices.find((voice) =>
      voice.name.toLowerCase().includes("microsoft george")
    ) ||
    voices.find((voice) =>
      voice.name.toLowerCase().includes("microsoft ryan")
    ) ||
    voices.find((voice) =>
      voice.name.toLowerCase().includes("google uk english male")
    ) ||
    voices.find(
      (voice) =>
        voice.lang.toLowerCase().startsWith("en-gb") &&
        voice.name.toLowerCase().includes("male")
    ) ||
    voices.find((voice) =>
      voice.name.toLowerCase().includes("daniel")
    ) ||
    voices.find((voice) =>
      voice.name.toLowerCase().includes("arthur")
    ) ||
    voices.find((voice) =>
      voice.name.toLowerCase().includes("guy")
    ) ||
    voices.find((voice) =>
      voice.name.toLowerCase().includes("david")
    ) ||
    voices.find((voice) =>
      voice.lang.toLowerCase().startsWith("en-gb")
    ) ||
    voices.find((voice) =>
      voice.lang.toLowerCase().startsWith("en-us")
    ) ||
    voices.find((voice) =>
      voice.lang.toLowerCase().startsWith("en")
    ) ||
    voices[0];

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onstart = () => {
    setSpeaking(true);
  };

  utterance.onend = () => {
    setSpeaking(false);
  };

  utterance.onerror = () => {
    setSpeaking(false);
  };

  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 120);
}

  function stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setSpeaking(false);
  }

  function clearChat() {
    stopSpeaking();
    setInput("");

    const clearMessage: Message[] = [
      {
        role: "ai",
        text: "Chat cleared. Jarvis is ready for a new command.",
      },
    ];

    setMessages(clearMessage);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(clearMessage));
  }

  function clearSavedTools() {
    setProjectIdea("");
    setProjectAnalysis("");
    localStorage.removeItem(PROJECT_IDEA_STORAGE_KEY);
    localStorage.removeItem(PROJECT_ANALYSIS_STORAGE_KEY);
  }

  function toggleSpeechOutput() {
    if (speechEnabled) {
      stopSpeaking();
      setSpeechEnabled(false);
      setMessages((old) => [
        ...old,
        {
          role: "ai",
          text: "Voice output disabled.",
        },
      ]);
      return;
    }

    setSpeechEnabled(true);
    setMessages((old) => [
      ...old,
      {
        role: "ai",
        text: "Voice output enabled. Jarvis voice mode is now active.",
      },
    ]);

    setTimeout(() => {
      speakText("Voice output enabled. Jarvis voice mode is now active.");
    }, 100);
  }

  function toggleListening() {
    if (!voiceSupported) {
      setMessages((old) => [
        ...old,
        {
          role: "ai",
          text: "Voice input is not supported in this browser. Try Google Chrome or Microsoft Edge.",
        },
      ]);
      return;
    }

    const recognition = recognitionRef.current;

    if (!recognition) {
      setMessages((old) => [
        ...old,
        {
          role: "ai",
          text: "Voice engine is not ready. Refresh the page and try again.",
        },
      ]);
      return;
    }

    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }

    try {
      stopSpeaking();
      recognition.start();
      setListening(true);
      setSpeaking(true);
    } catch {
      setListening(false);
      setMessages((old) => [
        ...old,
        {
          role: "ai",
          text: "Mic is already active. Please wait a second and try again.",
        },
      ]);
    }
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const currentHistory = messages;

    trackAnalytics("chatMessages");
    stopSpeaking();

    setMessages((old) => [...old, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);
    setSpeaking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: currentHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "AI request failed.");
      }

      const reply = data.reply || "I could not generate a response.";

      setMessages((old) => [
        ...old,
        {
          role: "ai",
          text: reply,
        },
      ]);

      speakText(reply);
    } catch (error) {
      const errorText =
        error instanceof Error
          ? `Error: ${error.message}`
          : "Error: Something went wrong.";

      setMessages((old) => [
        ...old,
        {
          role: "ai",
          text: errorText,
        },
      ]);

      speakText(errorText);
    } finally {
      setLoading(false);
    }
  }

  async function analyzeProject() {
    if (!projectIdea.trim() || analyzerLoading) return;

    const idea = projectIdea.trim();

    trackAnalytics("projectAnalyses");
    setAnalyzerLoading(true);
    setProjectAnalysis("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `
Analyze this portfolio app idea professionally:

Project idea:
${idea}

Return the answer in this exact format:

Difficulty:
Best Tech Stack:
Core Features:
Portfolio Value:
AI Features:
UI/UX Ideas:
Deployment Plan:
Upgrade Suggestions:

Keep it clear, practical, and impressive for a developer portfolio.
          `,
          history: [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Project analysis failed.");
      }

      const result = data.reply || "No analysis generated.";
      setProjectAnalysis(result);
      speakText("Project analysis completed.");
    } catch (error) {
      const errorText =
        error instanceof Error
          ? `Error: ${error.message}`
          : "Error: Something went wrong.";
      setProjectAnalysis(errorText);
    } finally {
      setAnalyzerLoading(false);
    }
  }

  function downloadProjectPdf() {
    if (!projectAnalysis.trim()) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 44;
    const maxWidth = pageWidth - margin * 2;

    let y = 54;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("AI Project Analysis Report", margin, y);

    y += 24;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Generated by Shazee AI Command Center", margin, y);

    y += 28;

    doc.setDrawColor(34, 211, 238);
    doc.line(margin, y, pageWidth - margin, y);

    y += 28;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Project Idea", margin, y);

    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const ideaLines = doc.splitTextToSize(projectIdea, maxWidth);

    ideaLines.forEach((line: string) => {
      if (y > pageHeight - 60) {
        doc.addPage();
        y = 54;
      }

      doc.text(line, margin, y);
      y += 16;
    });

    y += 24;

    if (y > pageHeight - 80) {
      doc.addPage();
      y = 54;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("AI Analysis", margin, y);

    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const analysisLines = doc.splitTextToSize(projectAnalysis, maxWidth);

    analysisLines.forEach((line: string) => {
      if (y > pageHeight - 60) {
        doc.addPage();
        y = 54;
      }

      doc.text(line, margin, y);
      y += 16;
    });

    y += 20;

    if (y > pageHeight - 80) {
      doc.addPage();
      y = 54;
    }

    doc.setDrawColor(34, 211, 238);
    doc.line(margin, y, pageWidth - margin, y);

    y += 22;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Contact", margin, y);

    y += 16;

    doc.setFont("helvetica", "normal");
    doc.text("Email: alibaloch18oct@gmail.com", margin, y);

    trackAnalytics("pdfDownloads");
    doc.save("shazee-ai-project-analysis.pdf");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#020617] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 lg:px-8">
        <nav className="mb-8 flex items-center justify-between rounded-3xl border border-cyan-400/20 bg-white/5 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">
                Shazee AI Command Center
              </h1>
              <p className="text-xs text-cyan-100/70">
                Jarvis inspired portfolio system
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live AI
          </div>
        </nav>

        <div className="grid flex-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
                  <Sparkles className="mr-2 inline h-4 w-4" />
                  Futuristic AI Portfolio App
                </span>

                <span className="rounded-full border border-blue-300/20 bg-blue-300/10 px-4 py-2 text-sm text-blue-100">
                  Web + Mobile Ready
                </span>

                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100">
                  Analytics Connected
                </span>
              </div>

              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Build. Present. Impress.
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                  Your Jarvis, upgraded.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                A professional AI command center designed to showcase AI chat,
                voice input, smoother voice output, saved history, project
                analysis, analytics, admin controls, PDF export, 3D visuals, and
                modern web development skills.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    speakText("Jarvis online. All systems are ready, Shazee.")
                  }
                  className="rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/25 transition hover:scale-[1.02]"
                >
                  <Rocket className="mr-2 inline h-5 w-5" />
                  Activate Demo
                </button>

                <Link
                  href="/resume-reviewer"
                  className="rounded-2xl border border-cyan-300/25 bg-white/5 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-white/10"
                >
                  <FileText className="mr-2 inline h-5 w-5" />
                  Resume Reviewer
                </Link>

                <Link
                  href="/admin"
                  className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-5 py-3 font-semibold text-emerald-100 transition hover:bg-emerald-300/20"
                >
                  <ShieldCheck className="mr-2 inline h-5 w-5" />
                  Admin Dashboard
                </Link>

                <Link
                  href="/analytics"
                  className="rounded-2xl border border-blue-300/25 bg-blue-300/10 px-5 py-3 font-semibold text-blue-100 transition hover:bg-blue-300/20"
                >
                  <BarChart3 className="mr-2 inline h-5 w-5" />
                  Analytics
                </Link>

                <a
                  href="mailto:alibaloch18oct@gmail.com"
                  className="rounded-2xl border border-cyan-300/25 bg-white/5 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-white/10"
                >
                  <Mail className="mr-2 inline h-5 w-5" />
                  Contact Me
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              {systemStatus.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-cyan-400/15 bg-black/30 p-4 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/60">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-bold text-cyan-50">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {featureCards.map((tool) => {
                const Icon = tool.icon;

                return (
                  <div
                    key={tool.title}
                    className="rounded-3xl border border-cyan-400/15 bg-white/[0.04] p-5 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
                  >
                    <Icon className="mb-4 h-8 w-8 text-cyan-300" />
                    <h3 className="text-lg font-bold">{tool.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {tool.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-6"
          >
            <AIGlobe
              active={speaking || loading || listening || analyzerLoading}
            />

            <div className="rounded-[2rem] border border-cyan-400/20 bg-black/40 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold">AI Console</h3>
                  <p className="text-sm text-slate-400">
                    Real AI chat powered by Groq
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Terminal className="hidden text-cyan-300 sm:block" />
                  <button
                    onClick={clearChat}
                    className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="mb-4 h-64 space-y-3 overflow-y-auto rounded-2xl border border-cyan-400/10 bg-slate-950/70 p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "ml-auto bg-cyan-300 text-slate-950"
                        : "bg-white/10 text-cyan-50"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}

                {loading && (
                  <div className="flex max-w-[88%] items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm text-cyan-50">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Jarvis is thinking...
                  </div>
                )}

                {listening && (
                  <div className="flex max-w-[88%] items-center gap-2 rounded-2xl bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
                    <Mic className="h-4 w-4 animate-pulse" />
                    Listening... speak now
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={toggleListening}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-cyan-200 transition ${
                    listening
                      ? "border-red-300/30 bg-red-400/15 text-red-200"
                      : "border-cyan-300/20 bg-cyan-300/10"
                  }`}
                  title="Voice input"
                >
                  {listening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <button
                  onClick={toggleSpeechOutput}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition ${
                    speechEnabled
                      ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-200"
                      : "border-slate-400/20 bg-slate-400/10 text-slate-300"
                  }`}
                  title="Toggle voice output"
                >
                  {speechEnabled ? (
                    <Volume2 size={20} />
                  ) : (
                    <VolumeX size={20} />
                  )}
                </button>

                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") sendMessage();
                  }}
                  placeholder={
                    listening ? "Listening..." : "Type or speak command..."
                  }
                  className="min-w-0 flex-1 rounded-2xl border border-cyan-300/15 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
                />

                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Chat messages are counted in Analytics.
              </p>
            </div>
          </motion.div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-3">
            <Lightbulb className="text-cyan-300" />
            <div>
              <h3 className="text-2xl font-bold">AI Project Analyzer</h3>
              <p className="mt-1 text-sm text-slate-400">
                Paste any app idea and Jarvis will turn it into a professional
                portfolio plan. Your analysis is saved after refresh.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <textarea
                value={projectIdea}
                onChange={(event) => setProjectIdea(event.target.value)}
                placeholder="Example: I want to build an AI school management app with student records, result generation, parent messages, and dashboard charts."
                className="min-h-48 w-full resize-none rounded-3xl border border-cyan-300/15 bg-black/35 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/50"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={analyzeProject}
                  disabled={analyzerLoading}
                  className="rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/25 transition hover:scale-[1.02] disabled:opacity-50"
                >
                  {analyzerLoading ? (
                    <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
                  ) : (
                    <Zap className="mr-2 inline h-5 w-5" />
                  )}
                  Analyze Project
                </button>

                <button
                  onClick={clearSavedTools}
                  className="rounded-2xl border border-cyan-300/25 bg-white/5 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-white/10"
                >
                  Reset
                </button>

                <button
                  onClick={downloadProjectPdf}
                  disabled={!projectAnalysis.trim()}
                  className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-5 py-3 font-semibold text-emerald-100 transition hover:bg-emerald-300/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Download className="mr-2 inline h-5 w-5" />
                  Download PDF
                </button>
              </div>
            </div>

            <div className="min-h-48 rounded-3xl border border-cyan-400/15 bg-black/35 p-5">
              {analyzerLoading ? (
                <div className="flex items-center gap-3 text-cyan-100">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Jarvis is analyzing your project idea...
                </div>
              ) : projectAnalysis ? (
                <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {projectAnalysis}
                </pre>
              ) : (
                <div className="flex h-full min-h-40 items-center justify-center rounded-2xl border border-dashed border-cyan-300/15 p-5 text-center text-sm leading-7 text-slate-500">
                  Your AI project analysis will appear here.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <UserRound className="text-cyan-300" />
              <h3 className="text-2xl font-bold">About Shazee</h3>
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Shazee is building modern AI-powered applications with futuristic
              interfaces, voice interaction, API integration, analytics, PDF
              export, and responsive web design.
            </p>
          </div>

          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <Layers3 className="text-cyan-300" />
              <h3 className="text-2xl font-bold">Skills</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Globe2 className="text-cyan-300" />
              <h3 className="text-2xl font-bold">Featured Projects</h3>
            </div>
            <span className="hidden rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 md:inline">
              Portfolio Showcase
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.title}
                className="rounded-3xl border border-cyan-400/15 bg-black/30 p-5 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
              >
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-bold text-cyan-50">
                      {project.title}
                    </h4>
                    <p className="mt-1 text-xs text-cyan-200/60">
                      {project.tech}
                    </p>
                  </div>
                  <Zap className="h-5 w-5 shrink-0 text-cyan-300" />
                </div>
                <p className="text-sm leading-7 text-slate-300">
                  {project.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-8 rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-white/5 p-6 backdrop-blur-xl">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-bold">Want to contact Shazee?</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                This app is live, AI-connected, voice-enabled, saved-history
                upgraded, analytics-powered, admin-dashboard powered, and
                deployed as a portfolio-ready project.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:alibaloch18oct@gmail.com"
                className="rounded-2xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/25 transition hover:scale-[1.02]"
              >
                <Mail className="mr-2 inline h-5 w-5" />
                Email
              </a>

              <a
                href="https://github.com/alibaloch18oct-a11y/shazee-ai-command-center"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cyan-300/25 bg-white/5 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-white/10"
              >
                <ExternalLink className="mr-2 inline h-5 w-5" />
                GitHub
              </a>

              <Link
                href="/analytics"
                className="rounded-2xl border border-blue-300/25 bg-blue-300/10 px-5 py-3 font-semibold text-blue-100 transition hover:bg-blue-300/20"
              >
                <BarChart3 className="mr-2 inline h-5 w-5" />
                Analytics
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
