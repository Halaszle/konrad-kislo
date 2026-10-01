import Link from "next/link";

import { SectionTitle } from "@/components/SectionTitle/SectionTitle";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`section ${styles.page}`}>
      <div className="container">
        <SectionTitle>Lost in the fog</SectionTitle>
        <p className={styles.text}>The page you are looking for doesn’t exist.</p>
        <Link href="/" className="text-link">
          Back to home
        </Link>
      </div>
    </section>
  );
}
