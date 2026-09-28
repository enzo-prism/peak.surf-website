import { useEffect, useRef, useState } from "react";

/** Progressive enhancement: prerendered content stays visible without JavaScript. */
export function useMotion() {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element || paused || reduced) return;
    const targets = Array.from(element.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    targets.forEach((target) => {
      // Never hide content already on screen or above the current scroll position.
      if (target.getBoundingClientRect().top < window.innerHeight) {
        target.classList.add("is-visible");
      }
      observer.observe(target);
    });
    element.classList.add("motion-ready");
    return () => {
      observer.disconnect();
      element.classList.remove("motion-ready");
    };
  }, [paused, reduced]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    element.classList.add("motion-enhanced");
    const visibility = () => element.classList.toggle("page-hidden", document.hidden);
    document.addEventListener("visibilitychange", visibility);
    visibility();
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.target.classList.toggle("in-view", entry.isIntersecting));
      });
      element.querySelectorAll("[data-motion-zone]").forEach((zone) => observer?.observe(zone));
    } else {
      element.querySelectorAll("[data-motion-zone]").forEach((zone) => zone.classList.add("in-view"));
    }
    return () => {
      observer?.disconnect();
      element.classList.remove("motion-enhanced");
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return { root, paused, reduced, toggle: () => setPaused((value) => !value) };
}
