import { NextResponse } from "next/server";

// Agent #4 — Crypto Fear & Greed Index
// Fetches from alternative.me API

type FearGreedData = {
  value: number;
  classification: string;
  timestamp: string;
  history7d: { value: number; classification: string; date: string }[];
};

let cache: { data: FearGreedData; fetchedAt: string } | null = null;
let cacheTime = 0;
const TTL = 30 * 60 * 1000;

async function fetchFearGreed(): Promise<FearGreedData> {
  const res = await fetch(
    "https://api.alternative.me/fng/?limit=7&format=json"
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  const entries = json.data ?? [];
  const latest = entries[0];

  return {
    value: parseInt(latest.value),
    classification: latest.value_classification,
    timestamp: new Date(parseInt(latest.timestamp) * 1000).toISOString(),
    history7d: entries.map(
      (e: { value: string; value_classification: string; timestamp: string }) => ({
        value: parseInt(e.value),
        classification: e.value_classification,
        date: new Date(parseInt(e.timestamp) * 1000).toISOString().slice(0, 10),
      })
    ),
  };
}

export async function GET() {
  const now = Date.now();

  if (!cache || now - cacheTime > TTL) {
    try {
      const data = await fetchFearGreed();
      cache = { data, fetchedAt: new Date().toISOString() };
      cacheTime = now;
    } catch (e) {
      if (cache) {
        return NextResponse.json({ ...wrapResponse(cache), stale: true });
      }
      return NextResponse.json(
        { error: e instanceof Error ? e.message : "Failed to fetch" },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(wrapResponse(cache!), {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=60",
    },
  });
}

function wrapResponse(c: NonNullable<typeof cache>) {
  return {
    agent: "Crypto Fear & Greed Index",
    agentId: 4,
    refreshInterval: "30 minutes",
    source: "alternative.me",
    ...c,
  };
}
