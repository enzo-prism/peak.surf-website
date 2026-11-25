// Release notes for versions that are live on the App Store, newest first.
// Shown on /changelog and summarised in llms-full.txt. Add an entry (and bump
// APP_VERSION in site.ts) when a new version is released, not when it is
// submitted for review.

export type Release = {
  version: string;
  /** ISO date the version went live on the App Store. */
  released: string;
  summary: string;
  sections: { title: string; items: string[] }[];
};

export const releases: Release[] = [
  {
    version: "3.5",
    released: "2026-10-07",
    summary: "Peak 3.5 speeds up logging and cleans up Stats. Private by default. No accounts.",
    sections: [
      {
        title: "Log a session faster",
        items: [
          "A new session starts with your last spot and the gear you rode there, so a repeat surf is a few taps.",
          "Time-in-water chips (1h, 1h 30m, 2h, 3h) count back from now, with the exact times shown as you go.",
          "Rate the session right on the main card, with no extra screen.",
          "Logging an Apple Watch surf now opens it ready to rate and save, instead of saving it silently.",
          "Cancel now asks before it discards a session you have started.",
        ],
      },
      {
        title: "Stats, fixed",
        items: [
          "The consistency heatmap draws real weeks, with the calendar the right way up.",
          "The monthly goal card reads correctly before you have set a goal.",
          "The wave height chart follows your feet or metres setting.",
          "Spot mix colors are easier to tell apart, with shares in the legend.",
        ],
      },
      {
        title: "Everything else",
        items: [
          "Session pages are tidier, with gear, buddies, and notes open by default.",
          "Saving a new session no longer reloads the whole app.",
          "If a save, restore, or delete fails, your existing sessions and media are left exactly as they were.",
        ],
      },
    ],
  },
];
