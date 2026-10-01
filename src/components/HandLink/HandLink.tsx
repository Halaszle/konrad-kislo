import Link from "next/link";

import styles from "./HandLink.module.css";

type HandLinkProps = {
  href: string;
  children: React.ReactNode;
  /**
   * Arrow: "forward" points right after the text, "back" points left before it,
   * "up" points up after the text.
   */
  direction?: "forward" | "back" | "up";
};

const arrowClass = {
  forward: styles.arrow,
  back: `${styles.arrow} ${styles.arrowBack}`,
  up: `${styles.arrow} ${styles.arrowUp}`,
};

function Arrow({ className }: { className: string }) {
  // Slightly uneven strokes so the arrow matches the hand-lettered font.
  return (
    <svg
      className={className}
      viewBox="0 0 32 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 8.5c7-.6 17-.9 27-.4" />
      <path d="M23 2.5c2.2 2 4.2 3.7 6 5.6-2 1.8-4 3.6-6.2 5.4" />
    </svg>
  );
}

/** Section-closing link in the hand-lettered style of the section titles. */
export function HandLink({ href, children, direction = "forward" }: HandLinkProps) {
  const isBack = direction === "back";
  const arrow = <Arrow className={arrowClass[direction]} />;

  return (
    <Link href={href} className={styles.link}>
      {isBack && arrow}
      <span>{children}</span>
      {!isBack && arrow}
    </Link>
  );
}
