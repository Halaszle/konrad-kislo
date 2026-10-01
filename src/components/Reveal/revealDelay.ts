import type { CSSProperties } from "react";

/** Staggers scroll-reveal animations: the n-th element in a group starts `step` ms after the previous one. */
export function revealDelay(index: number, step = 150): CSSProperties {
  return { "--reveal-delay": `${index * step}ms` } as CSSProperties;
}
