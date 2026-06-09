import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, Target, Zap, Lock, Code, Globe, Server, Layers, Award, 
  Send, ExternalLink, Github, Linkedin, Instagram, Mail, X, 
  ArrowUpRight, Heart, Code2, Compass, AlertCircle, Copy, Check 
} from "lucide-react";
import { ProfileConfig, ContactMessage, Project, Certification } from "./types";
import Terminal from "./components/Terminal";
import TriviaQuiz from "./components/TriviaQuiz";
import AdminPanel from "./components/AdminPanel";
import CertificateViewerModal from "./components/CertificateViewerModal";

// Helper dictionaries for assigning emojis and themes to skills dynamically if missing
export const DEFAULT_SKILL_EMOJIS: Record<string, string> = {
  "Network Security": "🛡️",
  "Cybersecurity Concepts": "🔒",
  "Ethical Hacking Fundamentals": "🔓",
  "Digital Forensics Basics": "🕵️‍♂️",
  "Python": "🐍",
  "Java": "☕",
  "C": "💿",
  "JavaScript": "💛",
  "HTML & CSS": "🎨",
  "Machine Learning": "🤖",
  "Deep Learning": "🧠",
  "Data Analysis": "📊",
  "MySQL": "🐬",
  "MongoDB": "🍃",
  "Git & GitHub": "🐙",
  "Linux": "🐧",
  "Windows": "🪟",
};

export const DEFAULT_SKILL_THEMES: Record<string, string> = {
  "Network Security": "red",
  "Cybersecurity Concepts": "pink",
  "Ethical Hacking Fundamentals": "orange",
  "Digital Forensics Basics": "rose",
  "Python": "blue",
  "Java": "orange",
  "C": "slate",
  "JavaScript": "yellow",
  "HTML & CSS": "emerald",
  "Machine Learning": "purple",
  "Deep Learning": "cyan",
  "Data Analysis": "teal",
  "MySQL": "sky",
  "MongoDB": "green",
  "Git & GitHub": "rose",
  "Linux": "indigo",
  "Windows": "blue",
};

export const THEME_COLORS: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  rose: { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", dot: "bg-rose-500" },
  pink: { text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", dot: "bg-pink-500" },
  red: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", dot: "bg-red-500" },
  orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", dot: "bg-orange-500" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", dot: "bg-amber-500" },
  yellow: { text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", dot: "bg-yellow-500" },
  green: { text: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20", dot: "bg-green-500" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", dot: "bg-emerald-500" },
  teal: { text: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20", dot: "bg-teal-500" },
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", dot: "bg-cyan-450" },
  sky: { text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", dot: "bg-sky-450" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", dot: "bg-blue-500" },
  indigo: { text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", dot: "bg-indigo-500" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", dot: "bg-purple-500" },
  violet: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", dot: "bg-violet-500" },
  slate: { text: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20", dot: "bg-slate-400" },
};

export const getThemeColors = (themeName?: string) => {
  return THEME_COLORS[themeName || "cyan"] || THEME_COLORS.cyan;
};

// Initial candidate profile configuration matching original schema requirements
const INITIAL_CONFIG: ProfileConfig = {
  student_name: "Sanath Shetty",
  title: "Cybersecurity Enthusiast & Aspiring Software Developer",
  hero_subtitle: "Building Secure, Intelligent, and Innovative Digital Solutions.",
  about_text: "I am an MCA student with a strong interest in Cybersecurity, Software Development, Artificial Intelligence, and Data Science.\n\nMy academic journey began with a Bachelor of Computer Applications (BCA), where I developed a foundation in programming, databases, and web technologies. Currently, I am pursuing a Master of Computer Applications (MCA) to further strengthen my technical expertise and practical problem-solving abilities.\n\nI enjoy learning emerging technologies, working on technical projects, and continuously expanding my knowledge through certifications and hands-on experiences.\n\nCareer Goal: To build innovative software solutions, strengthen cybersecurity practices, and contribute to technology-driven organizations while continuously learning and growing as a technology professional.",
  contact_email: "sanathshetty900@gmail.com",
  github: "sanathshetty",
  linkedin: "https://www.linkedin.com/in/sanath-shetty09?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagram: "https://www.instagram.com/sage_ofshadows?igsh=MXhyOTYxN3N5YXJ1bA==",
  avatar_emoji: "👨‍💻",
  academic_year: "MCA'26",
  profile_image_url: "/profile.jpg",
  accentColor: "cyan",
  themeMode: "cyber",
  
  skills: [
    { name: "Network Security", level: 85, category: "cybersecurity", emoji: "🛡️", theme: "red" },
    { name: "Cybersecurity Concepts", level: 82, category: "cybersecurity", emoji: "🔒", theme: "pink" },
    { name: "Ethical Hacking Fundamentals", level: 78, category: "cybersecurity", emoji: "🔓", theme: "orange" },
    { name: "Digital Forensics Basics", level: 70, category: "cybersecurity", emoji: "🕵️‍♂️", theme: "rose" },
    { name: "Python", level: 80, category: "languages", emoji: "🐍", theme: "blue" },
    { name: "Java", level: 75, category: "languages", emoji: "☕", theme: "orange" },
    { name: "C", level: 78, category: "languages", emoji: "💿", theme: "slate" },
    { name: "JavaScript", level: 70, category: "languages", emoji: "💛", theme: "yellow" },
    { name: "HTML & CSS", level: 85, category: "web-backend", emoji: "🎨", theme: "emerald" },
    { name: "Machine Learning", level: 72, category: "other", emoji: "🤖", theme: "purple" },
    { name: "Deep Learning", level: 68, category: "other", emoji: "🧠", theme: "cyan" },
    { name: "Data Analysis", level: 74, category: "other", emoji: "📊", theme: "teal" },
    { name: "MySQL", level: 80, category: "database-tools", emoji: "🐬", theme: "sky" },
    { name: "MongoDB", level: 75, category: "database-tools", emoji: "🍃", theme: "green" },
    { name: "Git & GitHub", level: 82, category: "database-tools", emoji: "🐙", theme: "rose" },
    { name: "Linux", level: 78, category: "database-tools", emoji: "🐧", theme: "indigo" },
    { name: "Windows", level: 85, category: "database-tools", emoji: "🪟", theme: "blue" }
  ],
  education: [
    { id: "edu-1", period: "2024 — Present", degree: "Master of Computer Applications (MCA)", institution: "ST Philomena College (Autonomous), Puttur", extra: "Expected Graduation: 2026 | Focus on Secure Software Engineering & Problem-Solving" },
    { id: "edu-2", period: "2021 — 2024", degree: "Bachelor of Computer Applications (BCA)", institution: "Sacred Heart College, Madanthyar", extra: "Graduation CGPA: 7.4/10 | Core Programming and Databases Foundation" },
    { id: "edu-3", period: "2019 — 2021", degree: "Pre-University College (PCMC)", institution: "Sacred Heart PU College, Madanthyar", extra: "Percentage Grade: 54.5% | PCMC Academics" },
    { id: "edu-4", period: "2018 — 2019", degree: "Secondary School Certificate (10th)", institution: "Sacred Heart High School, Madanthyar", extra: "Percentage Grade: 74.56%" }
  ] as any[],
  projects: [
    {
      id: "proj-veritas",
      title: "Veritas",
      description: "An AI-powered full-stack real-time news evaluation and fact-checking dashboard. Spot misinformation, analyze political claims, and evaluate risks instantly using Google Gemini, dynamic routing, and intelligent offline failovers.",
      category: "web",
      tags: ["Gemini AI", "React", "Node.js", "Tailwind CSS", "Real-Time"],
      icon: "⚖️",
      learnings: [
        "Integrated Google Gemini API to analyze news payloads and estimate risks of misinformation in real-time.",
        "Engineered high-performance dynamic routing with intelligent state caching and offline failovers."
      ],
      stars: 87,
      liveUrl: "https://veritas-iota-steel.vercel.app/"
    },
    {
      id: "proj-1",
      title: "Intrusion Detection System",
      description: "Developed a machine learning-based intrusion detection system capable of identifying potential network threats and suspicious activities.",
      category: "cybersecurity",
      tags: ["Python", "Scikit-Learn", "Machine Learning", "Network Packet Analysis"],
      icon: "🔍",
      learnings: [
        "Modeled network payload signatures using multi-layer Random Forest Classifiers.",
        "Created background thread listeners to handle pacet inspection."
      ],
      stars: 48
    },
    {
      id: "proj-2",
      title: "Student Portfolio Web Application",
      description: "Designed and developed a responsive personal portfolio website to showcase projects, skills, certifications, and achievements.",
      category: "web",
      tags: ["HTML", "CSS", "JavaScript"],
      icon: "🌐",
      learnings: [
        "Engineered smooth route transitions and glassmorphism styling structures.",
        "Designed accessible form states and local-storage data pipelines."
      ],
      stars: 62
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Cybersecurity & Digital Forensics",
      issuer: "TALFOR",
      year: "2026",
      icon: "🔓",
      credentialId: "TALFOR-CDF-30H-2026",
      skillsVerified: ["Information Security", "Digital Investigations", "Incident Handling", "Cybersecurity Fundamentals"],
      fileUrl: "/certificates/cybersecurity_forensics.jpg"
    },
    {
      id: "cert-2",
      title: "Getting Started with Artificial Intelligence",
      issuer: "IBM SkillsBuild",
      year: "2026",
      icon: "🧠",
      credentialId: "IBM-SB-AI-FEB-2026",
      skillsVerified: ["AI Fundamentals", "Artificial Intelligence Concepts", "Emerging Technologies"],
      fileUrl: "/certificates/ibm_ai.pdf"
    },
    {
      id: "cert-3",
      title: "WordPress Campus Connect",
      issuer: "WordPress Community",
      year: "2026",
      icon: "🌐",
      credentialId: "WP-CC-2026-ENGAGEMENT",
      skillsVerified: ["Participation & Technology Community Engagement", "WordPress Fundamentals"],
      fileUrl: "/certificates/wordpress_campus_connect.pdf"
    },
    {
      id: "cert-4",
      title: "MongoDB Learning Path Collection",
      issuer: "MongoDB",
      year: "2025",
      icon: "🍃",
      credentialId: "MDB-LP-ALL-COLLECTION",
      skillsVerified: ["Introduction to MongoDB", "MongoDB Atlas", "Document Model", "CRUD Operations", "Aggregation", "Indexes", "Transactions", "Data Modeling", "Atlas Search"],
      fileUrl: "/certificates/mongodb_proof.pdf"
    }
  ],
  achievements: [
    { id: "ach-1", emoji: "🛡️", title: "Cybersecurity & Digital Forensics Training", subtitle: "Completed TALFOR 30-Hour intensive certification track" },
    { id: "ach-2", emoji: "🤖", title: "IBM SkillsBuild AI Certificate", subtitle: "Credentialed in Artificial Intelligence core concepts" },
    { id: "ach-3", emoji: "🍃", title: "MongoDB Learning Path", subtitle: "Finished core data modeling and CRUD query path" },
    { id: "ach-4", emoji: "💻", title: "WordPress Campus Connect", subtitle: "Successfully participated in technology community engagement" },
    { id: "ach-5", emoji: "⚡", title: "Developed Cybersecurity & Web Projects", subtitle: "Created Intrusion Detection System & interactive portfolios" },
    { id: "ach-6", emoji: "🎓", title: "Pursuing MCA Path", subtitle: "Succeeding with focus on technology and software innovation" }
  ]
};

// Helper to safely format/resolve social links (handles both raw handles and full URLs)
const getSocialUrl = (platform: "github" | "linkedin" | "instagram", value: string) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  const baseUrls = {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    instagram: "https://instagram.com/",
  };
  return `${baseUrls[platform]}${value}`;
};

const getSocialDisplayLabel = (platform: "github" | "linkedin" | "instagram", value: string) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) {
    try {
      const url = new URL(value);
      // strip search queries & trailing slashes to display beautifully
      const cleanPath = url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname;
      return url.hostname + cleanPath;
    } catch {
      return value;
    }
  }
  const hostnames = {
    github: "github.com/",
    linkedin: "linkedin.com/in/",
    instagram: "instagram.com/",
  };
  return `${hostnames[platform]}${value}`;
};

export default function App() {
  const [config, setConfig] = useState<ProfileConfig>(() => {
    const saved = localStorage.getItem("sanath-shetty-config");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migrate from old placeholder mail safely
      if (parsed.contact_email === "sanathshetty903@gmail.com") {
        return INITIAL_CONFIG;
      }
      if (!parsed.instagram || !parsed.projects || parsed.projects.length > 10) {
        return INITIAL_CONFIG;
      }
      // Guarantee skills have fallback emojis & themes
      if (parsed.skills) {
        parsed.skills = parsed.skills.map((s: any) => ({
          ...s,
          emoji: s.emoji || DEFAULT_SKILL_EMOJIS[s.name] || "💡",
          theme: s.theme || DEFAULT_SKILL_THEMES[s.name] || "cyan"
        }));
      }
      // Ensure missing or updated default projects from INITIAL_CONFIG (like Veritas) are injected
      if (parsed.projects && Array.isArray(parsed.projects)) {
        INITIAL_CONFIG.projects.forEach((initProj) => {
          const existingIdx = parsed.projects.findIndex((p: any) => p.id === initProj.id);
          if (existingIdx === -1) {
            if (initProj.id === "proj-veritas") {
              parsed.projects = [initProj, ...parsed.projects];
            } else {
              parsed.projects.push(initProj);
            }
          } else {
            parsed.projects[existingIdx] = {
              ...initProj,
              ...parsed.projects[existingIdx]
            };
          }
        });
      }
      return parsed;
    }
    return INITIAL_CONFIG;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem("sanath-shetty-messages");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeProjFilter, setActiveProjFilter] = useState<string>("all");
  const [projQuery, setProjQuery] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("badge-unlocked") === "true";
  });
  
  // Selected Card for detailing Modal
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form Fields
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem("sanath-shetty-config", JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem("sanath-shetty-messages", JSON.stringify(messages));
  }, [messages]);

  // Accent specific Class bindings maps
  const accentMaps = {
    cyan: {
      text: "text-cyan-400",
      bg: "bg-cyan-500",
      bgLight: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      borderFocus: "focus:border-cyan-500",
      gradient: "from-cyan-500 via-sky-400 to-indigo-500",
      ring: "ring-cyan-500",
      shadow: "shadow-cyan-500/20",
    },
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-500",
      bgLight: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      borderFocus: "focus:border-emerald-500",
      gradient: "from-emerald-500 via-green-400 to-teal-500",
      ring: "ring-emerald-400",
      shadow: "shadow-emerald-500/20",
    },
    pink: {
      text: "text-pink-400",
      bg: "bg-pink-500",
      bgLight: "bg-pink-500/10",
      border: "border-pink-500/20",
      borderFocus: "focus:border-pink-505",
      gradient: "from-pink-500 via-rose-400 to-purple-500",
      ring: "ring-pink-400",
      shadow: "shadow-pink-500/20",
    },
    indigo: {
      text: "text-indigo-400",
      bg: "bg-indigo-500",
      bgLight: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      borderFocus: "focus:border-indigo-505",
      gradient: "from-indigo-500 via-purple-400 to-pink-500",
      ring: "ring-indigo-400",
      shadow: "shadow-indigo-500/20",
    },
    amber: {
      text: "text-amber-400",
      bg: "bg-amber-500",
      bgLight: "bg-amber-500/10",
      border: "border-amber-500/20",
      borderFocus: "focus:border-amber-500",
      gradient: "from-amber-500 via-yellow-400 to-orange-500",
      ring: "ring-amber-400",
      shadow: "shadow-amber-500/20",
    },
  };

  const activeAccent = accentMaps[config.accentColor] || accentMaps.cyan;

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMsg.trim()) return;

    const newMessage: ContactMessage = {
      id: "msg-" + Date.now(),
      name: contactName.trim(),
      email: contactEmail.trim(),
      message: contactMsg.trim(),
      timestamp: new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
    };

    setMessages(prev => [newMessage, ...prev]);
    setFormSuccess(true);
    setContactName("");
    setContactEmail("");
    setContactMsg("");

    setTimeout(() => {
      setFormSuccess(false);
    }, 4000);
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(config.contact_email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const unlockBadgeFromQuiz = (badgeName: string) => {
    setBadgeUnlocked(true);
    localStorage.setItem("badge-unlocked", "true");
  };

  const handleUnlockSudoClearance = () => {
    setConfig(prev => ({
      ...prev,
      accentColor: "amber",
    }));
  };

  // Filter project lists
  const filteredProjects = config.projects.filter((proj) => {
    const matchesCat = activeProjFilter === "all" || proj.category === activeProjFilter;
    const matchesSearch = proj.title.toLowerCase().includes(projQuery.toLowerCase()) || 
                          proj.description.toLowerCase().includes(projQuery.toLowerCase()) ||
                          proj.tags.some(t => t.toLowerCase().includes(projQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070b16] text-[#e2e8f0] scroll-smooth antialiased pb-20 select-none selection:bg-cyan-500/30 font-sans selection:text-white relative overflow-x-hidden">
      
      {/* GLOW BACKGROUND ORBS */}
      <div className="absolute top-10 left-[-10%] w-[35vw] h-[35vw] rounded-full bg-cyan-700/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-700/5 blur-[140px] pointer-events-none select-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-purple-700/5 blur-[130px] pointer-events-none select-none" />

      {/* FLOATING HEADER */}
      <nav id="navbar" className="fixed top-0 left-0 right-0 z-40 bg-[#070b16]/70 backdrop-blur-md border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${activeAccent.bgLight} border ${activeAccent.border}`}>
              <Shield className={`w-5 h-5 ${activeAccent.text}`} />
            </div>
            <a href="#" className="font-bold text-lg font-mono tracking-tight text-white flex items-center gap-1">
              <span>{config.student_name.split(" ").map(w => w[0]).join("").toUpperCase()}</span>
              <span className={`text-[10px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded ${activeAccent.bgLight} ${activeAccent.text} border ${activeAccent.border}`}>
                {config.academic_year}
              </span>
            </a>
          </div>

          {/* Desktop Anchors */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#about" className="text-gray-400 hover:text-white transition font-medium font-sans">About</a>
            <a href="#skills" className="text-gray-400 hover:text-white transition font-medium font-sans">Technical Stack</a>
            <a href="#projects" className="text-gray-400 hover:text-white transition font-medium font-sans">Projects</a>
            <a href="#certifications" className="text-gray-400 hover:text-white transition font-medium font-sans">Credentials</a>
            <a href="#challenge" className="text-gray-400 hover:text-white transition font-medium flex items-center gap-1">
              <span>Security Hub</span>
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition font-medium">Connect</a>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={getSocialUrl("github", config.github)} 
              target="_blank" 
              rel="noopener noreferrer" 
              id="github-nav-link"
              className="text-gray-400 hover:text-white transition bg-white/5 border border-white/10 p-2 rounded-lg"
            >
              <Github className="w-4 h-4" />
            </a>
            
            {/* Mobile Menu Button toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden block text-gray-400 hover:text-white transition"
              id="mobile-btn"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden mt-3 bg-[#0a0f1d] border-t border-gray-800 rounded-lg"
            >
              <div className="flex flex-col p-4 gap-3 text-sm">
                <a onClick={() => setMobileMenuOpen(false)} href="#about" className="text-gray-300 hover:text-white py-1">About Profile</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#skills" className="text-gray-300 hover:text-white py-1">Skills Arsenal</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#projects" className="text-gray-300 hover:text-white py-1 font-sans">Featured Projects</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#certifications" className="text-gray-300 hover:text-white py-1">Certifications</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#challenge" className="text-gray-300 hover:text-white py-1 flex items-center gap-1">Security Challenge</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#contact" className="text-gray-300 hover:text-white py-1">Get In Touch</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION BLOCK */}
      <section className="relative px-6 pt-32 pb-24 max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-center">
        {/* Left main info */}
        <div className="md:col-span-3 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/5 border border-cyan-500/20 rounded-full">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              // Security First, Clean Code Second
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-white leading-tight">
            I'm <span className={`bg-gradient-to-r ${activeAccent.gradient} bg-clip-text text-transparent font-extrabold`}>{config.student_name}</span>
          </h1>

          <h2 className="text-xl sm:text-2xl text-slate-300 font-light max-w-xl">
            {config.title}
          </h2>

          <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
            {config.hero_subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 select-none">
            <a 
              href="#projects" 
              id="hero-view-projects-btn"
              className={`bg-gradient-to-r ${activeAccent.gradient} hover:scale-105 active:scale-95 text-white shadow-lg ${activeAccent.shadow} font-semibold text-xs px-6 py-3 rounded-lg flex items-center gap-2 transition-all`}
            >
              <Code2 className="w-4 h-4" />
              <span>Explore Projects</span>
            </a>

            <a 
              href="#about" 
              id="hero-journey-btn"
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-[#e2e8f0] font-semibold text-xs px-6 py-3 rounded-lg flex items-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Explore My Journey</span>
            </a>
          </div>
        </div>

        {/* Right visualization elements */}
        <div className="md:col-span-2 flex justify-center relative">
          <div className="relative">
            <div className={`w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-br from-[#101726] to-[#0d1321] border border-gray-800 shadow-2xl p-6 relative flex flex-col justify-between overflow-hidden group`}>
              {/* Dynamic decorative backdrop grids */}
              <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
              
              <div className="flex justify-between items-start">
                {config.profile_image_url ? (
                  <div className="relative group-hover:scale-105 transition duration-300">
                    <img
                      src={config.profile_image_url}
                      alt={config.student_name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-28 rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] bg-[#101726]/80"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256&h=256";
                      }}
                    />
                  </div>
                ) : (
                  <span className="text-4xl text-cyan-400 select-none animate-pulse">
                    {config.avatar_emoji || "👨‍💻"}
                  </span>
                )}
                <span className={`text-[10px] tracking-wider font-mono px-2 py-1 rounded bg-[#162035]/60 border border-gray-800 text-gray-400`}>
                  ST Philomena
                </span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-mono">OPERATIVE DOSSIER</p>
                  <p className="text-sm font-bold text-white tracking-wide">{config.student_name}</p>
                </div>

                <div className="space-y-1 pb-1">
                  <p className="text-[10px] text-gray-500 font-mono">MISSION OBJECTIVE</p>
                  <span className={`inline-block py-0.5 px-2 rounded-full text-[9px] font-bold ${activeAccent.bgLight} ${activeAccent.text} border ${activeAccent.border}`}>
                    🔐 Cybersecurity Specialist
                  </span>
                </div>
              </div>
            </div>

            {/* Float visual anchors matching original HTML badges mock values but interactive! */}
            <div className="absolute -top-3 -right-3 bg-[#0a1020]/90 border border-cyan-500/30 px-3 py-1.5 rounded-full text-[10px] text-cyan-300 flex items-center gap-1.5 shadow-xl">
              <span>🔐 Security Focus</span>
            </div>
            
            <div className="absolute -bottom-3 -left-3 bg-[#0a1020]/90 border border-purple-500/30 px-3 py-1.5 rounded-full text-[10px] text-purple-300 flex items-center gap-1.5 shadow-xl">
              <span>💻 Full Stack Developer</span>
            </div>

            {badgeUnlocked && (
              <div className="absolute top-[40%] -right-8 bg-yellow-500/10 border border-yellow-500/45 px-3 py-1.5 rounded-full text-[10px] text-yellow-300 backdrop-blur flex items-center gap-1 shadow-2xl animate-bounce">
                <span>🛡️ Verified Guardian</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CORE INTEGRATED TERMINAL RETRO PLAYGROUND */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-slate-500 uppercase">
            // LIVE SECURITY DIAGNOSTIC OVERVIEW
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Execute safe testing sequences or look up configurations via binary terminal overrides.
          </p>
        </div>
        <Terminal 
          config={config} 
          onClearanceUnlocked={handleUnlockSudoClearance} 
          accentClass={activeAccent} 
        />
      </section>

      {/* PROFESSIONAL BIO DETAIL */}
      <section id="about" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="border-l-2 border-cyan-500 pl-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Professional Bio</span>
          <h3 className="text-3xl font-bold font-sans text-white mt-1">Who I Am</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6 text-gray-300 text-sm leading-relaxed font-sans">
            {config.about_text.split("\n\n").map((para, pIdx) => (
              <p key={pIdx} className="whitespace-pre-line">{para}</p>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-[#0b1226]/60 border border-gray-800 p-6 rounded-2xl space-y-4 hover:border-gray-750 transition-all">
              <h4 className="font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 text-cyan-400">
                <Globe className="w-4 h-4" />
                <span>Languages</span>
              </h4>
              <div className="space-y-3 font-sans text-xs">
                <div className="flex justify-between border-b border-gray-800/40 pb-2">
                  <span className="text-gray-400 font-medium">English</span>
                  <span className="text-white font-semibold">Fluent</span>
                </div>
                <div className="flex justify-between border-b border-gray-800/40 pb-2">
                  <span className="text-gray-400 font-medium">Kannada</span>
                  <span className="text-white font-semibold flex items-center">Native</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Hindi</span>
                  <span className="text-white font-semibold">Intermediate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMIC TIMELINE SECTION */}
      <section className="py-16 px-6 bg-[#0a0f1d]/50 border-y border-gray-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="border-l-2 border-cyan-500 pl-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Education</span>
            <h3 className="text-3xl font-bold text-white mt-1">Academic Timeline</h3>
          </div>

          <div className="relative border-l border-gray-800 ml-4 pl-8 md:ml-32 md:pl-12 space-y-8 max-w-3xl">
            {config.education.map((edu, eIdx) => {
              const colors = ["border-cyan-500 bg-cyan-950 text-cyan-300", "border-purple-500 bg-purple-950 text-purple-300", "border-indigo-500 bg-indigo-950 text-indigo-300"];
              return (
                <div key={edu.id} className="relative group">
                  {/* Timeline bullet dot */}
                  <div className={`absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full border-4 border-[#070b16] shrink-0 ${
                    eIdx === 0 ? "bg-cyan-400" : eIdx === 1 ? "bg-purple-400" : "bg-indigo-400"
                  }`} />
                  
                  {/* Absolute date tag for desctop grids */}
                  <span className="hidden md:block absolute -left-44 top-1.5 text-xs font-mono font-semibold text-gray-500 uppercase tracking-widest">
                    {edu.period}
                  </span>

                  <div className="bg-[#0b1226]/80 border border-gray-800 p-5 rounded-xl space-y-1.5 hover:border-gray-750 transition">
                    <span className="md:hidden block text-xs font-mono text-cyan-400 font-bold">{edu.period}</span>
                    <h4 className="font-bold text-white text-base">{edu.degree}</h4>
                    <p className="text-sm text-gray-400">{edu.institution}</p>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">{edu.extra}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTENSITY PROGRESS MATRIX (SKILLS) */}
      <section id="skills" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="border-l-2 border-cyan-500 pl-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Matrix Diagnostics</span>
          <h3 className="text-3xl font-bold font-sans text-white mt-1">Skills Arsenal</h3>
        </div>

        <div className="space-y-8">
          {/* Cyber stack list */}
          <div className="bg-[#0b1226]/60 border border-gray-800 p-6 rounded-2xl space-y-4 hover:border-gray-700 transition-all">
            <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-800/60 pb-3">
              <Lock className="w-4 h-4 text-rose-400" />
              <span>Cybersecurity Stack</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {config.skills.filter(s => s.category === "cybersecurity").map((sk, sIdx) => {
                const colors = getThemeColors(sk.theme);
                return (
                  <div key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-[#070b16]/55 border border-gray-850 hover:border-gray-700 hover:bg-[#0c1326] transition-all group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base select-none transition-transform group-hover:scale-120">{sk.emoji || "🕵️‍♂️"}</span>
                      <span className="text-slate-300 font-sans text-xs font-medium group-hover:text-white transition-colors">{sk.name}</span>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages stack list */}
          <div className="bg-[#0b1226]/60 border border-gray-800 p-6 rounded-2xl space-y-4 hover:border-gray-755 transition-all">
            <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-800/60 pb-3">
              <Code className="w-4 h-4 text-cyan-455" />
              <span>Programming Languages</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {config.skills.filter(s => s.category === "languages").map((sk, sIdx) => {
                const colors = getThemeColors(sk.theme);
                return (
                  <div key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-[#070b16]/55 border border-gray-850 hover:border-gray-700 hover:bg-[#0c1326] transition-all group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base select-none transition-transform group-hover:scale-120">{sk.emoji || "💻"}</span>
                      <span className="text-slate-300 font-sans text-xs font-medium group-hover:text-white transition-colors">{sk.name}</span>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Web stack list */}
          <div className="bg-[#0b1226]/60 border border-gray-800 p-6 rounded-2xl space-y-4 hover:border-gray-755 transition-all">
            <h4 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-800/60 pb-3">
              <Globe className="w-4 h-4 text-purple-455" />
              <span>Web & Backend Engineering</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {config.skills.filter(s => s.category === "web-backend").map((sk, sIdx) => {
                const colors = getThemeColors(sk.theme);
                return (
                  <div key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-[#070b16]/55 border border-gray-850 hover:border-gray-700 hover:bg-[#0c1326] transition-all group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base select-none transition-transform group-hover:scale-120">{sk.emoji || "🌐"}</span>
                      <span className="text-slate-300 font-sans text-xs font-medium group-hover:text-white transition-colors">{sk.name}</span>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Databases & Tools & AI stack list */}
          <div className="bg-[#0b1226]/60 border border-gray-800 p-6 rounded-2xl space-y-4 hover:border-gray-755 transition-all">
            <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2 border-b border-gray-800/60 pb-3">
              <Server className="w-4 h-4 text-indigo-455" />
              <span>Data Systems, AI & Version Control</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {config.skills.filter(s => s.category === "database-tools" || s.category === "other").map((sk, sIdx) => {
                const colors = getThemeColors(sk.theme);
                return (
                  <div key={sIdx} className="flex items-center justify-between p-3 rounded-xl bg-[#070b16]/55 border border-gray-850 hover:border-gray-700 hover:bg-[#0c1326] transition-all group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base select-none transition-transform group-hover:scale-120">{sk.emoji || "⚙️"}</span>
                      <span className="text-slate-300 font-sans text-xs font-medium group-hover:text-white transition-colors">{sk.name}</span>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FILTERABLE PROJECTS GRID SECTION */}
      <section id="projects" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="border-l-2 border-cyan-500 pl-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Works Archive</span>
            <h3 className="text-3xl font-bold font-sans text-white mt-1">Featured Projects</h3>
          </div>

          {/* Dynamic Search + Filter menu layout */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search tag or name..."
              value={projQuery}
              onChange={(e) => setProjQuery(e.target.value)}
              id="project-search-bar"
              className="bg-[#0b1226] text-white border border-gray-800 focus:border-cyan-500 focus:outline-none px-3.5 py-1.5 rounded-lg text-xs placeholder-gray-500 font-sans outline-none transition"
            />

            {/* Filtering buttons list */}
            <div className="flex bg-[#0b1226] border border-gray-800 p-1 rounded-lg gap-1">
              {(["all", "cybersecurity", "web"] as const).map((filterCat) => (
                <button
                  key={filterCat}
                  onClick={() => setActiveProjFilter(filterCat)}
                  className={`text-[10px] font-mono tracking-wider font-semibold uppercase px-3 py-1.5 rounded-md transition ${
                    activeProjFilter === filterCat 
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white" 
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {filterCat === "all" ? "All Systems" : filterCat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0b1226]/65 border border-gray-800/80 rounded-2xl overflow-hidden hover:border-gray-700 transition flex flex-col justify-between"
              >
                {/* Simulated Repo Header */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-3xl select-none" id="project-card-emoji">{proj.icon}</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/35 px-2.5 py-1 rounded-full font-bold uppercase select-none">
                      {proj.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white font-sans">{proj.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed mt-1 font-sans">{proj.description}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 select-none pt-1">
                    {proj.tags.map((tg, idx) => (
                      <span key={idx} className="bg-[#151c30] text-slate-400 border border-[#212b49] text-[9px] px-2 py-0.5 rounded font-mono font-medium">
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Simulated Git footer controls */}
                <div className="px-6 py-4 bg-[#0a1020]/25 border-t border-slate-900/40 flex justify-between items-center text-xs text-gray-500 font-mono gap-4">
                  <span className="text-gray-600 font-mono text-[10px] truncate">VERIFIED SANDBOX MODULE</span>
                  
                  <div className="flex items-center gap-3.5 shrink-0">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold hover:text-emerald-300 font-sans"
                      >
                        <span>Visit Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold hover:text-cyan-300 font-sans"
                    >
                      <span>View Blueprint Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-2 text-center py-16 border border-dashed border-gray-800 rounded-2xl space-y-3">
              <AlertCircle className="w-8 h-8 text-gray-600 mx-auto" />
              <p className="text-xs text-gray-400 uppercase tracking-widest font-mono">No matching project found</p>
              <p className="text-[10px] text-gray-500 max-w-sm mx-auto">
                No active repositories conform to the filter criteria or query parameters specified. Select 'All Systems' or change search keys.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* VERIFIED CERTIFICATIONS PORTFOLIO */}
      <section id="certifications" className="py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="border-l-2 border-cyan-500 pl-4">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Audit Credentials</span>
          <h3 className="text-3xl font-bold font-sans text-white mt-1">Verified Certifications</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.certifications.map((crt) => (
            <div
              key={crt.id}
              onClick={() => setSelectedCert(crt)}
              className="bg-[#0b1226]/60 border border-gray-800 hover:border-gray-700 hover:-translate-y-1 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 cursor-pointer group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl select-none group-hover:scale-110 transition duration-300">
                    {crt.icon}
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition" />
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm tracking-wide leading-relaxed group-hover:text-cyan-300 transition duration-300 font-sans">
                    {crt.title}
                  </h4>
                  <p className="text-gray-500 text-xs mt-1">{crt.issuer} • {crt.year}</p>
                </div>
              </div>

              <span className="text-[9px] font-mono text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded self-start uppercase select-none">
                Verify ID: {crt.credentialId.substring(0, 14)}...
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS / MILESTONES */}
      <section className="py-20 px-6 bg-[#0a0f1d]/40 border-y border-gray-900">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="border-l-2 border-cyan-500 pl-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Major Achievements</span>
            <h3 className="text-3xl font-bold font-sans text-white mt-1">Milestones & Awards</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.achievements.map((ach) => (
              <div key={ach.id} className="bg-[#0b1226]/80 border border-gray-800 p-5 rounded-2xl space-y-3 hover:border-gray-750 transition">
                <span className="text-2xl block select-none">{ach.emoji}</span>
                <div>
                  <h4 className="font-bold text-[#e2e8f0] text-sm leading-snug">{ach.title}</h4>
                  <p className="text-gray-500 text-xs mt-1">{ach.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE TRIVIA / CHALLENGE HUB */}
      <section id="challenge" className="py-20 px-6 max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// DEFENSIBLE CYBER GUARD TRIVIA CHASSIS</span>
          <h3 className="text-3xl font-bold text-white">Unlock Candidate Access Badge</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Answer the 3 cyber security compliance questions to verify network security logs and unlock Sanath's interactive gold profile accent.
          </p>
        </div>

        <TriviaQuiz 
          onBadgeUnlocked={unlockBadgeFromQuiz} 
          hasUnlockedBadge={badgeUnlocked} 
          accentClass={activeAccent} 
        />
      </section>

      {/* NUMERICAL ANALYTICS BAR (STATS) */}
      <section className="py-12 bg-black/40 border-y border-slate-900/60 font-sans">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center select-none">
          <div className="space-y-1 bg-[#0b1226]/40 p-4 rounded-xl border border-gray-800">
            <h4 className={`text-3xl font-extrabold bg-gradient-to-r ${activeAccent.gradient} bg-clip-text text-transparent`}>
              {config.projects.length}+
            </h4>
            <p className="text-slate-400 uppercase font-mono text-[9px] tracking-widest mt-1">Projects Logged</p>
          </div>

          <div className="space-y-1 bg-[#0b1226]/40 p-4 rounded-xl border border-gray-800">
            <h4 className={`text-3xl font-extrabold bg-gradient-to-r ${activeAccent.gradient} bg-clip-text text-transparent`}>
              {config.certifications.length}
            </h4>
            <p className="text-slate-400 uppercase font-mono text-[9px] tracking-widest mt-1">Verified Certs</p>
          </div>

          <div className="space-y-1 bg-[#0b1226]/40 p-4 rounded-xl border border-gray-800">
            <h4 className={`text-3xl font-extrabold bg-gradient-to-r ${activeAccent.gradient} bg-clip-text text-transparent`}>
              500+
            </h4>
            <p className="text-slate-400 uppercase font-mono text-[9px] tracking-widest mt-1">Algorithm Solutions</p>
          </div>

          <div className="space-y-1 bg-[#0b1226]/40 p-4 rounded-xl border border-gray-800">
            <h4 className={`text-3xl font-extrabold bg-gradient-to-r ${activeAccent.gradient} bg-clip-text text-transparent`}>
              7.4
            </h4>
            <p className="text-slate-400 uppercase font-mono text-[9px] tracking-widest mt-1">CGPA Average</p>
          </div>
        </div>
      </section>

      {/* CONNECT / CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Connect Portal</span>
          <h3 className="text-3xl font-bold font-sans text-white">Let's Connect and Grow Together</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Open to learning opportunities, internships, collaborations, and technology discussions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 pt-6">
          {/* Card left: Form input */}
          <div className="bg-[#0b1226]/70 border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h4 className="font-bold text-white text-base font-sans">Send me a Message</h4>
            
            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5" htmlFor="contact-name">Your Full Name</label>
                <input
                  type="text"
                  id="contact-name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Sanath Shetty"
                  className="w-full bg-slate-900/60 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none transition font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5" htmlFor="contact-email">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="sanath@email.com"
                  className="w-full bg-slate-900/60 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none transition font-sans"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5" htmlFor="contact-message">Broad Proposal / Description</label>
                <textarea
                  id="contact-message"
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Explain secure deployment timelines or remote internship offerings..."
                  className="w-full bg-slate-900/60 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-cyan-500/50 focus:outline-none transition h-28 resize-none font-sans"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full bg-gradient-to-r ${activeAccent.gradient} hover:scale-[1.01] text-white font-semibold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Packet Payload</span>
              </button>
            </form>

            <AnimatePresence>
              {formSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-xl text-center font-medium"
                >
                  ✓ Message sent successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card right: Links and contact info */}
          <div className="space-y-6">
            <h4 className="font-bold text-white text-base font-sans">Links & Coordinates</h4>
            
            <div className="space-y-3">
              <a 
                href={getSocialUrl("github", config.github)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#0b1226]/60 border border-gray-800 hover:border-gray-700 p-4 rounded-2xl flex items-center gap-4 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm">GitHub Profile</p>
                  <p className="text-xs text-gray-500 truncate">{getSocialDisplayLabel("github", config.github)}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition shrink-0" />
              </a>

              <a 
                href={getSocialUrl("linkedin", config.linkedin)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#0b1226]/60 border border-gray-800 hover:border-gray-700 p-4 rounded-2xl flex items-center gap-4 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm">LinkedIn Profile</p>
                  <p className="text-xs text-gray-500 truncate">{getSocialDisplayLabel("linkedin", config.linkedin)}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition shrink-0" />
              </a>

              {config.instagram && (
                <a 
                  href={getSocialUrl("instagram", config.instagram)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#0b1226]/60 border border-gray-800 hover:border-gray-700 p-4 rounded-2xl flex items-center gap-4 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-600/10 flex items-center justify-center text-pink-400 shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm">Instagram</p>
                    <p className="text-xs text-gray-500 truncate">{getSocialDisplayLabel("instagram", config.instagram)}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition shrink-0" />
                </a>
              )}

              {config.contact_email && (
                <a 
                  href={`mailto:${config.contact_email}`}
                  className="bg-[#0b1226]/60 border border-gray-800 hover:border-gray-700 p-4 rounded-2xl flex items-center gap-4 transition group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm">Email Address</p>
                    <p className="text-xs text-gray-500 truncate">{config.contact_email}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition shrink-0" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DECORATIVE BOTTOM FOOTER */}
      <footer className="py-8 px-6 border-t border-slate-900/50 text-center max-w-6xl mx-auto text-xs text-gray-600 space-y-1">
        <p>
          Designed & Built by <span className={activeAccent.text}>{config.student_name}</span> • Cybersecurity Portfolio Customizer © 2026
        </p>
        <p className="text-[10px] uppercase font-mono tracking-widest text-slate-700">
          Root Ingress: Localhost 3000 Node Secure
        </p>
      </footer>

      {/* CORE POPUP DRAWERS (Modal overlays) */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateViewerModal
            certification={selectedCert}
            candidateName={config.student_name}
            onClose={() => setSelectedCert(null)}
          />
        )}

        {/* Selected Project Details Overlay */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f172a] border border-gray-800 max-w-lg w-full rounded-2xl p-6 relative shadow-2xl select-text"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl">{selectedProject.icon}</span>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white bg-white/5 p-1.5 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-xl font-bold text-white font-sans">{selectedProject.title}</h4>
              <p className="text-xs text-cyan-400 font-mono mt-1 uppercase tracking-widest">Blueprint Specs</p>

              <div className="space-y-4 mt-4">
                <p className="text-xs text-gray-400 leading-relaxed font-sans font-normal">
                  {selectedProject.description}
                </p>

                <div className="space-y-2">
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Technical Implementation Notes</p>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 font-sans">
                    {selectedProject.learnings.map((ln, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {ln}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedProject.tags.map((tg, idx) => (
                    <span key={idx} className="bg-cyan-950/30 text-cyan-400 border border-cyan-800/20 text-[10px] px-2.5 py-1 rounded font-mono">
                      {tg}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 text-yellow-500">
                    <span>★</span>
                    <span className="font-bold font-mono">{selectedProject.stars} GitHub validation references</span>
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-xl transition font-sans flex items-center gap-1.5"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-xl transition font-sans"
                    >
                      Close Blueprint
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EXQUISITE VISUAL CUSTOMIZATION DRAWER CABINET */}
      <AdminPanel 
        config={config} 
        onConfigChange={setConfig} 
        messages={messages} 
        onClearMessages={handleClearMessages} 
      />
    </div>
  );
}
