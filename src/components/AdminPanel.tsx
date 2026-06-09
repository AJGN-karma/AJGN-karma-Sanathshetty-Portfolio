import React, { useState } from "react";
import { ProfileConfig, ContactMessage, Skill, Project, Certification } from "../types";
import { 
  Settings, Save, Plus, Trash2, Mail, Terminal, Palette, Award, 
  Menu, X, MessageSquare, Briefcase, Code, ShieldCheck 
} from "lucide-react";

interface AdminPanelProps {
  config: ProfileConfig;
  onConfigChange: (updated: ProfileConfig) => void;
  messages: ContactMessage[];
  onClearMessages: () => void;
}

export default function AdminPanel({ config, onConfigChange, messages, onClearMessages }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "theme" | "skills" | "projects" | "certs" | "messages">("general");

  // Local state form buffers
  const [name, setName] = useState(config.student_name);
  const [title, setTitle] = useState(config.title);
  const [heroSubtitle, setHeroSubtitle] = useState(config.hero_subtitle);
  const [aboutText, setAboutText] = useState(config.about_text);
  const [email, setEmail] = useState(config.contact_email);
  const [github, setGithub] = useState(config.github);
  const [linkedin, setLinkedin] = useState(config.linkedin);
  const [instagram, setInstagram] = useState(config.instagram || "");

  // Buffer state to add new objects
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(80);
  const [newSkillCat, setNewSkillCat] = useState<Skill["category"]>("cybersecurity");
  const [newSkillEmoji, setNewSkillEmoji] = useState("🛡️");
  const [newSkillTheme, setNewSkillTheme] = useState("cyan");

  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjCat, setNewProjCat] = useState("cybersecurity");
  const [newProjTags, setNewProjTags] = useState("");
  const [newProjIcon, setNewProjIcon] = useState("🔐");

  const [newCertTitle, setNewCertTitle] = useState("");
  const [newCertIssuer, setNewCertIssuer] = useState("");
  const [newCertYear, setNewCertYear] = useState("2024");
  const [newCertId, setNewCertId] = useState("");

  const triggerSave = (updates: Partial<ProfileConfig>) => {
    onConfigChange({
      ...config,
      ...updates,
    });
  };

  const handleGeneralSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSave({
      student_name: name,
      title,
      hero_subtitle: heroSubtitle,
      about_text: aboutText,
      contact_email: email,
      github,
      linkedin,
      instagram,
    });
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const added: Skill = {
      name: newSkillName.trim(),
      level: Number(newSkillLevel),
      category: newSkillCat,
      emoji: newSkillEmoji.trim(),
      theme: newSkillTheme,
    };
    triggerSave({
      skills: [...config.skills, added],
    });
    setNewSkillName("");
  };

  const handleRemoveSkill = (idx: number) => {
    const filter = config.skills.filter((_, i) => i !== idx);
    triggerSave({ skills: filter });
  };

  const handleAddProject = () => {
    if (!newProjTitle.trim() || !newProjDesc.trim()) return;
    const added: Project = {
      id: "proj-" + Date.now(),
      title: newProjTitle.trim(),
      description: newProjDesc.trim(),
      category: newProjCat,
      tags: newProjTags.split(",").map(t => t.trim()).filter(Boolean),
      icon: newProjIcon,
      learnings: ["Secure authentication protocol built from ground up", "Optimized routing and memory consumption parameters"],
      stars: Math.floor(Math.random() * 80) + 12
    };
    triggerSave({
      projects: [added, ...config.projects],
    });
    setNewProjTitle("");
    setNewProjDesc("");
    setNewProjTags("");
  };

  const handleRemoveProject = (id: string) => {
    const filter = config.projects.filter(p => p.id !== id);
    triggerSave({ projects: filter });
  };

  const handleAddCert = () => {
    if (!newCertTitle.trim() || !newCertIssuer.trim()) return;
    const added: Certification = {
      id: "cert-" + Date.now(),
      title: newCertTitle.trim(),
      issuer: newCertIssuer.trim(),
      year: newCertYear,
      icon: "🎖️",
      credentialId: newCertId.trim() || "CRED-CYBER-" + Math.floor(Math.random() * 1000000),
      skillsVerified: [newCertTitle.split(" ")[0] || "Cybersecurity"]
    };
    triggerSave({
      certifications: [...config.certifications, added],
    });
    setNewCertTitle("");
    setNewCertIssuer("");
    setNewCertId("");
  };

  const handleRemoveCert = (id: string) => {
    const filter = config.certifications.filter(c => c.id !== id);
    triggerSave({ certifications: filter });
  };

  const selectAccentValue = (color: ProfileConfig["accentColor"]) => {
    triggerSave({ accentColor: color });
  };

  const selectThemeValue = (mode: ProfileConfig["themeMode"]) => {
    triggerSave({ themeMode: mode });
  };

  return null;

  return (
    <>
      {/* Floating control trigger floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-full p-4 shadow-2xl flex items-center gap-2 font-mono text-sm group"
      >
        <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
        <span>Customize View</span>
      </button>

      {/* Slide out customization dialog drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex font-sans select-text">
          {/* Backdrop overlay */}
          <div 
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          />

          {/* Admin container block overlay */}
          <div className="relative ml-auto w-full max-w-xl bg-[#0f172a] h-full shadow-2xl flex flex-col border-l border-gray-800 backdrop-blur-md">
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-800 bg-[#070b13] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-white text-base">Interactive Builder Menu</h3>
                  <p className="text-xs text-gray-400">Modify information live in index.html schema</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white rounded bg-white/5 p-1.5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub Nav Header */}
            <div className="flex border-b border-gray-800 bg-[#0a0f1d] overflow-x-auto shrink-0 scrollbar-none">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex-1 py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  activeTab === "general" ? "border-cyan-400 text-cyan-400 bg-white/5" : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                General
              </button>
              <button
                onClick={() => setActiveTab("theme")}
                className={`flex-1 py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  activeTab === "theme" ? "border-cyan-400 text-cyan-400 bg-white/5" : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                Styling
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`flex-1 py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  activeTab === "skills" ? "border-cyan-400 text-cyan-400 bg-white/5" : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Technical
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex-1 py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  activeTab === "projects" ? "border-cyan-400 text-cyan-400 bg-white/5" : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Projects
              </button>
              <button
                onClick={() => setActiveTab("certs")}
                className={`flex-1 py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  activeTab === "certs" ? "border-cyan-400 text-cyan-400 bg-white/5" : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                Certs
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`flex-1 py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all relative whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  activeTab === "messages" ? "border-cyan-400 text-cyan-400 bg-white/5" : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Inbox
                {messages.length > 0 && (
                  <span className="absolute top-1 right-2 bg-rose-500 text-white rounded-full w-4 h-4 text-[9px] flex items-center justify-center">
                    {messages.length}
                  </span>
                )}
              </button>
            </div>

            {/* Form Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: General Info */}
              {activeTab === "general" && (
                <form onSubmit={handleGeneralSave} className="space-y-4">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 font-mono">Profile Details</h4>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Candidate Profile Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Professional Title Line</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Hero Section Tagline</label>
                    <textarea
                      value={heroSubtitle}
                      onChange={(e) => setHeroSubtitle(e.target.value)}
                      className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500 h-20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Bio / About Me Body</label>
                    <textarea
                      value={aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                      className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500 h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Primary Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-medium text-gray-400 mb-1">GitHub</label>
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-gray-400 mb-1">LinkedIn</label>
                      <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-gray-400 mb-1">Instagram</label>
                      <input
                        type="text"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-3 py-2 text-white text-xs outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-medium text-sm py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all mt-4"
                  >
                    <Save className="w-4 h-4" />
                    Save Profile Settings
                  </button>
                </form>
              )}

              {/* TAB 2: Themes & Styling */}
              {activeTab === "theme" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 font-mono">Accent Palette Option</h4>
                    <div className="grid grid-cols-5 gap-3">
                      {(["cyan", "emerald", "pink", "indigo", "amber"] as const).map((clr) => {
                        const clrMaps = {
                          cyan: "bg-cyan-500 ring-cyan-400",
                          emerald: "bg-emerald-500 ring-emerald-400",
                          pink: "bg-pink-500 ring-pink-400",
                          indigo: "bg-indigo-500 ring-indigo-400",
                          amber: "bg-amber-500 ring-amber-400",
                        };

                        return (
                          <button
                            key={clr}
                            onClick={() => selectAccentValue(clr)}
                            className={`h-11 rounded-lg border border-gray-700 flex items-center justify-center relative capitalize font-mono text-xs text-white ${
                              config.accentColor === clr ? "ring-2 ring-offset-2 ring-offset-[#0f172a]" : ""
                            } ${clrMaps[clr]}`}
                          >
                            <span className="bg-slate-950/40 px-1 py-0.5 rounded text-[9px] font-bold">
                              {clr}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 font-mono">Layout mode preset</h4>
                    <p className="text-xs text-gray-400 mb-4">Choose the primary visual outline theme for the user interface layout</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => selectThemeValue("cyber")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          config.themeMode === "cyber" 
                            ? "bg-cyan-500/10 border-cyan-400 text-white" 
                            : "bg-[#1e293b]/50 border-gray-800 text-gray-400 hover:text-white"
                        }`}
                      >
                        <Palette className="w-5 h-5 mb-2" />
                        <div className="font-semibold text-sm">Dynamic Cyberpunk</div>
                        <div className="text-[10px] text-gray-400 mt-1">Slick glass cards, glowing badges and geometric structures</div>
                      </button>

                      <button
                        onClick={() => selectThemeValue("terminal")}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          config.themeMode === "terminal" 
                            ? "bg-amber-500/10 border-amber-400 text-white" 
                            : "bg-[#1e293b]/50 border-gray-800 text-gray-400 hover:text-white"
                        }`}
                      >
                        <Terminal className="w-5 h-5 mb-2" />
                        <div className="font-semibold text-sm">Retro Shell Console</div>
                        <div className="text-[10px] text-gray-400 mt-1">Monospaced terminal layout mimicking safe diagnostic reports</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Advanced Skills Matrix */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  {/* Skill Add Form */}
                  <div className="p-4 bg-[#1e293b]/40 rounded-xl border border-gray-800">
                    <h5 className="text-xs font-bold font-mono text-gray-300 uppercase tracking-widest mb-3">Add Custom Skill Node</h5>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase mb-1">Name</label>
                          <input
                            type="text"
                            placeholder="e.g. Wireshark, Rust"
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase mb-1">Emoji Icon</label>
                          <input
                            type="text"
                            placeholder="e.g. 🛡️, ⚙️, 🐍"
                            value={newSkillEmoji}
                            onChange={(e) => setNewSkillEmoji(e.target.value)}
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500 font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase mb-1">Category</label>
                          <select
                            value={newSkillCat}
                            onChange={(e) => setNewSkillCat(e.target.value as Skill["category"])}
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2 py-1.5 text-white text-xs outline-none focus:border-cyan-500"
                          >
                            <option value="cybersecurity">Cybersecurity</option>
                            <option value="languages">Programming Languages</option>
                            <option value="web-backend">Web & Backend</option>
                            <option value="database-tools">DB & Systems</option>
                            <option value="other">Tools & AI</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase mb-1">Accent Theme</label>
                          <select
                            value={newSkillTheme}
                            onChange={(e) => setNewSkillTheme(e.target.value)}
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2 py-1.5 text-white text-xs outline-none focus:border-cyan-500 capitalize"
                          >
                            <option value="red">Red</option>
                            <option value="pink">Pink</option>
                            <option value="rose">Rose</option>
                            <option value="orange">Orange</option>
                            <option value="amber">Amber</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="emerald">Emerald</option>
                            <option value="teal">Teal</option>
                            <option value="cyan">Cyan</option>
                            <option value="sky">Sky</option>
                            <option value="blue">Blue</option>
                            <option value="indigo">Indigo</option>
                            <option value="purple">Purple</option>
                            <option value="violet">Violet</option>
                            <option value="slate">Slate</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={handleAddSkill}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Insert Skill
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div>
                    <h5 className="text-xs font-bold font-mono text-gray-300 uppercase tracking-widest mb-3">Active Skills List</h5>
                    <div className="divide-y divide-gray-800">
                      {config.skills.map((sk, index) => (
                        <div key={index} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <span className="text-base select-none">{sk.emoji || "✦"}</span>
                            <div>
                              <span className="font-semibold text-white">{sk.name}</span>
                              <span className="ml-2 text-gray-500 uppercase text-[9px] bg-white/5 border border-white/10 px-1 py-0.5 rounded select-none">
                                {sk.category}
                              </span>
                              {sk.theme && (
                                <span className="ml-1 text-[9px] capitalize text-cyan-400 bg-cyan-950/45 px-1 py-0.5 rounded border border-cyan-900/40 select-none">
                                  {sk.theme}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(index)}
                              className="text-gray-500 hover:text-red-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: My Projects */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  {/* Project Add Form */}
                  <div className="p-4 bg-[#1e293b]/40 rounded-xl border border-gray-800">
                    <h5 className="text-xs font-bold font-mono text-gray-300 uppercase tracking-widest mb-3">Add Custom Project Card</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Title</label>
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={newProjTitle}
                          onChange={(e) => setNewProjTitle(e.target.value)}
                          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Description</label>
                        <textarea
                          placeholder="Brief description of the work..."
                          value={newProjDesc}
                          onChange={(e) => setNewProjDesc(e.target.value)}
                          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500 h-16 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase mb-1">Category</label>
                          <select
                            value={newProjCat}
                            onChange={(e) => setNewProjCat(e.target.value)}
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2 py-1.5 text-white text-xs outline-none focus:border-cyan-500"
                          >
                            <option value="cybersecurity">Cybersecurity</option>
                            <option value="web">Web Application</option>
                            <option value="ai">AI / Data Science</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase mb-1">Visual Emoji Link</label>
                          <input
                            type="text"
                            placeholder="e.g. 🔐, 🧠, 🌐"
                            value={newProjIcon}
                            onChange={(e) => setNewProjIcon(e.target.value)}
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500 text-center"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Tags (comma separated)</label>
                        <input
                          type="text"
                          placeholder="Python, Scipy, Docker"
                          value={newProjTags}
                          onChange={(e) => setNewProjTags(e.target.value)}
                          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleAddProject}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Project Card
                      </button>
                    </div>
                  </div>

                  {/* Projects List */}
                  <div>
                    <h5 className="text-xs font-bold font-mono text-gray-300 uppercase tracking-widest mb-3">Custom Projects List</h5>
                    <div className="space-y-2">
                      {config.projects.map((proj) => (
                        <div key={proj.id} className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-xs">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span>{proj.icon}</span>
                              <span className="font-semibold text-white">{proj.title}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 block mt-1 uppercase font-mono">
                              Category: {proj.category}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveProject(proj.id)}
                            className="text-gray-500 hover:text-red-400 p-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Certifications Credentials */}
              {activeTab === "certs" && (
                <div className="space-y-6">
                  {/* Cert Add Form */}
                  <div className="p-4 bg-[#1e293b]/40 rounded-xl border border-gray-800">
                    <h5 className="text-xs font-bold font-mono text-gray-300 uppercase tracking-widest mb-3">Add Custom Certificate Verified</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Title</label>
                        <input
                          type="text"
                          placeholder="e.g. CompTIA Security+, CEH Masters"
                          value={newCertTitle}
                          onChange={(e) => setNewCertTitle(e.target.value)}
                          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase mb-1">Issuer Provider</label>
                          <input
                            type="text"
                            placeholder="EC-Council, Coursera"
                            value={newCertIssuer}
                            onChange={(e) => setNewCertIssuer(e.target.value)}
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase mb-1">Year</label>
                          <input
                            type="text"
                            placeholder="2024"
                            value={newCertYear}
                            onChange={(e) => setNewCertYear(e.target.value)}
                            className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 uppercase mb-1">Credential ID (Optional)</label>
                        <input
                          type="text"
                          placeholder="VERIFY-SEC-1283"
                          value={newCertId}
                          onChange={(e) => setNewCertId(e.target.value)}
                          className="w-full bg-[#1e293b] border border-gray-700 rounded-lg px-2.5 py-1.5 text-white text-xs outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleAddCert}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Certification Card
                      </button>
                    </div>
                  </div>

                  {/* Certifications List */}
                  <div>
                    <h5 className="text-xs font-bold font-mono text-gray-300 uppercase tracking-widest mb-3">Custom Certs List</h5>
                    <div className="space-y-2">
                      {config.certifications.map((crt) => (
                        <div key={crt.id} className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between text-xs">
                          <div>
                            <span className="font-semibold text-white block">{crt.title}</span>
                            <span className="text-[10px] text-gray-400 font-mono mt-0.5">
                              {crt.issuer} ({crt.year})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCert(crt.id)}
                            className="text-gray-500 hover:text-red-400 p-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: Inbox Messages Received panel */}
              {activeTab === "messages" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Contact Received Inbox</h4>
                    {messages.length > 0 && (
                      <button
                        type="button"
                        onClick={onClearMessages}
                        className="text-[10px] font-bold text-rose-400 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear Inbox
                      </button>
                    )}
                  </div>

                  {messages.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl space-y-2">
                      <Mail className="w-8 h-8 text-gray-600 mx-auto" />
                      <p className="text-xs font-semibold text-gray-400 uppercase">Inbox Empty</p>
                      <p className="text-[10px] text-gray-500 max-w-[240px] mx-auto">
                        Submit a mock message in the contact forms on the portfolio screen to test database logging in real time.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div key={msg.id} className="p-4 bg-white/[0.02] border border-gray-800 rounded-xl space-y-2 select-text">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-xs font-semibold text-cyan-300">{msg.name}</p>
                              <a href={`mailto:${msg.email}`} className="text-[10px] text-gray-500 hover:underline">
                                {msg.email}
                              </a>
                            </div>
                            <span className="text-[9px] text-gray-600 font-mono">
                              {msg.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 bg-black/30 p-2.5 rounded border border-gray-900 leading-relaxed font-sans">
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
