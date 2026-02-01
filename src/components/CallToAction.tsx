"use client";

import { useState } from "react";
import ConnectAndRegister from "./ConnectAndRegister";
import { GITHUB_REPO } from "@/config/contracts";

const TWITTER_PROFILE = "https://x.com/GLordskotostras";
const TELEGRAM = "https://t.me/Lefkk";

export default function CallToAction() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        Get Involved
      </h2>
      <p className="text-gray-400 text-center max-w-xl mx-auto mb-8">
        Want an AI agent registered on PulseChain? DM me and I&apos;ll help
        you set it up.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setShowRegister((v) => !v)}
          className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          {showRegister ? "Hide Form" : "Register an Agent"}
        </button>
        <a
          href={`${GITHUB_REPO}#readme`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          Deploy Your Own
        </a>
        <a
          href={TWITTER_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          Twitter / X
        </a>
        <a
          href={TELEGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          Telegram
        </a>
        <a
          href={`${GITHUB_REPO}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          Contribute
        </a>
      </div>

      {showRegister && <ConnectAndRegister />}
    </section>
  );
}
