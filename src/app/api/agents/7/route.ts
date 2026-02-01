import { NextResponse } from "next/server";

// Agent #7 — Sports Scores & Odds
// Fetches live/upcoming events from TheSportsDB (free, no key needed)

type SportEvent = {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
  date: string;
  time: string;
  venue: string | null;
};

type SportsData = {
  live: SportEvent[];
  upcoming: SportEvent[];
};

let cache: { data: SportsData; fetchedAt: string } | null = null;
let cacheTime = 0;
const TTL = 30 * 60 * 1000;

// Free leagues from TheSportsDB
const LEAGUE_IDS = [
  "4328", // English Premier League
  "4332", // Serie A
  "4335", // La Liga
  "4331", // Bundesliga
  "4387", // NBA
  "4391", // NFL
  "4380", // NHL
];

function mapEvent(e: Record<string, string | null>): SportEvent {
  return {
    id: e.idEvent ?? "",
    sport: e.strSport ?? "",
    league: e.strLeague ?? "",
    homeTeam: e.strHomeTeam ?? "",
    awayTeam: e.strAwayTeam ?? "",
    homeScore: e.intHomeScore != null ? parseInt(e.intHomeScore) : null,
    awayScore: e.intAwayScore != null ? parseInt(e.intAwayScore) : null,
    status: e.strStatus ?? "Not Started",
    date: e.dateEvent ?? "",
    time: e.strTime ?? "",
    venue: e.strVenue ?? null,
  };
}

async function fetchSports(): Promise<SportsData> {
  const live: SportEvent[] = [];
  const upcoming: SportEvent[] = [];

  for (const leagueId of LEAGUE_IDS) {
    try {
      // Upcoming / next 15 events
      const nextRes = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${leagueId}`
      );
      if (nextRes.ok) {
        const nextJson = await nextRes.json();
        const events = nextJson.events ?? [];
        upcoming.push(...events.slice(0, 3).map(mapEvent));
      }

      // Past / latest results
      const pastRes = await fetch(
        `https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${leagueId}`
      );
      if (pastRes.ok) {
        const pastJson = await pastRes.json();
        const events = pastJson.events ?? [];
        live.push(...events.slice(0, 3).map(mapEvent));
      }
    } catch {
      // skip failed league
    }
  }

  // Sort upcoming by date
  upcoming.sort((a, b) => a.date.localeCompare(b.date));

  return { live: live.slice(0, 15), upcoming: upcoming.slice(0, 15) };
}

export async function GET() {
  const now = Date.now();

  if (!cache || now - cacheTime > TTL) {
    try {
      const data = await fetchSports();
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
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=60",
    },
  });
}

function wrap(c: NonNullable<typeof cache>) {
  return {
    agent: "Sports Scores & Events",
    agentId: 7,
    refreshInterval: "30 minutes",
    source: "thesportsdb.com",
    leagues: LEAGUE_IDS.length,
    ...c,
  };
}
