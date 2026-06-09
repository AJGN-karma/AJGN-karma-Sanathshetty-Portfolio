import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, ShieldAlert, Cpu } from "lucide-react";
import { ProfileConfig } from "../types";

interface TerminalProps {
  config: ProfileConfig;
  onClearanceUnlocked?: () => void;
  accentClass: {
    text: string;
    bg: string;
    border: string;
    shadow: string;
  };
}

interface CommandLog {
  text: string;
  type: "input" | "info" | "success" | "error" | "output" | "system";
}

export default function Terminal({ config, onClearanceUnlocked, accentClass }: TerminalProps) {
  const [history, setHistory] = useState<CommandLog[]>([
    { text: "=== CYBERSECURITY SHELL v2.8 ===", type: "system" },
    { text: "Type 'help' to see list of available directives", type: "info" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isHacking, setIsHacking] = useState(false);
  const [hackProgress, setHackProgress] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, hackProgress]);

  const runHackSimulation = async () => {
    setIsHacking(true);
    setHackProgress([]);
    
    const logs = [
      "[*] Initiating vulnerability assessment of network gateway...",
      "[*] Resolving root targets: " + window.location.hostname,
      "[*] Establishing encrypted tunnel via shadowsocks-proxy...",
      "[!] WARNING: Target contains active cloudfire firewalls.",
      "[*] Deploying fuzzing payload to port 443 & 3000...",
      "[*] SUCCESS: Port 3000 (Local App Host) responded with 'OK'",
      "[*] Extracting system environment parameters...",
      "[*] VITE_DEV_SERVER: TRUE",
      "[*] PLATFORM: Google AI Studio Sandbox Engine",
      "[*] FRAME_PERMISSIONS: Allowed",
      "[*] Injecting memory-bypass payload...",
      "[+] DECRYPTING DATABASE CREDENTIALS...",
      "[-] STATUS: 100% COMPLETE. DECRYPTION KEY FOUND.",
      "[+] GREETINGS VISITOR! You have successfully simulated a secure access diagnostic check."
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i === 3 || i === 11 ? 550 : 250));
      setHackProgress(prev => [...prev, logs[i]]);
    }
    
    setIsHacking(false);
    setHistory(prev => [
      ...prev,
      { text: "cyber@shell:~$ hack", type: "input" },
      { text: "Diagnostic finished successfully. View details in custom interactive outputs.", type: "success" }
    ]);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim().toLowerCase();
    if (!command) return;

    let response: CommandLog[] = [];
    response.push({ text: `cyber@shell:~$ ${inputValue}`, type: "input" });

    switch (command) {
      case "help":
        response.push(
          { text: "Available security and profile commands:", type: "info" },
          { text: "  about    - Fetch candidate mission outline and bio statement", type: "output" },
          { text: "  skills   - Execute diagnostics on active technical stack levels", type: "output" },
          { text: "  projects - Catalog active repositories and software builds", type: "output" },
          { text: "  hack     - Trigger high-contrast automated diagnostic vulnerability run", type: "output" },
          { text: "  sudo bypass - Access system override clearances", type: "output" },
          { text: "  clear    - Clear display terminal history logs", type: "output" }
        );
        break;
      case "about":
        response.push(
          { text: `Profile Identity: ${config.student_name}`, type: "info" },
          { text: `Academic Focus: ${config.about_text}`, type: "output" },
          { text: `Goal: Seeking cybersecurity & engineering apprenticeships / roles.`, type: "success" }
        );
        break;
      case "skills":
        response.push({ text: "ACTIVE HARDWARE & SOFTWARE DIAGNOSTICS:", type: "info" });
        config.skills.forEach(sk => {
          const emoji = sk.emoji || "✦";
          response.push({ text: `  ${emoji}  ${sk.name.padEnd(30)} | Block: ${sk.category.toUpperCase()}`, type: "output" });
        });
        break;
      case "projects":
        response.push({ text: "FEATURED DIGITAL ARTIFACTS:", type: "info" });
        config.projects.forEach(p => {
          response.push({ text: `  ▸ ${p.title} - ${p.description.substring(0, 50)}...`, type: "output" });
          response.push({ text: `    Tags: [${p.tags.join(", ")}]`, type: "system" });
        });
        break;
      case "sudo bypass":
        response.push(
          { text: "[!] OVERRIDE DETECTED. BYPASSING STANDARD PERMISSIONS PROTOCOLS...", type: "error" },
          { text: "[+] ACCESS GRANTED. Administrative clearances unlocked!", type: "success" },
          { text: "[*] Special UI Theme variant 'Solar Gold Override' enabled implicitly.", type: "info" }
        );
        if (onClearanceUnlocked) {
          onClearanceUnlocked();
        }
        break;
      case "clear":
        setHistory([]);
        setInputValue("");
        return;
      case "hack":
        setInputValue("");
        runHackingInterface();
        return;
      default:
        response.push({ text: `Command not found: '${command}'. Type 'help' for directions.`, type: "error" });
    }

    setHistory(prev => [...prev, ...response]);
    setInputValue("");
  };

  const runHackingInterface = () => {
    runHackSimulation();
  };

  return (
    <div className="bg-[#040814] border border-gray-800 rounded-xl overflow-hidden font-mono text-sm shadow-2xl relative">
      {/* Window Header */}
      <div className="bg-[#0b1226] px-4 py-2 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className={`w-4 h-4 ${accentClass.text}`} />
          <span className="text-gray-400 text-xs font-semibold">interactive-cyber-shell.sh</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-4 h-[350px] overflow-y-auto space-y-2 flex flex-col justify-between">
        <div className="space-y-1.5 flex-1 select-text">
          {history.map((log, index) => (
            <div key={index} className="leading-relaxed">
              {log.type === "input" && (
                <span className="text-cyan-400">{log.text}</span>
              )}
              {log.type === "info" && (
                <span className="text-sky-300 font-semibold">{log.text}</span>
              )}
              {log.type === "success" && (
                <span className="text-emerald-400 font-semibold">{log.text}</span>
              )}
              {log.type === "error" && (
                <span className="text-rose-400 font-semibold">{log.text}</span>
              )}
              {log.type === "output" && (
                <span className="text-slate-300">{log.text}</span>
              )}
              {log.type === "system" && (
                <span className="text-gray-500 text-xs">{log.text}</span>
              )}
            </div>
          ))}

          {/* Hack sequence simulation rendering */}
          {isHacking && (
            <div className="space-y-1 mt-4 p-3 bg-cyan-950/20 border border-cyan-500/30 rounded text-cyan-300 max-h-[220px] overflow-y-auto">
              <div className="flex items-center gap-2 mb-2 pb-1 border-b border-cyan-500/20">
                <ShieldAlert className="w-4 h-4 animate-flash text-cyan-400" />
                <span className="text-xs font-bold font-mono">AUTOMATED NETWORK PENETRATION REPORT</span>
              </div>
              {hackProgress.map((pLine, iIdx) => (
                <div key={iIdx} className="text-xs">
                  {pLine}
                </div>
              ))}
              <div className="flex items-center gap-2 text-xs text-cyan-400">
                <Cpu className="w-3.5 h-3.5 animate-spin" />
                <span>Executing payload scanner...</span>
              </div>
            </div>
          )}
        </div>

        {/* Console Prompt */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-gray-900 pt-3 mt-2">
          <span className={`${accentClass.text} font-bold`}>cyber@shell:~$</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type 'help', 'skills', 'hack' or 'sudo bypass'..."
            disabled={isHacking}
            className="flex-1 bg-transparent border-none text-white font-mono text-sm outline-none placeholder-gray-600 focus:ring-0"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
