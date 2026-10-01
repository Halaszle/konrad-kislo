import Image from "next/image";

import { revealDelay } from "@/components/Reveal/revealDelay";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { bandReleases, featuredRelease, type Release } from "@/content/site";

import styles from "./Discography.module.css";

type ReleaseCardProps = {
  release: Release;
  featured?: boolean;
};

/**
 * One release: cover, then everything about it (artist, title, description, link) grouped together.
 * The featured variant places the same content next to a larger cover.
 */
function ReleaseCard({ release, featured = false }: ReleaseCardProps) {
  const isExternal = release.listenUrl?.startsWith("http");

  return (
    <article className={featured ? `grid-12 ${styles.featured}` : styles.card} data-reveal>
      <Image
        src={release.cover}
        alt={`Cover of ${release.title} by ${release.artist}`}
        placeholder="blur"
        sizes={featured ? "(min-width: 48rem) 384px, 100vw" : "(min-width: 48rem) 33vw, 100vw"}
        className={styles.cover}
      />
      <div className={styles.body}>
        <h3 className={styles.heading}>
          <span className={styles.artist}>{release.artist}</span>
          {/* keeps screen readers from gluing artist and title into one word */}
          <span className="visually-hidden">, </span>
          <span className={styles.album}>{release.title}</span>
        </h3>
        <p className={styles.description}>{release.description}</p>
        {release.listenUrl && (
          <a
            href={release.listenUrl}
            className={`text-link ${styles.listen}`}
            {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          >
            Listen
            <span className="visually-hidden">
              {" "}
              to {release.title} by {release.artist}
              {isExternal && " (opens in a new tab)"}
            </span>
          </a>
        )}
      </div>
    </article>
  );
}

export function Discography() {
  return (
    <section id="music" className={`section ${styles.section}`} aria-labelledby="music-title">
      <div className="container">
        <SectionTitle id="music-title">Music &amp; Discography</SectionTitle>

        <ReleaseCard release={featuredRelease} featured />

        {/* Hand-drawn line: a slightly wobbly path stretched to the full width, stroke width kept constant */}
        <div className={styles.divider} role="separator" data-reveal="draw">
          <svg viewBox="0 0 1000 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M2 7.2c58-1.6 121-2.1 188-1.2 71 1 132 2.6 205 1.6 64-.9 118-2.9 190-2.4 77 .5 133 2.8 205 2.1 72-.7 136-2.3 208-1.3" />
          </svg>
        </div>

        <ul className={`grid-12 ${styles.releases}`} aria-label="Releases with Red Pine Mushroom">
          {bandReleases.map((release, index) => (
            <li key={release.id} className={styles.releaseItem} style={revealDelay(index)}>
              <ReleaseCard release={release} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
