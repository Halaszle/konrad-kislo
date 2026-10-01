"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Marks every `[data-reveal]` element with `data-revealed` once it scrolls into view.
 * The actual animations live in globals.css ("Scroll reveal"), keyed off those attributes.
 *
 * The `reveal-ready` class is only added when JavaScript runs and the user has not asked for
 * reduced motion, so without it all content is simply visible.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    const observeNew = () =>
      document
        .querySelectorAll("[data-reveal]:not([data-revealed])")
        .forEach((element) => observer.observe(element)); // observing twice is a no-op

    observeNew();
    document.documentElement.classList.add("reveal-ready");

    // Elements rendered later (re-renders, hot reload in development) must be observed too,
    // otherwise they would stay hidden.
    const mutations = new MutationObserver(observeNew);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]); // re-scan after client-side navigation

  return null;
}
