"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Code2,
  ExternalLink,
  Globe2,
  Layers3,
  Loader2,
  Mail,
  Mic,
  MicOff,
  MonitorSmartphone,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserRound,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import * as THREE from "three";

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
    title: "Voice Output",
    text: "Jarvis can speak AI replies aloud using browser speech synthesis.",
  },
  {
    icon: Mic,
    title: "Voice Input",
    text: "Users can speak commands directly through the mic button.",
  },
  {
    icon: MonitorSmartphone,
    title: "Cross Platform",
    text: "Works on laptop, mobile, tablet, and can be installed as a PWA.",
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
    text: "A futuristic AI portfolio assistant with real AI chat, voice input, voice output, animated 3D globe, and responsive web design.",
  },
  {
    title: "Jarvis Desktop Assistant",
    tech: "Python, AI API, Voice Features",
    text: "A local desktop AI assistant concept inspired by Jarvis, built with voice interaction and a futuristic interface.",
  },
  {
    title: "School Result Management App",
    tech: "AppSheet, Database, Automation",
    text: "A school management solution for student records, result calculations, grades, and admin workflows.",
  },
  {
    title: "AI Resume & Email Assistant",
    tech: "AI Prompting, Resume Writing, Automation",
    text: "A practical AI tool concept for generating professional job emails, cover letters, and resume improvements.",
  },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Welcome Shazee. I am your AI Command Center. Click the mic button, speak your command, and I will reply with voice.",
    },
  ]);

  const systemStatus = useMemo(
    () => [
      { label: "AI Core", value: "Online" },
      {
        label: "Voice",
        value: speaking ? "Speaking" : listening ? "Listening" : "Ready",
      },
      { label: "Portfolio", value: "Active" },
      { label: "Mode", value: "Live AI" },
    ],
    [speaking, listening]
  );

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

  function cleanTextForSpeech(text: string) {
    return text
      .replace(/```[\s\S]*?```/g, "Code block skipped.")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
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

    const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(text));

    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 0.85;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((voice) => voice.name.toLowerCase().includes("david")) ||
      voices.find((voice) => voice.name.toLowerCase().includes("mark")) ||
      voices.find((voice) => voice.name.toLowerCase().includes("male")) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ||
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

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setSpeaking(false);
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
        text: "Voice output enabled.",
      },
    ]);
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
              </div>

              <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
                Build. Present. Impress.
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
                  Your Jarvis, upgraded.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                A professional AI command center designed to showcase AI chat,
                voice input, voice output, 3D visuals, and modern web
                development skills in one live portfolio project.
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
            <AIGlobe active={speaking || loading || listening} />

            <div className="rounded-[2rem] border border-cyan-400/20 bg-black/40 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">AI Console</h3>
                  <p className="text-sm text-slate-400">
                    Real AI chat powered by Groq
                  </p>
                </div>
                <Terminal className="text-cyan-300" />
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
                Tip: Ask “Who built you?” or “What can this app do?”
              </p>
            </div>
          </motion.div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-cyan-400/20 bg-white/[0.04] p-6 backdrop-blur-xl lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <UserRound className="text-cyan-300" />
              <h3 className="text-2xl font-bold">About Shazee</h3>
            </div>
            <p className="text-sm leading-7 text-slate-300">
              Shazee is building modern AI-powered applications with futuristic
              interfaces, voice interaction, API integration, and responsive web
              design. This project demonstrates practical AI app development
              from frontend UI to backend AI connection and live deployment.
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
                This app is live, AI-connected, voice-enabled, and deployed as a
                portfolio-ready project.
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
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
