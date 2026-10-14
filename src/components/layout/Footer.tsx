import Link from "next/link";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { TextLink } from "@/components/ui/TextLink";
import { footerNav, siteConfig } from "@/content/site";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { FooterWordmark } from "./FooterWordmark";

export function Footer() {
  const { contact, social } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-pine-deep text-snow">
      <div className="container-x grid gap-14 pt-24 pb-12 md:grid-cols-12 md:pt-32">
        <div className="md:col-span-5">
          <p className="eyebrow mb-6 text-snow/50">Lots of Trip</p>
          <p className="max-w-md font-display text-display-md text-balance">
            Mountains are not a destination. They are a pace.
          </p>
        </div>

        {footerNav.map((group) => (
          <div key={group.title} className="md:col-span-2">
            <p className="eyebrow mb-6 text-snow/50">{group.title}</p>
            <ul className="space-y-3 text-sm">
              {group.items.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href}>{item.label}</TextLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-3">
          <p className="eyebrow mb-6 text-snow/50">Talk to us</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${contact.phoneE164}`} className="hover:text-saffron">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-saffron">
                {contact.email}
              </a>
            </li>
            <li className="text-snow/60">{contact.address}</li>
          </ul>
          <div className="mt-8 flex gap-3">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="grid size-11 place-items-center rounded-full border border-line-light transition-colors hover:border-snow hover:bg-snow hover:text-ink"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <a
              href={social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${social.instagram.handle}`}
              className="grid size-11 place-items-center rounded-full border border-line-light transition-colors hover:border-snow hover:bg-snow hover:text-ink"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <FooterWordmark />

      <div className="container-x flex flex-col gap-3 border-t border-line-light py-6 text-xs text-snow/50 sm:flex-row sm:justify-between">
        <p>
          © {siteConfig.copyrightYear} {siteConfig.name}. Photographs from Wikimedia Commons —{" "}
          <Link href="/credits" className="underline underline-offset-4 hover:text-snow">
            see credits
          </Link>
          .
        </p>
        <p>Made in the mountains · Dehradun</p>
      </div>
    </footer>
  );
}
