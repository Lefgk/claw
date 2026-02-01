const cases = [
  {
    emoji: "🤖",
    title: "Trading Bot",
    description:
      "An agent that executes DeFi trades on your behalf — swaps, yield farming, arbitrage. Register it on-chain so users can verify who built it, check its track record via reputation scores, and confirm its wallet address before sending funds.",
    example: "e.g. an auto-compounding agent for PulseX LP positions",
  },
  {
    emoji: "🛡️",
    title: "Security Monitor",
    description:
      "An agent that watches smart contracts for suspicious activity — rug pulls, unusual transfers, permission changes. It posts alerts and builds reputation as it catches threats early.",
    example: "e.g. a PulseChain contract monitor that flags risky tokens",
  },
  {
    emoji: "📊",
    title: "Portfolio Manager",
    description:
      "An AI agent that rebalances a crypto portfolio based on market conditions. Users can check its on-chain identity and past performance before trusting it with their strategy.",
    example: "e.g. a risk-adjusted PLS/PLSX/HEX rebalancer",
  },
  {
    emoji: "💬",
    title: "Customer Support Agent",
    description:
      "A chatbot that handles support for a DApp or protocol. Register it so users know it's the official agent (not a scam impersonator). Reputation feedback lets the community rate its helpfulness.",
    example: "e.g. an on-chain verified support bot for a DEX",
  },
  {
    emoji: "📡",
    title: "Oracle / Data Feed",
    description:
      "An agent that fetches off-chain data (prices, weather, sports scores) and posts it on-chain. Validators can verify its accuracy through the Validation Registry, building trust over time.",
    example: "e.g. a PLS/USD price feed verified by multiple validators",
  },
  {
    emoji: "🎨",
    title: "Content Creator Agent",
    description:
      "An AI that generates NFT art, music, or written content. Register it so collectors know exactly which AI model created a piece. The identity NFT proves authorship on-chain.",
    example: "e.g. a generative art agent with a verified on-chain portfolio",
  },
  {
    emoji: "🔄",
    title: "Airdrop / Task Agent",
    description:
      "An agent that automates claiming airdrops, completing on-chain tasks, or participating in governance votes on your behalf. Its identity proves it's your authorized agent.",
    example: "e.g. an auto-claimer for PulseChain ecosystem rewards",
  },
  {
    emoji: "🧠",
    title: "AI Advisor",
    description:
      "A research agent that analyzes tokens, protocols, or market trends and publishes reports. Users rate its predictions via the Reputation Registry so you can see who's actually accurate.",
    example: "e.g. an on-chain rated crypto analyst with a public track record",
  },
];

export default function UseCases() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold text-white text-center mb-3">
        What Kind of Agent Can You Build?
      </h2>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
        ERC-8004 works with any autonomous agent. Here are real ideas you can
        build today — or{" "}
        <a
          href="https://t.me/Lefkk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 underline underline-offset-2"
        >
          DM me
        </a>{" "}
        and I&apos;ll help you set one up.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {cases.map((c) => (
          <div
            key={c.title}
            className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-violet-500/30 transition"
          >
            <div className="text-3xl">{c.emoji}</div>
            <h3 className="text-base font-semibold text-white">{c.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed flex-1">
              {c.description}
            </p>
            <p className="text-xs text-violet-400/70 italic">{c.example}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        These are just starting points — any software agent that acts
        autonomously can benefit from a verifiable on-chain identity.
      </p>
    </section>
  );
}
