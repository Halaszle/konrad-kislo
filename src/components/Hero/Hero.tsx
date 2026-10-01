import Image from "next/image";

import { site } from "@/content/site";

import styles from "./Hero.module.css";
import { HeroParallax } from "./HeroParallax";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroParallax>
        <Image
          src={site.heroImage}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className={styles.image}
        />
      </HeroParallax>
      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          {site.name}
        </h1>
        <p className={styles.tagline}>{site.tagline.join(" · ")}</p>
      </div>
    </section>
  );
}
