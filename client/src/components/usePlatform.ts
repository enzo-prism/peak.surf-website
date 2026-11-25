import { useEffect, useState } from "react";

export type Platform = "ios" | "android" | "desktop";

/**
 * The visitor's platform, known only after hydration. Returns null during
 * prerendering and the first client render so the markup always matches.
 */
export function usePlatform(): Platform | null {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    const agent = navigator.userAgent;
    if (/android/i.test(agent)) setPlatform("android");
    else if (/iphone|ipad|ipod/i.test(agent) || (/macintosh/i.test(agent) && navigator.maxTouchPoints > 1)) {
      setPlatform("ios");
    } else setPlatform("desktop");
  }, []);

  return platform;
}
