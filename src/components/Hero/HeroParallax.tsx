"use client";

import { useEffect, useRef } from "react";

import styles from "./Hero.module.css";

/** How much slower than the page the photo moves (0 = fixed to the page, 1 = pinned to the viewport). */
const SPEED = 0.35;

/**
 * Moves its children (the hero photo) slower than the page while scrolling,
 * so the photo gradually reveals its upper part as the hero scrolls away.
 * Disabled for users who prefer reduced motion.
 */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const hero = layer?.parentElement;
    if (!layer || !hero) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      // Nothing to animate once the hero has left the viewport.
      const offset = Math.min(window.scrollY, hero.offsetHeight);
      layer.style.transform = `translate3d(0, ${offset * SPEED}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const start = () => {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      layer.style.transform = "";
    };

    const onMotionPreferenceChange = () => (reducedMotion.matches ? stop() : start());

    onMotionPreferenceChange();
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      stop();
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, []);

  return (
    <div ref={layerRef} className={styles.parallax} aria-hidden="true">
      {children}
    </div>
  );
}
