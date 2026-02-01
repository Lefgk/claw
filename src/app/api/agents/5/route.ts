import { NextResponse } from "next/server";

// Agent #5 — Crypto Global Market Stats
// BTC dominance, total market cap, ETH dominance, top movers

type MarketStats = {
  totalMarketCapUsd: number;
  totalVolume24hUsd: number;
  btcDominance: number;
  ethDominance: number;
  activeCryptocurrencies: number;
  marketCapChange24h: number;
  topGainers: { id: string; symbol: string; name: string; change24h: number; price: number }[];
  topLosers: { id: string; symbol: string; name: string; change24h: number; price: number }[];
};

let cache: { data: MarketStats; fetchedAt: string } | null = null;
let cacheTime = 0;
const TTL = 60 * 60 * 1000; // 1 hour

async function fetchMarketStats(): Promise<MarketStats> {
  // Global data
  const globalRes = await fetch(
    "https://api.coingecko.com/api/v3/global"
  );
  if (!globalRes.ok) throw new Error(`CoinGecko global HTTP ${globalRes.status}`);
  const globalJson = await globalRes.json();
  const g = globalJson.data;

  // Top gainers/losers — get top 100 by market cap
  const marketsRes = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
  );
  if (!marketsRes.ok) throw new Error(`CoinGecko markets HTTP ${marketsRes.status}`);
  const coins = await marketsRes.json();

  const sorted = [...coins].sort(
    (a: { price_change_percentage_24h: number | null }, b: { price_change_percentage_24h: number | null }) =>
      (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0)
  );

  const mapCoin = (c: { id: string; symbol: string; name: string; price_change_percentage_24h: number | null; current_price: number }) => ({
    id: c.id,
    symbol: c.symbol.toUpperCase(),
    name: c.name,
    change24h: c.price_change_percentage_24h ?? 0,
    price: c.current_price,
  });

  return {
    totalMarketCapUsd: g.total_market_cap?.usd ?? 0,
    totalVolume24hUsd: g.total_volume?.usd ?? 0,
    btcDominance: g.market_cap_percentage?.btc ?? 0,
    ethDominance: g.market_cap_percentage?.eth ?? 0,
    activeCryptocurrencies: g.active_cryptocurrencies ?? 0,
    marketCapChange24h: g.market_cap_change_percentage_24h_usd ?? 0,
    topGainers: sorted.slice(0, 5).map(mapCoin),
    topLosers: sorted.slice(-5).reverse().map(mapCoin),
  };
}

export async function GET() {
  const now = Date.now();

  if (!cache || now - cacheTime > TTL) {
    try {
      const data = await fetchMarketStats();
      cache = { data, fetchedAt: new Date().toISOString() };
      cacheTime = now;
    } catch (e) {
      if (cache) {
        return NextResponse.json({ ...wrap(cache), stale: true });
      }
      return NextResponse.json(
        { error: e instanceof Error ? e.message : "Failed to fetch" },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(wrap(cache!), {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=60",
    },
  });
}

function wrap(c: NonNullable<typeof cache>) {
  return {
    agent: "Crypto Global Market Stats",
    agentId: 5,
    refreshInterval: "1 hour",
    source: "coingecko",
    ...c,
  };
}
