import { NextResponse } from "next/server";

// Agent #2 — Gas & Network Monitor
// Fetches gas prices, block info, and network stats from PulseChain RPC

const RPC = "https://rpc.pulsechain.com";

type NetworkSnapshot = {
  gasPrice: string | null;
  gasPriceGwei: string | null;
  latestBlock: number | null;
  blockTimestamp: string | null;
  baseFeePerGas: string | null;
  baseFeeGwei: string | null;
  transactionsInBlock: number | null;
  gasUsed: string | null;
  gasLimit: string | null;
  utilization: string | null;
};

let cache: { data: NetworkSnapshot; fetchedAt: string } | null = null;
let cacheTime = 0;
const TTL = 60 * 60 * 1000; // 1 hour

async function rpc(method: string, params: unknown[] = []) {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const json = await res.json();
  return json.result;
}

function hexToGwei(hex: string): string {
  return (parseInt(hex, 16) / 1e9).toFixed(4);
}

async function fetchNetworkData(): Promise<NetworkSnapshot> {
  try {
    const [gasPriceHex, blockHex] = await Promise.all([
      rpc("eth_gasPrice"),
      rpc("eth_getBlockByNumber", ["latest", false]),
    ]);

    const gasPrice = parseInt(gasPriceHex, 16).toString();
    const blockNumber = parseInt(blockHex.number, 16);
    const timestamp = new Date(
      parseInt(blockHex.timestamp, 16) * 1000
    ).toISOString();
    const txCount = (blockHex.transactions as string[]).length;
    const gasUsed = BigInt(blockHex.gasUsed);
    const gasLimit = BigInt(blockHex.gasLimit);
    const utilization =
      gasLimit > 0n
        ? ((Number(gasUsed) / Number(gasLimit)) * 100).toFixed(2) + "%"
        : null;

    return {
      gasPrice,
      gasPriceGwei: hexToGwei(gasPriceHex),
      latestBlock: blockNumber,
      blockTimestamp: timestamp,
      baseFeePerGas: blockHex.baseFeePerGas
        ? parseInt(blockHex.baseFeePerGas, 16).toString()
        : null,
      baseFeeGwei: blockHex.baseFeePerGas
        ? hexToGwei(blockHex.baseFeePerGas)
        : null,
      transactionsInBlock: txCount,
      gasUsed: gasUsed.toString(),
      gasLimit: gasLimit.toString(),
      utilization,
    };
  } catch {
    return {
      gasPrice: null,
      gasPriceGwei: null,
      latestBlock: null,
      blockTimestamp: null,
      baseFeePerGas: null,
      baseFeeGwei: null,
      transactionsInBlock: null,
      gasUsed: null,
      gasLimit: null,
      utilization: null,
    };
  }
}

export async function GET() {
  const now = Date.now();

  if (!cache || now - cacheTime > TTL) {
    const data = await fetchNetworkData();
    cache = { data, fetchedAt: new Date().toISOString() };
    cacheTime = now;
  }

  return NextResponse.json(
    {
      agent: "Gas & Network Monitor",
      agentId: 2,
      chain: "PulseChain (369)",
      refreshInterval: "1 hour",
      ...cache,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
      },
    }
  );
}
