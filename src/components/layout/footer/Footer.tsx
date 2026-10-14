import Link from "next/link";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { bookingStatus, companyNav, legalNav, siteConfig } from "@/content/site";
import { getDestinationsByState } from "@/lib/data/destinations";
import { getTours } from "@/lib/data/tours";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import type { NavItem } from "@/types/site";
import { FooterColumn } from "./FooterColumn";
import styles from "./Footer.module.css";

const toDestinationLinks = (state: "uttarakhand" | "himachal"): NavItem[] =>
  getDestinationsByState(state)
    .slice(0, 6)
    .map((item) => ({ label: item.name, href: `/destinations/${item.slug}` }));

export function Footer() {
  const { contact, social } = siteConfig;
  const columns = [
    { title: "Uttarakhand", items: toDestinationLinks("uttarakhand") },
    { title: "Himachal", items: toDestinationLinks("himachal") },
    {
      title: "Journeys",
      items: getTours()
        .slice(0, 6)
        .map((tour) => ({ label: tour.title, href: `/tours/${tour.slug}` })),
    },
    { title: "Company", items: companyNav },
  ];

  return (
    <footer className={styles.footer}>
      <div className="container-x pt-14 sm:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo size="lg" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-slate">{siteConfig.description}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-snow px-3 py-1 text-[12px] text-slate">
              <span className={styles.liveDot} aria-hidden />
              {bookingStatus}
            </p>
            <ul className="mt-8 space-y-1.5 text-[14px]">
              <li>
                <a href={`tel:${contact.phoneE164}`} className="transition-colors hover:text-accent">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-accent">
                  {contact.email}
                </a>
              </li>
              <li className="text-slate">{contact.hours}</li>
            </ul>
          </div>

          {columns.map((column) => (
            <FooterColumn key={column.title} title={column.title} items={column.items} />
          ))}
        </div>

        <p className={styles.wordmark} aria-hidden>
          Lots of Trip
        </p>

        <div className="flex flex-col gap-5 border-t border-line py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-8">
          <nav aria-label="Footer" className="lg:order-2">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-center lg:gap-x-8">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] transition-colors hover:text-slate lg:text-[14px]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between gap-4 lg:contents">
            <p className="text-[13px] text-slate lg:order-1 lg:text-[14px]">
              © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 lg:order-3">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className={styles.social}
              >
                <WhatsAppIcon className="size-4" />
              </a>
              <a
                href={social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${social.instagram.handle}`}
                className={styles.social}
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>
        </div>

        <p className="mx-auto max-w-4xl pb-8 text-[11px] leading-relaxed text-slate/80 sm:pb-10 sm:text-center">
          {siteConfig.name} is based in {contact.address}. Destination photographs are sourced from
          Wikimedia Commons under open licences —{" "}
          <Link href="/credits" className="underline underline-offset-2 hover:text-ink">
            see full credits
          </Link>
          . Prices and itineraries shown are indicative and confirmed at the time of booking.
        </p>
      </div>
    </footer>
  );
}
