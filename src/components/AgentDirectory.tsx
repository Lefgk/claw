"use client";

import { useAgents, type Agent } from "@/lib/hooks";

function truncate(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function AgentCard({ agent }: { agent: Agent }) {
  const m = agent.metadata;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-violet-500/30 transition">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {m?.name ?? `Agent #${agent.id.toString()}`}
          </h3>
          {m?.category && (
            <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-violet-600/30 text-violet-300">
              {m.category}
            </span>
          )}
        </div>
        <span className="shrink-0 text-xs font-mono text-gray-500">
          #{agent.id.toString()}
        </span>
      </div>

      {/* Description */}
      {m?.description && (
        <p className="text-gray-300 text-sm leading-relaxed">
          {m.description}
        </p>
      )}

      {/* Capabilities */}
      {m?.capabilities && m.capabilities.length > 0 && (
        <div>
          <p className="text-xs uppercase text-gray-500 mb-2">Capabilities</p>
          <div className="flex flex-wrap gap-1.5">
            {m.capabilities.map((c) => (
              <span
                key={c}
                className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Data Sources */}
      {m?.data_sources && m.data_sources.length > 0 && (
        <div>
          <p className="text-xs uppercase text-gray-500 mb-2">Data Sources</p>
          <ul className="text-xs text-gray-400 list-disc list-inside space-y-0.5">
            {m.data_sources.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500 pt-2 border-t border-white/5">
        {m?.update_frequency && <span>Updates: {m.update_frequency}</span>}
        {m?.version && <span>v{m.version}</span>}
        {m?.chain && <span>{m.chain}</span>}
      </div>

      {/* On-chain info */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
        <span>
          Owner:{" "}
          <a
            href={`https://scan.pulsechain.com/address/${agent.owner}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:underline font-mono"
          >
            {truncate(agent.owner)}
          </a>
        </span>
        <span>
          Wallet:{" "}
          <a
            href={`https://scan.pulsechain.com/address/${agent.wallet}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:underline font-mono"
          >
            {truncate(agent.wallet)}
          </a>
        </span>
        {agent.uri && (
          <a
            href={agent.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:underline"
          >
            View metadata JSON
          </a>
        )}
      </div>
    </div>
  );
}

export default function AgentDirectory() {
  const { agents, loading, error } = useAgents();

  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold text-white text-center mb-3">
        Agent Directory
      </h2>
      <p className="text-gray-400 text-center max-w-xl mx-auto mb-10">
        Live from PulseChain — every registered AI agent and its metadata.
      </p>

      {loading && (
        <p className="text-center text-gray-400 animate-pulse">
          Loading agents from PulseChain&hellip;
        </p>
      )}

      {error && (
        <p className="text-center text-red-400 text-sm">
          Could not fetch agents: {error}
        </p>
      )}

      {!loading && !error && agents.length === 0 && (
        <p className="text-center text-gray-500">
          No agents registered yet — be the first!
        </p>
      )}

      {agents.length > 0 && (
        <div className="max-w-4xl mx-auto grid gap-6">
          {agents.map((a) => (
            <AgentCard key={a.id.toString()} agent={a} />
          ))}
        </div>
      )}
    </section>
  );
}
