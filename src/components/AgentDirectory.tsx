"use client";

import { useAgents } from "@/lib/hooks";

function truncate(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function AgentDirectory() {
  const { agents, loading, error } = useAgents();

  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold text-white text-center mb-8">
        Agent Directory
      </h2>

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
        <div className="overflow-x-auto max-w-5xl mx-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="text-xs uppercase text-gray-500 border-b border-white/10">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Metadata URI</th>
                <th className="px-4 py-3">Wallet</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((a) => (
                <tr
                  key={a.id.toString()}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="px-4 py-3 font-mono">{a.id.toString()}</td>
                  <td className="px-4 py-3 font-mono">
                    {truncate(a.owner)}
                  </td>
                  <td className="px-4 py-3 break-all max-w-xs truncate">
                    {a.uri || "—"}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    {truncate(a.wallet)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
