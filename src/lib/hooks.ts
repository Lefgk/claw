"use client";

import { createPublicClient, http } from "viem";
import { useEffect, useState } from "react";
import { pulsechain } from "@/config/chains";
import { IDENTITY_REGISTRY } from "@/config/contracts";
import { identityRegistryAbi } from "./abi";

const publicClient = createPublicClient({
  chain: pulsechain,
  transport: http(),
});

export type Agent = {
  id: bigint;
  owner: string;
  uri: string;
  wallet: string;
};

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAgents() {
      try {
        setLoading(true);
        const count = (await publicClient.readContract({
          address: IDENTITY_REGISTRY,
          abi: identityRegistryAbi,
          functionName: "totalAgents",
        })) as bigint;

        const results: Agent[] = [];

        for (let i = 1n; i <= count; i++) {
          try {
            const [owner, uri, wallet] = await Promise.all([
              publicClient.readContract({
                address: IDENTITY_REGISTRY,
                abi: identityRegistryAbi,
                functionName: "ownerOf",
                args: [i],
              }) as Promise<string>,
              publicClient.readContract({
                address: IDENTITY_REGISTRY,
                abi: identityRegistryAbi,
                functionName: "tokenURI",
                args: [i],
              }) as Promise<string>,
              publicClient.readContract({
                address: IDENTITY_REGISTRY,
                abi: identityRegistryAbi,
                functionName: "getAgentWallet",
                args: [i],
              }) as Promise<string>,
            ]);

            results.push({ id: i, owner, uri, wallet });
          } catch {
            // skip agents that revert (burned tokens)
          }
        }

        if (!cancelled) {
          setAgents(results);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to fetch agents");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAgents();
    return () => {
      cancelled = true;
    };
  }, []);

  return { agents, loading, error };
}
