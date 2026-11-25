import { cloneElement, useEffect, useState, type ReactElement } from "react";

import { usePlatform } from "./usePlatform";

/**
 * A slim download bar pinned to the bottom of the screen on phones.
 *
 * It appears once the visitor has scrolled half a screen and no in-page
 * download button (any element marked `data-download-cta`) is visible, so
 * there is always exactly one download button in reach without stacking two.
 * While it shows, the root element gets `download-bar-on`, which hides the
 * header's compact download button on phones (see index.css).
 *
 * Pass the page's own AppStoreLink (with a static analytics location) as
 * `link`; the bar fills in its content and styling. It hides on Android,
 * where Peak is not available.
 */
export function MobileDownloadBar({ link }: { link: ReactElement }) {
  const platform = usePlatform();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const onScreen = new Set<Element>();
    let scrolled = false;

    const update = () => {
      const show = scrolled && onScreen.size === 0;
      setVisible(show);
      root.classList.toggle("download-bar-on", show);
    };

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        });
        update();
      });
      document.querySelectorAll("[data-download-cta]").forEach((cta) => observer?.observe(cta));
    }

    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.5;
      if (next !== scrolled) {
        scrolled = next;
        update();
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("download-bar-on");
    };
  }, []);

  if (platform === "android") return null;

  return (
    <div className="download-bar md:hidden" data-visible={visible}>
      {cloneElement(link, {
        className: "download-bar-link",
        children: (
          <>
            <img src="/apple-touch-icon.png" alt="" width="40" height="40" className="h-10 w-10 rounded-[10px]" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[15px] font-semibold text-white">Peak</span>
              <span className="block truncate text-[13px] text-white/60">Free surf journal for iPhone</span>
            </span>
            <span className="download-bar-get">Get</span>
          </>
        ),
      })}
    </div>
  );
}
