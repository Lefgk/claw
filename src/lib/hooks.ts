"use client";

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { createPublicClient, http, type Address } from "viem";
import { useEffect, useState } from "react";
import { pulsechain } from "@/config/chains";
import { IDENTITY_REGISTRY } from "@/config/contracts";
import { identityRegistryAbi } from "./abi";

// ---------- read-only public client (no wallet needed) ----------

const publicClient = createPublicClient({
  chain: pulsechain,
  transport: http(),
});

export type Agent = {
  id: bigint;
  owner: string;
  metadataURI: string;
  wallet: string;
  active: boolean;
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
          functionName: "agentCount",
        })) as bigint;

        const results: Agent[] = [];

        for (let i = 1n; i <= count; i++) {
          try {
            const agent = (await publicClient.readContract({
              address: IDENTITY_REGISTRY,
              abi: identityRegistryAbi,
              functionName: "getAgent",
              args: [i],
            })) as { owner: string; metadataURI: string; wallet: string; active: boolean };

            if (agent.active) {
              results.push({
                id: i,
                owner: agent.owner,
                metadataURI: agent.metadataURI,
                wallet: agent.wallet,
                active: agent.active,
              });
            }
          } catch {
            // skip agents that revert
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

// ---------- write hook (needs connected wallet) ----------

export function useRegisterAgent() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  function register(metadataURI: string, wallet: Address) {
    writeContract({
      address: IDENTITY_REGISTRY,
      abi: identityRegistryAbi,
      functionName: "registerAgent",
      args: [metadataURI, wallet],
    });
  }

  return {
    register,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
  };
}
