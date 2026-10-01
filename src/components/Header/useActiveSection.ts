"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** A section becomes active once its top edge passes this fraction of the viewport height. */
const ACTIVATION_LINE = 0.4;

/**
 * Returns the id of the page section currently being read (or null above the first one),
 * so the navigation can highlight it. The last section also wins when the page is scrolled
 * to the bottom, because a short footer may never reach the activation line.
 */
export function useActiveSection(ids: readonly string[]) {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    const sections = idsKey
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVATION_LINE;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      if (atBottom && sections.length > 0) current = sections[sections.length - 1].id;

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [idsKey, pathname]); // sections differ per page

  return active;
}
