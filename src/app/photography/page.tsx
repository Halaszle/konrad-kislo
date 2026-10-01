import type { Metadata } from "next";
import { HandLink } from "@/components/HandLink/HandLink";
import { PhotoGrid } from "@/components/PhotoGrid/PhotoGrid";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { photography } from "@/content/site";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Photography",
  description: photography.intro.join(". "),
  alternates: { canonical: "/photography" },
};

export default function PhotographyPage() {
  return (
    <section className={`section ${styles.page}`} aria-labelledby="gallery-title">
      <div className="container">
        <SectionTitle id="gallery-title" intro={photography.intro}>
          Photography
        </SectionTitle>

        <PhotoGrid rows={photography.rows} priority />

        <div className={styles.back}>
          <HandLink href="/" direction="back">
            Back to home
          </HandLink>
        </div>
      </div>
    </section>
  );
}
