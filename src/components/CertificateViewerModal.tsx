import React from "react";
import { motion } from "motion/react";
import { X, FileText, ExternalLink, Download, FileCheck, ShieldCheck, AlertCircle } from "lucide-react";
import { Certification } from "../types";

interface CertificateViewerModalProps {
  certification: Certification;
  candidateName: string;
  onClose: () => void;
}

export default function CertificateViewerModal({ certification, candidateName, onClose }: CertificateViewerModalProps) {
  const isPdf = certification.fileUrl?.endsWith(".pdf");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0b1120] border border-gray-800 w-full max-w-4xl rounded-2xl flex flex-col md:flex-row shadow-2xl relative overflow-hidden max-h-[90vh]"
      >
        {/* Left Hand Details Column */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-800 p-6 flex flex-col justify-between bg-[#070c18] shrink-0">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl bg-cyan-500/10 p-2 rounded-xl border border-cyan-500/20">{certification.icon}</span>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Authority</span>
                <span className="font-bold text-white text-sm font-sans tracking-wide block">{certification.issuer}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white leading-snug">{certification.title}</h3>
              <p className="text-xs text-gray-400 font-mono">Issued to: {candidateName}</p>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-gray-500">
                <span className="bg-[#121b2d] border border-gray-800 px-2 py-0.5 rounded">Year: {certification.year}</span>
                <span className="bg-[#121b2d] border border-gray-800 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Active Ledger
                </span>
              </div>
            </div>

            <div className="bg-[#101726] border border-gray-800 p-4 rounded-xl space-y-3">
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block font-bold">// Verification ID</span>
              <p className="text-xs font-mono text-cyan-400 font-semibold break-all bg-black/30 p-2 rounded border border-gray-900">
                {certification.credentialId}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block font-bold">Skills Audited</span>
              <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                {certification.skillsVerified.map((sk, id) => (
                  <span
                    key={id}
                    className="bg-cyan-950/20 border border-cyan-900/30 text-cyan-400 text-[9px] px-2 py-0.5 rounded font-mono"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 space-y-3 mt-6">
            <a
              href={certification.fileUrl}
              download
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File Link</span>
            </a>
            {certification.id === "cert-1" ? (
              <a
                href="https://talfor.in/certificate-verification"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#121929] hover:bg-[#19233a] border border-gray-800 text-cyan-400 py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all font-semibold"
              >
                <span>Validate Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : certification.id === "cert-2" ? (
              <a
                href="https://www.credly.com/badges/76ef51fb-b6b5-4b05-af5f-9fc42ccc11cc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#121929] hover:bg-[#19233a] border border-gray-800 text-cyan-400 py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all font-semibold"
              >
                <span>Validate Credly Banner</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>
        </div>

        {/* Right Hand Viewer Area */}
        <div className="flex-1 p-6 flex flex-col bg-[#050810] min-h-[300px] md:min-h-none overflow-y-auto">
          {/* Top Panel Actions */}
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-900">
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-cyan-500" />
              Certificate File Viewer
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 hover:bg-white/10 hover:text-white text-gray-400 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Render target file with elegant dummy fallback logic */}
          <div className="flex-1 flex items-center justify-center relative rounded-xl border border-gray-900 bg-slate-950/60 p-2 overflow-hidden min-h-[360px]">
            {isPdf ? (
              <div className="w-full h-full flex flex-col justify-between p-4 min-h-[380px]">
                {/* Simulated frame / Live view attempts */}
                <iframe
                  src={certification.fileUrl}
                  title={certification.title}
                  className="w-full h-[400px] border-none rounded-lg bg-[#0c1222]"
                  onError={(e) => {
                    console.log("PDF loading fallback activated");
                  }}
                />

                {/* Clear instructions informing them of the filename and how they replace it with their own original */}
                <div className="mt-4 p-4 rounded-xl border border-dashed border-cyan-500/30 bg-[#0d1425]/90 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono">DUMMY TEMPLATE FOR PDF EMBED</h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        To replace this placeholder with your physical PDF certificate, simply place your original PDF inside the project's <span className="text-cyan-400 font-semibold font-mono">public/certificates/</span> folder using this exact file name:
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-2 rounded-lg border border-gray-800 flex justify-between items-center text-xs text-emerald-400 font-mono">
                    <span>{certification.fileUrl}</span>
                    <span className="text-[10px] text-gray-500 font-normal uppercase">PDF Format</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col justify-between p-4">
                <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
                  <img
                    src={certification.fileUrl}
                    alt={certification.title}
                    className="max-w-full max-h-[280px] object-contain rounded-lg shadow-xl"
                    onError={(e) => {
                      // Fallback dummy styling since they haven't uploaded their actual jpg yet
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallbackDiv = parent.querySelector(".img-fallback");
                        if (fallbackDiv) {
                          fallbackDiv.classList.remove("hidden");
                        }
                      }
                    }}
                  />
                  <div className="img-fallback hidden w-full p-6 text-center space-y-4">
                    <span className="text-5xl block select-none">📷</span>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-300 font-sans">Certificate Image File Found (Pending Upload)</p>
                      <p className="text-xs text-gray-500">The file will be loaded from the public certificates directory</p>
                    </div>
                  </div>
                </div>

                {/* Instruction container */}
                <div className="mt-4 p-4 rounded-xl border border-dashed border-cyan-500/30 bg-[#0d1425]/90 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono">DUMMY TEMPLATE FOR IMAGE FORMAT</h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        To replace this placeholder with your physical image certificate, simply place your original JPG/PNG image file inside the <span className="text-cyan-400 font-semibold font-mono">public/certificates/</span> folder using this exact file name:
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-black/40 p-2 rounded-lg border border-gray-800 flex justify-between items-center text-xs text-emerald-400 font-mono">
                    <span>{certification.fileUrl}</span>
                    <span className="text-[10px] text-gray-500 font-normal uppercase">Image Format</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
