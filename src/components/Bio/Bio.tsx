import Image from "next/image";

import { revealDelay } from "@/components/Reveal/revealDelay";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { bio } from "@/content/site";

import styles from "./Bio.module.css";

export function Bio() {
  return (
    <section id="bio" className={`section ${styles.section}`} aria-labelledby="bio-title">
      <div className="container">
        <SectionTitle id="bio-title">Bio</SectionTitle>

        <div className={`grid-12 ${styles.grid}`}>
          <Image
            src={bio.portrait}
            alt={bio.portraitAlt}
            placeholder="blur"
            sizes="(min-width: 76rem) 384px, (min-width: 48rem) 33vw, 100vw"
            className={styles.portrait}
            data-reveal
          />
          <div className={`prose ${styles.text}`} data-reveal style={revealDelay(1)}>
            {bio.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
