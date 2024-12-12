export const surfboardIcons = [
  "shortboard",
  "longboard",
  "fish",
  "funboard",
  "gun",
  "sup",
  "foamboard",
  "retro"
] as const;

export type SurfboardIconType = typeof surfboardIcons[number];

export function getSurfboardEmoji(icon: string | null | undefined): string {
  switch (icon) {
    case "shortboard":
      return "🏄‍♂️";
    case "longboard":
      return "🏄";
    case "fish":
      return "🐟";
    case "funboard":
      return "🌊";
    case "gun":
      return "🎯";
    case "sup":
      return "🚣‍♂️";
    case "foamboard":
      return "☁️";
    case "retro":
      return "🌴";
    default:
      return "🏄‍♂️";
  }
}
