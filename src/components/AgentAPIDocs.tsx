"use client";

import { useState } from "react";

const BASE_URL = "https://claw-kappa-three.vercel.app";

type AgentDoc = {
  id: number;
  name: string;
  description: string;
  endpoint: string;
  exampleResponse: string;
  marketExample: string;
};

const AGENTS: AgentDoc[] = [
  {
    id: 1,
    name: "PulseChain Price Oracle",
    description: "Returns live prices, 24h change, liquidity, and volume for PLS, PLSX, HEX, INC, and DAI.",
    endpoint: "/api/agents/1",
    exampleResponse: `{
  "agent": "PulseChain Price Oracle",
  "agentId": 1,
  "data": [
    { "symbol": "PLS", "priceUsd": "0.000021", "priceChange24h": -3.2, "liquidity": 850000 },
    { "symbol": "HEX", "priceUsd": "0.0045", "priceChange24h": 1.8, "liquidity": 420000 }
  ],
  "fetchedAt": "2025-06-01T12:00:00Z"
}`,
    marketExample: 'Will PLS price be above $0.00003 by end of month?',
  },
  {
    id: 2,
    name: "Gas & Network Monitor",
    description: "Returns current gas price, latest block, base fee, transaction count, and network utilization.",
    endpoint: "/api/agents/2",
    exampleResponse: `{
  "agent": "Gas & Network Monitor",
  "agentId": 2,
  "data": {
    "gasPriceGwei": "20.5000",
    "latestBlock": 21500000,
    "utilization": "45.20%",
    "transactionsInBlock": 120
  },
  "fetchedAt": "2025-06-01T12:00:00Z"
}`,
    marketExample: 'Will PulseChain gas stay below 50 Gwei this week?',
  },
  {
    id: 3,
    name: "Bridge & Liquidity Watcher",
    description: "Returns top 15 PulseChain pools ranked by liquidity, plus total TVL and 24h volume.",
    endpoint: "/api/agents/3",
    exampleResponse: `{
  "agent": "Bridge & Liquidity Watcher",
  "agentId": 3,
  "data": {
    "topPools": [{ "pair": "WPLS/DAI", "liquidity": 1200000, "volume24h": 300000 }],
    "totalLiquidityUsd": 5000000,
    "totalVolume24h": 1200000
  },
  "fetchedAt": "2025-06-01T12:00:00Z"
}`,
    marketExample: 'Will PulseChain total DEX liquidity exceed $10M?',
  },
  {
    id: 4,
    name: "Crypto Fear & Greed Index",
    description: "Returns today's Fear & Greed value (0-100), classification, and 7-day history.",
    endpoint: "/api/agents/4",
    exampleResponse: `{
  "agent": "Crypto Fear & Greed Index",
  "agentId": 4,
  "data": {
    "value": 72,
    "classification": "Greed",
    "history7d": [{ "value": 65, "classification": "Greed", "date": "2025-05-25" }]
  },
  "fetchedAt": "2025-06-01T12:00:00Z"
}`,
    marketExample: 'Will Fear & Greed stay above 50 for 7 consecutive days?',
  },
  {
    id: 5,
    name: "Crypto Global Market Stats",
    description: "Returns total market cap, BTC/ETH dominance, 24h volume, top gainers and losers.",
    endpoint: "/api/agents/5",
    exampleResponse: `{
  "agent": "Crypto Global Market Stats",
  "agentId": 5,
  "data": {
    "totalMarketCapUsd": 2500000000000,
    "btcDominance": 52.3,
    "ethDominance": 17.1,
    "topGainers": [{ "symbol": "SOL", "change24h": 8.5 }]
  },
  "fetchedAt": "2025-06-01T12:00:00Z"
}`,
    marketExample: 'Will BTC dominance drop below 50% this quarter?',
  },
  {
    id: 6,
    name: "Weather Oracle",
    description: "Returns current temperature, humidity, wind speed, and conditions for 8 major cities.",
    endpoint: "/api/agents/6",
    exampleResponse: `{
  "agent": "Weather Oracle",
  "agentId": 6,
  "data": [
    { "city": "New York", "temperature": 22.5, "humidity": 60, "weatherDescription": "Partly cloudy" },
    { "city": "Tokyo", "temperature": 28.1, "humidity": 75, "weatherDescription": "Clear sky" }
  ],
  "fetchedAt": "2025-06-01T12:00:00Z"
}`,
    marketExample: 'Will NYC temperature exceed 35\u00B0C this week?',
  },
  {
    id: 7,
    name: "Sports Scores & Events",
    description: "Returns recent results and upcoming fixtures across EPL, Serie A, La Liga, NBA, NFL, and NHL.",
    endpoint: "/api/agents/7",
    exampleResponse: `{
  "agent": "Sports Scores & Events",
  "agentId": 7,
  "data": {
    "live": [{ "homeTeam": "Arsenal", "awayTeam": "Chelsea", "homeScore": 2, "awayScore": 1 }],
    "upcoming": [{ "homeTeam": "Lakers", "awayTeam": "Celtics", "date": "2025-06-05" }]
  },
  "fetchedAt": "2025-06-01T12:00:00Z"
}`,
    marketExample: 'Will Arsenal finish in the top 4 this season?',
  },
];

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative">
      <button
        onClick={copy}
        className="absolute top-2 right-2 text-xs text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="bg-black/40 border border-white/10 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto">
        <code>
          <span className="text-gray-500">// {language}</span>
          {"\n"}
          {code}
        </code>
      </pre>
    </div>
  );
}

function AgentDocCard({ agent }: { agent: AgentDoc }) {
  const [expanded, setExpanded] = useState(false);
  const fullUrl = `${BASE_URL}${agent.endpoint}`;

  const curlSnippet = `curl ${fullUrl}`;
  const fetchSnippet = `const res = await fetch("${fullUrl}");
const data = await res.json();
console.log(data);`;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-violet-500/30 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
          <p className="text-gray-400 text-sm mt-1">{agent.description}</p>
        </div>
        <span className="shrink-0 text-xs font-mono text-gray-500">
          #{agent.id}
        </span>
      </div>

      {/* Endpoint */}
      <div>
        <p className="text-xs uppercase text-gray-500 mb-1">Endpoint</p>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-violet-400 hover:underline break-all"
        >
          GET {agent.endpoint}
        </a>
      </div>

      {/* Quick curl */}
      <CodeBlock code={curlSnippet} language="bash" />

      <button
        onClick={() => setExpanded((v) => !v)}
        className="text-sm text-violet-400 hover:text-violet-300 transition"
      >
        {expanded ? "Hide details" : "Show fetch() snippet & example response"}
      </button>

      {expanded && (
        <div className="space-y-4">
          <CodeBlock code={fetchSnippet} language="JavaScript" />

          <div>
            <p className="text-xs uppercase text-gray-500 mb-1">
              Example Response (abbreviated)
            </p>
            <pre className="bg-black/40 border border-white/10 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto">
              {agent.exampleResponse}
            </pre>
          </div>

          <div className="bg-violet-600/10 border border-violet-500/20 rounded-lg p-3">
            <p className="text-xs uppercase text-violet-400 mb-1">
              Prediction Market Example
            </p>
            <p className="text-sm text-gray-300 italic">
              &ldquo;{agent.marketExample}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AgentAPIDocs() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold text-white text-center mb-3">
        How to Use These Agents
      </h2>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
        Each agent serves live offchain data via a public API endpoint, refreshed
        every hour. No authentication required &mdash; just{" "}
        <code className="text-violet-400 text-sm">fetch()</code> the URL from
        any app, script, or contract resolver.
      </p>

      <div className="max-w-4xl mx-auto grid gap-6 mb-12">
        {AGENTS.map((agent) => (
          <AgentDocCard key={agent.id} agent={agent} />
        ))}
      </div>

      {/* General integration notes */}
      <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Integration Notes</h3>
        <ul className="text-sm text-gray-300 space-y-2 list-disc list-inside">
          <li>
            All endpoints return <strong className="text-white">JSON</strong>{" "}
            with a consistent shape:{" "}
            <code className="text-violet-400">
              {"{ agent, agentId, data, fetchedAt }"}
            </code>
          </li>
          <li>
            <strong className="text-white">No API key</strong> or
            authentication needed &mdash; endpoints are fully public
          </li>
          <li>
            Data refreshes every <strong className="text-white">hour</strong>;
            responses include a <code className="text-violet-400">fetchedAt</code>{" "}
            timestamp so you know when data was last updated
          </li>
          <li>
            Use from anywhere:{" "}
            <code className="text-violet-400">fetch()</code> in a browser,{" "}
            <code className="text-violet-400">curl</code> from a terminal,{" "}
            or read from a smart contract resolver via an offchain oracle
            pattern
          </li>
          <li>
            Ideal for <strong className="text-white">prediction market resolution</strong>:
            point your resolver contract or script at any endpoint to get
            verifiable, timestamped data for settling bets
          </li>
        </ul>
      </div>
    </section>
  );
}
