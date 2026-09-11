// Copied & aligned directly with valoinfo (valoinfo/apps/frontend/data/games.ts)
// Note: "V" in valoinfo maps to Valorant articles ("V" cover all articles of valoinfo.com)
export const GAMES = {
  V: "V",
  VALORANT: "Valorant",
  CS2: "Counter Strike 2",
  DOTA2: "Dota 2",
  LOL: "League of Legends",
  OVERWATCH2: "Overwatch 2",
  ROCKETLEAGUE: "Rocket League",
  APEX: "Apex",
  MLBB: "Mobile Legends: Bang Bang",
  RAINBOWSIX: "Rainbow Six Siege",
  PUBG: "PUBG",
  FATALFURY: "FATAL FURY",
  CALLOFDUTY: "Call of Duty",
  EAFC: "EA FC",
  TAKKEN8: "Tekken 8",
  FORZA: "Forza",
  STREETFIGHTER: "Street Fighter",
  FREEFIRE: "Free Fire",
  BGMI: "BGMI",
} as const;

export type GameKey = keyof typeof GAMES;

export interface GameInfo {
  key: string;
  name: string;
  slug: string;
  dotColor?: string;
  valoinfoSync?: boolean; // Indicates if this game syncs articles with valoinfo.com ("V")
}

export const GAME_DETAILS: Record<string, GameInfo> = {
  V: { key: "V", name: "Valorant", slug: "valorant", dotColor: "#FF3131", valoinfoSync: true },
  VALORANT: { key: "VALORANT", name: "Valorant", slug: "valorant", dotColor: "#FF3131", valoinfoSync: true },
  CS2: { key: "CS2", name: "Counter-Strike 2", slug: "cs2", dotColor: "#DE9B35" },
  DOTA2: { key: "DOTA2", name: "Dota 2", slug: "dota2", dotColor: "#FF3131" },
  LOL: { key: "LOL", name: "League of Legends", slug: "league-of-legends", dotColor: "#00A8E8" },
  OVERWATCH2: { key: "OVERWATCH2", name: "Overwatch 2", slug: "overwatch-2", dotColor: "#FA9C1E" },
  ROCKETLEAGUE: { key: "ROCKETLEAGUE", name: "Rocket League", slug: "rocket-league", dotColor: "#0088FF" },
  APEX: { key: "APEX", name: "Apex Legends", slug: "apex-legends", dotColor: "#FF3131" },
  MLBB: { key: "MLBB", name: "Mobile Legends: Bang Bang", slug: "mlbb", dotColor: "#9B51E0" },
  RAINBOWSIX: { key: "RAINBOWSIX", name: "Rainbow Six Siege", slug: "rainbow-six", dotColor: "#2F80ED" },
  PUBG: { key: "PUBG", name: "PUBG", slug: "pubg", dotColor: "#F2994A" },
  FATALFURY: { key: "FATALFURY", name: "FATAL FURY", slug: "fatal-fury", dotColor: "#FF3131" },
  CALLOFDUTY: { key: "CALLOFDUTY", name: "Call of Duty", slug: "call-of-duty", dotColor: "#27AE60" },
  EAFC: { key: "EAFC", name: "EA FC", slug: "ea-fc", dotColor: "#FF3131" },
  TAKKEN8: { key: "TAKKEN8", name: "Tekken 8", slug: "tekken-8", dotColor: "#E040FB" },
  FORZA: { key: "FORZA", name: "Forza", slug: "forza", dotColor: "#2196F3" },
  STREETFIGHTER: { key: "STREETFIGHTER", name: "Street Fighter", slug: "street-fighter", dotColor: "#FF9800" },
  FREEFIRE: { key: "FREEFIRE", name: "Free Fire", slug: "free-fire", dotColor: "#FF5722" },
  BGMI: { key: "BGMI", name: "BGMI", slug: "bgmi", dotColor: "#4CAF50" },
};

export const CATEGORY_BAR_GAMES = [
  { name: "All Games", slug: "all", key: "ALL" },
  { name: "Valorant", slug: "valorant", key: "V" },
  { name: "Counter-Strike 2", slug: "cs2", key: "CS2" },
  { name: "Dota 2", slug: "dota2", key: "DOTA2" },
  { name: "League of Legends", slug: "league-of-legends", key: "LOL" },
  { name: "MLBB", slug: "mlbb", key: "MLBB" },
  { name: "PUBG", slug: "pubg", key: "PUBG" },
  { name: "Free Fire", slug: "free-fire", key: "FREEFIRE" },
];
