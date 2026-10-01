"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

/**
 * The current year, read in the visitor's browser. The page is prerendered at build time,
 * so `fallback` (the build year) is what the static HTML contains; after hydration the year
 * is always up to date, even if the site has not been rebuilt since New Year.
 */
export function CurrentYear({ fallback }: { fallback: number }) {
  return useSyncExternalStore(subscribe, getYear, () => fallback);
}
