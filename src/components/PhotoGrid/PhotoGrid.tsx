"use client";

import Image from "next/image";
import { useState } from "react";

import { Lightbox } from "@/components/Lightbox/Lightbox";
import { revealDelay } from "@/components/Reveal/revealDelay";
import type { Photo } from "@/content/site";

import styles from "./PhotoGrid.module.css";

type PhotoGridProps = {
  rows: Photo[][];
  /** Mark the first photo as high priority when the grid is above the fold. */
  priority?: boolean;
};

/**
 * Justified photo grid: every photo in a row keeps its own aspect ratio,
 * and widths are distributed so that all photos in the row share one height.
 * Clicking a photo opens it full screen in the lightbox.
 */
export function PhotoGrid({ rows, priority = false }: PhotoGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const photos = rows.flat();

  // Position of each row's first photo in the flat list, for the lightbox index.
  const rowOffsets = rows.map((_, rowIndex) =>
    rows.slice(0, rowIndex).reduce((count, row) => count + row.length, 0),
  );

  return (
    <>
      <div className={styles.grid}>
        {rows.map((row, rowIndex) => (
          <div key={row.map((photo) => photo.id).join("-")} className={styles.row}>
            {row.map((photo, photoIndex) => {
              const ratio = photo.src.width / photo.src.height;

              return (
                <figure
                  key={photo.id}
                  className={styles.item}
                  data-reveal
                  style={{
                    flexGrow: ratio,
                    aspectRatio: `${photo.src.width} / ${photo.src.height}`,
                    ...revealDelay(photoIndex),
                  }}
                >
                  <button
                    type="button"
                    className={styles.open}
                    onClick={() => setOpenIndex(rowOffsets[rowIndex] + photoIndex)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      placeholder="blur"
                      priority={priority && rowIndex === 0 && photoIndex === 0}
                      sizes={`(min-width: 48rem) ${Math.round(100 / row.length)}vw, 100vw`}
                      className={styles.image}
                    />
                    <span className="visually-hidden">Open full screen</span>
                  </button>
                  {photo.caption && <figcaption className={styles.caption}>{photo.caption}</figcaption>}
                </figure>
              );
            })}
          </div>
        ))}
      </div>

      <Lightbox photos={photos} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  );
}
