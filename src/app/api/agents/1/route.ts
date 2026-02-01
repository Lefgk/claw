import { NextResponse } from "next/server";

// Agent #1 — PulseChain Price Oracle
// Fetches token prices from DexScreener every 30 min

const TOKENS: Record<string, string> = {
  PLS: "0xA1077a294dDE1B09bB078844df40758a5D0f9a27",   // WPLS
  PLSX: "0x95B303987A60C71504D99Aa1b13B4DA07b0790ab",
  HEX: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
  INC: "0x2fa878Ab3F87CC1C9737Fc071108F904c0B0C95d",
  DAI: "0xefD766cCb38EaF1dfd701853BFCe31359239F305",
};

type TokenPrice = {
  symbol: string;
  address: string;
  priceUsd: string | null;
  priceChange24h: number | null;
  liquidity: number | null;
  volume24h: number | null;
  source: string;
};

let cache: { data: TokenPrice[]; fetchedAt: string } | null = null;
let cacheTime = 0;
const TTL = 60 * 60 * 1000; // 1 hour

async function fetchPrices(): Promise<TokenPrice[]> {
  const results: TokenPrice[] = [];

  for (const [symbol, address] of Object.entries(TOKENS)) {
    try {
      const res = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${address}`,
        { next: { revalidate: 0 } }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      const pair = json.pairs?.[0];
      results.push({
        symbol,
        address,
        priceUsd: pair?.priceUsd ?? null,
        priceChange24h: pair?.priceChange?.h24 ?? null,
        liquidity: pair?.liquidity?.usd ?? null,
        volume24h: pair?.volume?.h24 ?? null,
        source: "dexscreener",
      });
    } catch {
      results.push({
        symbol,
        address,
        priceUsd: null,
        priceChange24h: null,
        liquidity: null,
        volume24h: null,
        source: "dexscreener (failed)",
      });
    }
  }

  return results;
}

export async function GET() {
  const now = Date.now();

  if (!cache || now - cacheTime > TTL) {
    const data = await fetchPrices();
    cache = { data, fetchedAt: new Date().toISOString() };
    cacheTime = now;
  }

  return NextResponse.json(
    {
      agent: "PulseChain Price Oracle",
      agentId: 1,
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
