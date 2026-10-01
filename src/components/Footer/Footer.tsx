import { HandLink } from "@/components/HandLink/HandLink";
import { SectionTitle } from "@/components/SectionTitle/SectionTitle";
import { contact } from "@/content/site";

import { CurrentYear } from "./CurrentYear";
import styles from "./Footer.module.css";
import { InstagramIcon } from "./InstagramIcon";

export function Footer() {
  const phoneHref = `tel:${contact.phone.replace(/\s+/g, "")}`;
  const socials = contact.socials.filter((social) => social.url);

  return (
    <footer id="contact" className={`section ${styles.footer}`} aria-labelledby="contact-title">
      <div className={`container ${styles.inner}`}>
        <SectionTitle id="contact-title" intro={contact.lead}>
          {contact.heading}
        </SectionTitle>

        <address className={styles.details}>
          <span>{contact.location}</span>
          <a href={phoneHref} className={styles.link}>
            {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className={styles.link}>
            {contact.email}
          </a>
        </address>

        {socials.length > 0 && (
          <ul className={styles.socials} aria-label="Social media">
            {socials.map((social) => {
              const isExternal = social.url.startsWith("http");

              return (
                <li key={social.label}>
                  <a
                    href={social.url}
                    className={styles.social}
                    {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <InstagramIcon className={styles.socialIcon} />
                    <span>
                      <span className="visually-hidden">{social.platform}: </span>
                      {social.label}
                      {isExternal && <span className="visually-hidden"> (opens in a new tab)</span>}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        <div className={styles.backToTop}>
          <HandLink href="#main" direction="up">
            Back to top
          </HandLink>
        </div>

        <p className={styles.copyright}>
          © <CurrentYear fallback={new Date().getFullYear()} /> Konrad Kislo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
