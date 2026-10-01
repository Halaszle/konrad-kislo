"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type { Photo } from "@/content/site";

import styles from "./Lightbox.module.css";

type LightboxProps = {
  photos: Photo[];
  /** Index of the photo to show, or null when the lightbox is closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Minimum horizontal swipe distance (px) that switches to the next / previous photo. */
const SWIPE_THRESHOLD = 50;

function HandArrow({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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

/**
 * OPTIONAL (point 20). Full-screen photo viewer on the dark, grainy footer background,
 * with the hand-lettered caption and a counter. Built on the native <dialog>, which provides
 * Escape to close, a focus trap and an inert page behind it; arrows / swipe switch photos.
 */
export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const isOpen = index !== null;
  const photo = isOpen ? photos[index] : null;

  // Sync the native dialog with the `index` prop and lock page scrolling while open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();

    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (photos.length === 0) return null;

  const go = (step: number) => {
    if (index === null) return;
    onNavigate((index + step + photos.length) % photos.length);
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Photo viewer"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
      // Clicking the empty area around the photo closes the viewer.
      onClick={(event) => event.target === event.currentTarget && onClose()}
      onPointerDown={(event) => (swipeStartX.current = event.clientX)}
      onPointerUp={(event) => {
        if (swipeStartX.current === null) return;
        const distance = event.clientX - swipeStartX.current;
        swipeStartX.current = null;
        if (Math.abs(distance) > SWIPE_THRESHOLD) go(distance < 0 ? 1 : -1);
      }}
    >
      {photo && index !== null && (
        <>
          <button type="button" className={styles.close} onClick={onClose}>
            <span className="visually-hidden">Close</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M4.5 5c4.6 4.2 9.4 9.1 15 14.4" />
              <path d="M19.2 4.6C14.4 9 9.6 13.8 4.8 19.3" />
            </svg>
          </button>

          <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)}>
            <span className="visually-hidden">Previous photo</span>
            <HandArrow className={`${styles.arrow} ${styles.arrowBack}`} />
          </button>

          <figure className={styles.figure}>
            {/* Frame with the photo's own aspect ratio, as large as the screen allows:
                full width, unless that would make it taller than the space above the caption. */}
            <div
              className={styles.frame}
              style={{
                aspectRatio: `${photo.src.width} / ${photo.src.height}`,
                width: `min(100%, calc(var(--lightbox-max-height) * ${photo.src.width / photo.src.height}))`,
              }}
            >
              <Image
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                fill
                placeholder="blur"
                sizes="92vw"
                className={styles.image}
              />
            </div>
            <figcaption className={styles.caption}>
              {photo.caption && <span className={styles.captionText}>{photo.caption}</span>}
              <span className={styles.counter}>
                {index + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>

          <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(1)}>
            <span className="visually-hidden">Next photo</span>
            <HandArrow className={styles.arrow} />
          </button>
        </>
      )}
    </dialog>
  );
}
