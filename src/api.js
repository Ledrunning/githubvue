const BASE = "https://api.github.com";

// Change the user here, or set VITE_GH_USER in a .env.local file
export const USER = import.meta.env.VITE_GH_USER || "Ledrunning";

// Tiny fetch wrapper with a 10-minute sessionStorage cache. Unauthenticated
// GitHub API calls are limited to 60 per hour per IP, so caching matters.
export async function gh(path, ttl = 600_000) {
  const key = "gh:" + path;
  try {
    const c = JSON.parse(sessionStorage.getItem(key));
    if (c && Date.now() - c.t < ttl) return c.d;
  } catch {}

  const r = await fetch(BASE + path, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!r.ok) {
    if (r.status === 403 || r.status === 429)
      throw new Error(
        "GitHub API rate limit reached (60 requests/hour without a token). Please try again later.",
      );
    if (r.status === 404) throw new Error("Not found.");
    if (r.status === 409) throw new Error("This repository is empty.");
    throw new Error(`GitHub API error (${r.status}).`);
  }

  const d = await r.json();

  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d }));
  } catch {}
  return d;
}

const UNITS = [
  ["year", 31536000],
  ["month", 2592000],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
];

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function ago(iso) {
  const s = (new Date(iso) - Date.now()) / 1000;

  for (const [unit, n] of UNITS)
    if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), unit);
  
  return "just now";
}
