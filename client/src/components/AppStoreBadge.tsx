import { usePlatform } from "./usePlatform";

/**
 * Apple's official "Download on the App Store" badge (black, US English),
 * from Apple's marketing toolbox. Apple's guidelines: show it at 40px tall or
 * more, keep clear space around it, and never recolor or redraw it. Wrap it
 * in an AppStoreLink; the alt text gives the link its accessible name.
 */
export function AppStoreBadge({ className = "h-[52px]" }: { className?: string }) {
  return (
    <img
      src="/app-store-badge.svg"
      alt="Download Peak on the App Store"
      width="120"
      height="40"
      className={`w-auto ${className}`}
    />
  );
}

/**
 * A QR code that opens Peak's App Store listing, for visitors on a computer.
 * Shown from the `lg` breakpoint up. Regenerate public/app-store-qr.svg if the
 * App Store ID changes (see AGENTS.md).
 */
export function AppStoreQr({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className="hidden items-center gap-4 lg:flex">
      <img
        src="/app-store-qr.svg"
        alt="QR code that opens Peak on the App Store"
        width="96"
        height="96"
        loading="lazy"
        className="h-24 w-24 rounded-xl"
      />
      <p className={`max-w-[9rem] text-xs leading-5 ${tone === "light" ? "text-black/60" : "text-white/60"}`}>
        On a computer? Scan with your iPhone camera to get Peak.
      </p>
    </div>
  );
}

/** Tells Android visitors that Peak is iPhone-only. Renders nothing elsewhere. */
export function AndroidNote({ tone = "dark" }: { tone?: "light" | "dark" }) {
  const platform = usePlatform();
  if (platform !== "android") return null;

  return (
    <p
      role="note"
      className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
        tone === "dark" ? "border-white/15 bg-white/[0.06] text-white/80" : "border-black/10 bg-black/[0.04] text-black/70"
      }`}
    >
      Peak is only on iPhone for now, so it is not on Google Play. Open this
      page on an iPhone to download it.
    </p>
  );
}
