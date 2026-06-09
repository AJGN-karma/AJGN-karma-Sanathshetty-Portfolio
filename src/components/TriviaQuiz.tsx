import { useState } from "react";
import { ShieldCheck, ShieldAlert, Award, ArrowRight, RotateCcw } from "lucide-react";

interface TriviaProps {
  onBadgeUnlocked: (badgeName: string) => void;
  hasUnlockedBadge: boolean;
  accentClass: {
    text: string;
    bg: string;
    border: string;
  };
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

const CYBER_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which of the following describes a Man-in-the-Middle (MitM) cybersecurity breach?",
    options: [
      "Overloading a web server with fake HTTP traffic requests",
      "An attacker intercepting and altering communication between two legitimate parties",
      "Gaining unauthorized visual access to a computer screen physically",
      "Generating high numbers of fake passwords in quick succession"
    ],
    correctIdx: 1,
    explanation: "A Man-in-the-Middle (MitM) attack occurs when an unauthorized operator intercepts, modifies, or relays messages between two communicating nodes without their consent."
  },
  {
    id: 2,
    question: "Which of the following cryptographic algorithms is considered cryptographically unstable/insecure due to rapid collision vulnerabilities?",
    options: [
      "AES-256",
      "SHA-256",
      "MD5",
      "RSA-4096"
    ],
    correctIdx: 2,
    explanation: "MD5 (Message-Digest algorithm 5) is widely cracked, and collisions can be generated in seconds, rendering it entirely unfit for cryptographic storage, secure signatures, or encryption integrity checks."
  },
  {
    id: 3,
    question: "Which HTTP security response header is strictly designed to protect clients against modern clickjacking assaults?",
    options: [
      "Strict-Transport-Security (HSTS)",
      "X-Frame-Options (or CSP frame-ancestors)",
      "Access-Control-Allow-Origin (CORS)",
      "X-Content-Type-Options"
    ],
    correctIdx: 1,
    explanation: "X-Frame-Options ensures the page cannot be nested inside iframes on untrusted domains, preventing bad actors from placing transparent interactive overlays over legitimate buttons."
  }
];

export default function TriviaQuiz({ onBadgeUnlocked, hasUnlockedBadge, accentClass }: TriviaProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedIdx(optionIdx);
  };

  const handleVerifyAnswer = () => {
    if (selectedIdx === null || isAnswered) return;
    setIsAnswered(true);

    const activeQuestion = CYBER_QUESTIONS[currentIdx];
    if (selectedIdx === activeQuestion.correctIdx) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextStep = () => {
    if (currentIdx + 1 < CYBER_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const passed = score + (selectedIdx === CYBER_QUESTIONS[currentIdx].correctIdx ? 1 : 0) === CYBER_QUESTIONS.length;
      if (passed) {
        onBadgeUnlocked("Cyber Security Guardian");
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const activeQuestion = CYBER_QUESTIONS[currentIdx];

  return (
    <div className="bg-[#0b1226]/80 p-6 rounded-xl border border-gray-800 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-5 h-5 ${accentClass.text}`} />
          <h4 className="font-bold text-sm text-gray-200">Security Awareness Assessment</h4>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-1 rounded">
          Question {currentIdx + 1} of {CYBER_QUESTIONS.length}
        </span>
      </div>

      {!quizFinished ? (
        <div className="space-y-4">
          <h5 className="font-semibold text-lg text-white leading-relaxed">
            {activeQuestion.question}
          </h5>

          <div className="space-y-2 mt-4">
            {activeQuestion.options.map((opt, oIdx) => {
              let btnStyle = "bg-white/5 border-white/10 hover:bg-white/10 text-slate-300";
              if (selectedIdx === oIdx) {
                btnStyle = "bg-cyan-500/10 border-cyan-400 text-white";
              }
              if (isAnswered) {
                if (oIdx === activeQuestion.correctIdx) {
                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
                } else if (selectedIdx === oIdx) {
                  btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                } else {
                  btnStyle = "bg-white/5 border-white/10 opacity-40 text-slate-400";
                }
              }

              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleOptionSelect(oIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-lg border text-sm font-medium transition-all ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-xs font-mono">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className={`p-4 rounded-lg text-xs leading-relaxed border ${
              selectedIdx === activeQuestion.correctIdx 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-rose-500/10 border-rose-500/30 text-rose-300"
            }`}>
              <div className="font-semibold mb-1 flex items-center gap-1">
                {selectedIdx === activeQuestion.correctIdx ? (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Correct Answer matched!
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    Incorrect Assessment.
                  </>
                )}
              </div>
              <p>{activeQuestion.explanation}</p>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-end gap-3 pt-3">
            {!isAnswered ? (
              <button
                type="button"
                onClick={handleVerifyAnswer}
                disabled={selectedIdx === null}
                className="btn-gradient bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs px-5 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Verify Packet Integrity</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-slate-800 text-white hover:bg-slate-700 text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-1"
              >
                <span>{currentIdx + 1 === CYBER_QUESTIONS.length ? "Analyze Score" : "Next Protocol"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/80 mb-2 border border-cyan-500/30">
            {score === CYBER_QUESTIONS.length ? (
              <Award className="w-8 h-8 text-yellow-400 animate-bounce" />
            ) : (
              <ShieldAlert className="w-8 h-8 text-sky-400" />
            )}
          </div>

          <h5 className="text-xl font-bold text-white">
            Score: {score} / {CYBER_QUESTIONS.length} Correct Matches
          </h5>

          {score === CYBER_QUESTIONS.length ? (
            <div className="space-y-2 max-w-sm mx-auto">
              <p className="text-xs text-yellow-300 font-semibold uppercase tracking-wider">
                🏆 Security Guardian Badge Unlocked!
              </p>
              <p className="text-gray-400 text-xs">
                You passed the custom secure programming & diagnostic benchmark checklist perfectly. You earned a place on Sanath's cybersecurity defense list!
              </p>
              {hasUnlockedBadge && (
                <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-full px-4 py-1 text-xs font-semibold mt-3">
                  🛡️ Cyber Guardian Badge: Active
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2 max-w-sm mx-auto">
              <p className="text-xs text-rose-300 font-semibold uppercase tracking-wider">
                Benchmark Failed.
              </p>
              <p className="text-gray-400 text-xs">
                Requires 100% precision score to achieve Security Guard status badge. Learn from the diagnostics explanations and retry the sweep!
              </p>
              <button
                type="button"
                onClick={restartQuiz}
                className="mt-2 font-mono text-xs text-cyan-400 hover:underline flex items-center gap-1 justify-center mx-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry Challenge Protocol</span>
              </button>
            </div>
          )}

          {score !== CYBER_QUESTIONS.length && (
            <button
              type="button"
              onClick={restartQuiz}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2 rounded-lg mt-4"
            >
              Restart Quiz
            </button>
          )}
        </div>
      )}
    </div>
  );
}
