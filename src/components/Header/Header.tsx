"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { navigation, site } from "@/content/site";

import styles from "./Header.module.css";
import { useActiveSection } from "./useActiveSection";

/** Distance (px) the page has to scroll before the header switches to its compact height. */
const COMPACT_AFTER = 24;

/** Section ids the navigation points to ("/#music" → "music"). */
const sectionIds = navigation.map((item) => item.href.split("#")[1]);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Shrink the header once the page is scrolled down, restore it at the top.
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsCompact(window.scrollY > COMPACT_AFTER);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update(); // the page may be loaded already scrolled (reload, anchor link)
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // While the mobile menu is open: keep keyboard focus inside the header, make the page
  // behind it unreachable (inert), lock scrolling, and close it with Escape.
  useEffect(() => {
    const header = headerRef.current;
    if (!isOpen || !header) return;

    const background = [document.getElementById("main"), document.querySelector("footer")].filter(
      (element): element is HTMLElement => element !== null,
    );
    background.forEach((element) => (element.inert = true));
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      // Cycle focus: logo → menu button → menu links → back to the logo.
      const focusable = [...header.querySelectorAll<HTMLElement>("a[href], button")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // The menu only exists on small screens; close it if the window grows past that.
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onResize = () => desktop.matches && setIsOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
      background.forEach((element) => (element.inert = false));
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header ref={headerRef} className={styles.header} data-compact={isCompact}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          {site.name}
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="visually-hidden">{isOpen ? "Close menu" : "Open menu"}</span>
          <span className={styles.toggleBar} aria-hidden="true" />
          <span className={styles.toggleBar} aria-hidden="true" />
        </button>

        <nav
          id="site-navigation"
          className={styles.nav}
          data-open={isOpen}
          aria-label="Main navigation"
        >
          <ul className={styles.list}>
            {navigation.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  onClick={closeMenu}
                  aria-current={activeSection === sectionIds[index] ? "location" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
