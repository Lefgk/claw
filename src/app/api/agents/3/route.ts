import { NextResponse } from "next/server";

// Agent #3 — Bridge & Liquidity Watcher
// Fetches top PulseChain pool liquidity + volume from DexScreener

type PoolData = {
  pair: string;
  dex: string;
  priceUsd: string | null;
  liquidity: number | null;
  volume24h: number | null;
  priceChange24h: number | null;
  txCount24h: number | null;
  url: string | null;
};

type BridgeSnapshot = {
  topPools: PoolData[];
  totalLiquidityUsd: number;
  totalVolume24h: number;
};

let cache: { data: BridgeSnapshot; fetchedAt: string } | null = null;
let cacheTime = 0;
const TTL = 30 * 60 * 1000; // 30 minutes

// Top tokens to track liquidity for
const TRACKED_TOKENS = [
  "0xA1077a294dDE1B09bB078844df40758a5D0f9a27", // WPLS
  "0x95B303987A60C71504D99Aa1b13B4DA07b0790ab", // PLSX
  "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39", // HEX
  "0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d", // INC
  "0xefD766cCb38EaF1dfd701853BFCe31359239F305", // DAI from Ethereum
];

async function fetchLiquidity(): Promise<BridgeSnapshot> {
  const allPools: PoolData[] = [];

  for (const token of TRACKED_TOKENS) {
    try {
      const res = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${token}`
      );
      if (!res.ok) continue;
      const json = await res.json();

      const pairs = (json.pairs ?? []).slice(0, 3); // top 3 pools per token
      for (const p of pairs) {
        if (p.chainId !== "pulsechain") continue;
        allPools.push({
          pair: `${p.baseToken?.symbol ?? "?"}/${p.quoteToken?.symbol ?? "?"}`,
          dex: p.dexId ?? "unknown",
          priceUsd: p.priceUsd ?? null,
          liquidity: p.liquidity?.usd ?? null,
          volume24h: p.volume?.h24 ?? null,
          priceChange24h: p.priceChange?.h24 ?? null,
          txCount24h: (p.txns?.h24?.buys ?? 0) + (p.txns?.h24?.sells ?? 0),
          url: p.url ?? null,
        });
      }
    } catch {
      // skip failed token
    }
  }

  // Deduplicate by pair address isn't available, so sort by liquidity
  allPools.sort((a, b) => (b.liquidity ?? 0) - (a.liquidity ?? 0));
  const topPools = allPools.slice(0, 15);

  const totalLiquidityUsd = topPools.reduce(
    (sum, p) => sum + (p.liquidity ?? 0),
    0
  );
  const totalVolume24h = topPools.reduce(
    (sum, p) => sum + (p.volume24h ?? 0),
    0
  );

  return { topPools, totalLiquidityUsd, totalVolume24h };
}

export async function GET() {
  const now = Date.now();

  if (!cache || now - cacheTime > TTL) {
    const data = await fetchLiquidity();
    cache = { data, fetchedAt: new Date().toISOString() };
    cacheTime = now;
  }

  return NextResponse.json(
    {
      agent: "Bridge & Liquidity Watcher",
      agentId: 3,
      chain: "PulseChain (369)",
      refreshInterval: "30 minutes",
      ...cache,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=60",
      },
    }
  );
}
