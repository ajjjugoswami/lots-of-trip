import { ArrowRight, ChevronRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { mobileNav, siteConfig } from "@/content/site";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import styles from "./MobileMenu.module.css";

const POPULAR = [
  { label: "Kedarnath", href: "/destinations/kedarnath" },
  { label: "Spiti Valley", href: "/destinations/spiti-valley" },
  { label: "Valley of Flowers", href: "/destinations/valley-of-flowers" },
  { label: "Chandratal", href: "/destinations/chandratal" },
  { label: "Auli", href: "/destinations/auli" },
  { label: "Manali", href: "/destinations/manali" },
];

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const { contact, social } = siteConfig;

  return (
    <div id="mobile-menu" className={styles.menu}>
      <nav aria-label="Mobile" className={styles.body}>
        <ul>
          {mobileNav.map((item) => (
            <li key={item.href} className={styles.rise}>
              <Link href={item.href} onClick={onClose} className={styles.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={`${styles.rise} mt-10`}>
          <p className={styles.label}>Popular right now</p>
          <ul className={styles.chips}>
            {POPULAR.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={onClose} className={styles.chip}>
                  <span className="min-w-0 truncate">{item.label}</span>
                  <ChevronRight className="size-4 shrink-0 text-slate" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.rise} mt-10 space-y-2.5 text-[14px]`}>
          <p className={styles.label}>Talk to us</p>
          <a href={`tel:${contact.phoneE164}`} className="flex items-center gap-2.5">
            <Phone className="size-4 text-slate" aria-hidden />
            {contact.phoneDisplay}
          </a>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5">
            <Mail className="size-4 text-slate" aria-hidden />
            {contact.email}
          </a>
          <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
            <InstagramIcon className="size-4 text-slate" />
            {social.instagram.handle}
          </a>
        </div>
      </nav>

      <div className={styles.actions}>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.ghost}`}
        >
          <WhatsAppIcon className="size-4" />
          WhatsApp
        </a>
        <Link href="/contact" onClick={onClose} className={`${styles.button} ${styles.solid}`}>
          Plan a trip
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
