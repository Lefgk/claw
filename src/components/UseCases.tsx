const cases = [
  {
    emoji: "🤖",
    title: "Trading Bot",
    difficulty: "Moderate",
    description:
      "An agent that executes DeFi trades on your behalf — swaps, yield farming, arbitrage. Register it on-chain so users can verify who built it and check its track record before sending funds.",
    howItWorks:
      "A Python or Node.js script connects to PulseX / a DEX via its SDK. It monitors prices, decides when to swap or compound LP rewards, and submits transactions from its registered wallet. Runs 24/7 on a server or cloud function.",
    whatYouNeed: [
      "Python or JavaScript",
      "DEX SDK (PulseX / Uniswap V2 router)",
      "A server or cron job (Railway, AWS Lambda)",
      "Strategy logic (when to buy/sell/compound)",
    ],
    example: "e.g. auto-compound PulseX LP rewards every 12 hours",
  },
  {
    emoji: "🛡️",
    title: "Security Monitor",
    difficulty: "Advanced",
    description:
      "An agent that watches PulseChain contracts for suspicious activity — ownership transfers, large drains, permission changes — and posts public alerts. Builds reputation as it catches threats early.",
    howItWorks:
      "Subscribes to new blocks via a WebSocket RPC. Parses each transaction, looking for known red flags (renounced ownership restored, liquidity removed, proxy upgrades). Posts alerts to Telegram/Discord and logs them on-chain via its identity.",
    whatYouNeed: [
      "WebSocket RPC endpoint for PulseChain",
      "Transaction parsing logic (ethers.js / viem)",
      "Alert destination (Telegram bot API, Discord webhook)",
      "A list of known exploit patterns to detect",
    ],
    example: "e.g. flag any PulseChain token where >50% of liquidity is removed in one tx",
  },
  {
    emoji: "📊",
    title: "Portfolio Manager",
    difficulty: "Moderate",
    description:
      "An AI that rebalances a crypto portfolio based on target allocations or market signals. Users check its on-chain identity and reputation before trusting it with their strategy.",
    howItWorks:
      "Reads current wallet balances, compares to target allocation (e.g. 40% PLS, 30% PLSX, 30% HEX), and swaps the overweight tokens for underweight ones via a DEX router. Can run daily or triggered by price thresholds.",
    whatYouNeed: [
      "DEX integration (swap router contract calls)",
      "Price feed (CoinGecko API or on-chain oracle)",
      "Rebalancing logic (threshold-based or time-based)",
      "Cron job or scheduler",
    ],
    example: "e.g. rebalance a PLS/PLSX/HEX portfolio to equal weight every Monday",
  },
  {
    emoji: "💬",
    title: "Customer Support Bot",
    difficulty: "Easy",
    description:
      "A chatbot that handles support for a DApp or protocol. Register it on-chain so users can verify it's the official agent — not a scam impersonator. The community rates its helpfulness via reputation.",
    howItWorks:
      "An LLM (ChatGPT, Claude) with a system prompt containing your protocol's docs. Connected to Telegram or Discord via their bot APIs. The on-chain identity NFT proves this is the real, authorized bot.",
    whatYouNeed: [
      "LLM API key (OpenAI, Anthropic, or open-source)",
      "Telegram Bot API or Discord bot token",
      "Your protocol's documentation as context",
      "Basic hosting (even a free tier works)",
    ],
    example: "e.g. a Telegram bot that answers questions about your DEX — verified on-chain",
  },
  {
    emoji: "📡",
    title: "Oracle / Data Feed",
    difficulty: "Advanced",
    description:
      "An agent that fetches off-chain data (prices, weather, sports) and posts it on-chain. Validators verify its accuracy through the Validation Registry, building provable trust.",
    howItWorks:
      "Fetches data from APIs (CoinGecko, OpenWeather, etc.) on a schedule. Formats the data and writes it to a smart contract on PulseChain. Other contracts can then read this data. Multiple validators can independently check its accuracy.",
    whatYouNeed: [
      "Data source APIs",
      "An on-chain storage contract (simple key-value or feed contract)",
      "Scheduled runner (cron, Chainlink Keepers equivalent)",
      "Enough PLS for gas on each update",
    ],
    example: "e.g. post the PLS/USD price every 5 minutes, verified by 3 independent validators",
  },
  {
    emoji: "🎨",
    title: "Content Creator Agent",
    difficulty: "Easy-Moderate",
    description:
      "An AI that generates NFT art, music, or written content. The on-chain identity proves exactly which model created a piece, and collectors can verify authorship forever.",
    howItWorks:
      "A generative model (Stable Diffusion, DALL-E, etc.) creates content based on prompts or schedules. The output is uploaded to IPFS, and an NFT is minted pointing to it. The agent's ERC-8004 identity links all its creations to a single verified author.",
    whatYouNeed: [
      "Generative AI model (local or API)",
      "IPFS upload (Pinata, nft.storage)",
      "NFT minting contract on PulseChain",
      "A prompt strategy or content pipeline",
    ],
    example: "e.g. mint one AI-generated PulseChain-themed artwork per day",
  },
  {
    emoji: "🔄",
    title: "Airdrop / Task Agent",
    difficulty: "Easy",
    description:
      "An agent that auto-claims airdrops, harvests rewards, or votes in governance on your behalf. Its on-chain identity proves it's your authorized agent acting with your permission.",
    howItWorks:
      "A script that calls claim/harvest functions on reward contracts at regular intervals. Can also cast governance votes based on predefined rules. Runs as a cron job and uses the agent's registered wallet to submit transactions.",
    whatYouNeed: [
      "Contract ABIs for the reward/governance contracts",
      "A scheduled runner (cron, serverless function)",
      "Claim logic (which rewards, how often)",
      "Small PLS balance for gas fees",
    ],
    example: "e.g. auto-claim staking rewards from 5 PulseChain protocols every day",
  },
  {
    emoji: "🧠",
    title: "AI Research Analyst",
    difficulty: "Moderate",
    description:
      "An agent that analyzes tokens, protocols, or market trends and publishes reports. Users rate its predictions via the Reputation Registry — over time, the good analysts stand out.",
    howItWorks:
      "An LLM reads on-chain data (token holders, liquidity, transactions) plus off-chain signals (Twitter sentiment, news). It generates analysis reports, publishes them to IPFS or a website, and links them from its agent metadata. Users leave feedback on accuracy.",
    whatYouNeed: [
      "LLM API for analysis generation",
      "On-chain data source (RPC calls, subgraph, Dune-like API)",
      "Publishing pipeline (IPFS, blog, or social media API)",
      "Prompt engineering for consistent analysis quality",
    ],
    example: "e.g. weekly PulseChain ecosystem report with token ratings — tracked on-chain",
  },
];

export default function UseCases() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold text-white text-center mb-3">
        What Kind of Agent Can You Build?
      </h2>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-4">
        ERC-8004 works with any autonomous software agent. The agent is a
        program that runs off-chain (your server, a cloud function, etc.) —
        the standard just gives it a verifiable on-chain identity.
      </p>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
        Here are real ideas you can build today — or{" "}
        <a
          href="https://t.me/Lefkk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 underline underline-offset-2"
        >
          DM me
        </a>{" "}
        and I&apos;ll build one for you.
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {cases.map((c) => (
          <div
            key={c.title}
            className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4 hover:border-violet-500/30 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{c.emoji}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {c.title}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    c.difficulty === "Easy"
                      ? "bg-green-500/20 text-green-400"
                      : c.difficulty === "Easy-Moderate"
                        ? "bg-green-500/20 text-green-300"
                        : c.difficulty === "Moderate"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {c.difficulty}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {c.description}
            </p>

            <details className="group">
              <summary className="text-sm text-violet-400 cursor-pointer hover:text-violet-300 flex items-center gap-1">
                How does it actually work?
                <span className="group-open:rotate-90 transition-transform">
                  &rarr;
                </span>
              </summary>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                {c.howItWorks}
              </p>
            </details>

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                What you need
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                {c.whatYouNeed.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-violet-500 mt-1 shrink-0">
                      &bull;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-violet-400/60 italic mt-auto">
              {c.example}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-violet-900/20 to-purple-900/20 border border-violet-500/20 rounded-2xl p-6 md:p-8 text-center">
        <h3 className="text-lg font-semibold text-white mb-3">
          Don&apos;t want to build it yourself?
        </h3>
        <p className="text-gray-300 mb-4">
          I can build and register an agent for you — from the off-chain logic
          to the on-chain identity. Just tell me what you need.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://x.com/GLordskotostras"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2.5 rounded-lg transition text-sm"
          >
            Twitter / X
          </a>
          <a
            href="https://t.me/Lefkk"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-2.5 rounded-lg transition text-sm"
          >
            Telegram
          </a>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        These are just starting points — any software that acts autonomously
        can benefit from a verifiable on-chain identity.
      </p>
    </section>
  );
}
