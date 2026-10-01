import Image from "next/image";

import { HandLink } from "@/components/HandLink/HandLink";
import { revealDelay } from "@/components/Reveal/revealDelay";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { recordings } from "@/content/site";

import styles from "./Recordings.module.css";

export function Recordings() {
  return (
    <section
      id="recordings"
      className={`section ${styles.section}`}
      aria-labelledby="recordings-title"
    >
      <div className="container">
        <SectionTitle id="recordings-title">Recordings</SectionTitle>

        <div className={`grid-12 ${styles.grid}`}>
          <Image
            src={recordings.image}
            alt={recordings.imageAlt}
            placeholder="blur"
            sizes="(min-width: 76rem) 488px, (min-width: 48rem) 42vw, 100vw"
            className={styles.image}
            data-reveal
          />
          <div className={styles.body} data-reveal style={revealDelay(1)}>
            <div className="prose">
              {recordings.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.cta}>
              <HandLink href="/#contact">Discuss your project</HandLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
