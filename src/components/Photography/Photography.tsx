import { HandLink } from "@/components/HandLink/HandLink";
import { PhotoGrid } from "@/components/PhotoGrid/PhotoGrid";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { photography } from "@/content/site";

import styles from "./Photography.module.css";

export function Photography() {
  return (
    <section
      id="photography"
      className={`section ${styles.section}`}
      aria-labelledby="photography-title"
    >
      <div className="container">
        <SectionTitle id="photography-title" intro={photography.intro}>
          Photography
        </SectionTitle>

        <PhotoGrid rows={photography.rows} />

        <div className={styles.more}>
          <HandLink href="/photography">View more photographs</HandLink>
        </div>
      </div>
    </section>
  );
}
