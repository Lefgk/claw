"use client";

import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { type Address, isAddress } from "viem";
import { useRegisterAgent } from "@/lib/hooks";

export default function ConnectAndRegister() {
  const { isConnected } = useAccount();
  const { register, isPending, isConfirming, isSuccess, error, hash } =
    useRegisterAgent();

  const [uri, setUri] = useState("");
  const [wallet, setWallet] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!uri || !isAddress(wallet)) return;
    register(uri, wallet as Address);
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-lg mx-auto space-y-6">
      <div className="flex justify-center">
        <ConnectButton />
      </div>

      {isConnected && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Metadata URI
            </label>
            <input
              type="text"
              value={uri}
              onChange={(e) => setUri(e.target.value)}
              placeholder="ipfs://... or https://..."
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Agent Wallet Address
            </label>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              placeholder="0x..."
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500"
            />
          </div>
          <button
            type="submit"
            disabled={isPending || isConfirming || !uri || !isAddress(wallet)}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-medium py-2 rounded-lg transition"
          >
            {isPending
              ? "Confirm in wallet..."
              : isConfirming
                ? "Confirming..."
                : "Register Agent"}
          </button>

          {isSuccess && hash && (
            <p className="text-green-400 text-sm text-center">
              Agent registered!{" "}
              <a
                href={`https://scan.pulsechain.com/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View tx
              </a>
            </p>
          )}

          {error && (
            <p className="text-red-400 text-sm text-center">
              {error.message}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
