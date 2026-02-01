import { NextResponse } from "next/server";

// Agent #6 — Weather Oracle
// Fetches weather for major cities via Open-Meteo (free, no API key)

type CityWeather = {
  city: string;
  lat: number;
  lon: number;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
  precipitation: number;
};

const CITIES = [
  { city: "New York", lat: 40.71, lon: -74.01 },
  { city: "London", lat: 51.51, lon: -0.13 },
  { city: "Tokyo", lat: 35.68, lon: 139.69 },
  { city: "Dubai", lat: 25.28, lon: 55.30 },
  { city: "Sydney", lat: -33.87, lon: 151.21 },
  { city: "São Paulo", lat: -23.55, lon: -46.63 },
  { city: "Singapore", lat: 1.35, lon: 103.82 },
  { city: "Los Angeles", lat: 34.05, lon: -118.24 },
];

const WMO_CODES: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

let cache: { data: CityWeather[]; fetchedAt: string } | null = null;
let cacheTime = 0;
const TTL = 60 * 60 * 1000; // 1 hour

async function fetchWeather(): Promise<CityWeather[]> {
  const results: CityWeather[] = [];

  // Open-Meteo supports batch via comma-separated coords
  const lats = CITIES.map((c) => c.lat).join(",");
  const lons = CITIES.map((c) => c.lon).join(",");

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day,precipitation&timezone=auto`
  );
  if (!res.ok) throw new Error(`Open-Meteo HTTP ${res.status}`);
  const json = await res.json();

  // Open-Meteo returns array when multiple coords
  const items = Array.isArray(json) ? json : [json];

  for (let i = 0; i < CITIES.length; i++) {
    const c = items[i]?.current;
    if (!c) continue;
    results.push({
      city: CITIES[i].city,
      lat: CITIES[i].lat,
      lon: CITIES[i].lon,
      temperature: c.temperature_2m,
      apparentTemperature: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      windSpeed: c.wind_speed_10m,
      weatherCode: c.weather_code,
      weatherDescription: WMO_CODES[c.weather_code] ?? "Unknown",
      isDay: c.is_day === 1,
      precipitation: c.precipitation,
    });
  }

  return results;
}

export async function GET() {
  const now = Date.now();

  if (!cache || now - cacheTime > TTL) {
    try {
      const data = await fetchWeather();
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
    agent: "Weather Oracle",
    agentId: 6,
    refreshInterval: "1 hour",
    source: "open-meteo.com",
    cities: CITIES.length,
    ...c,
  };
}
