import styles from "./SectionTitle.module.css";

type SectionTitleProps = {
  id?: string;
  children: React.ReactNode;
  /** Optional lines of text shown under the title. */
  intro?: readonly string[];
};

/**
 * Heading block used by every section: hand-lettered, widely tracked title,
 * an optional intro and a fixed gap to the section content.
 */
export function SectionTitle({ id, children, intro }: SectionTitleProps) {
  return (
    <header className={styles.header} data-reveal>
      <h2 id={id} className={styles.title}>
        {children}
      </h2>
      {intro && (
        <p className={styles.intro}>
          {intro.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      )}
    </header>
  );
}
