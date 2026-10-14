"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Logo } from "@/components/ui/Logo";
import { mainNav, siteConfig } from "@/content/site";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import type { HeaderData } from "@/types/site";
import styles from "./Header.module.css";
import { MegaMenu } from "./MegaMenu";
import { MenuToggle } from "./MenuToggle";
import { MobileMenu } from "./MobileMenu";

export function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  const toggle = () => {
    setOpenedAt(pathname);
    setOpen((value) => !value);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={styles.header} data-menu-open={open || undefined}>
      <div className="mx-auto flex h-12 max-w-360 items-center gap-4 px-4 sm:px-8 lg:px-12">
        <div className="flex flex-1 items-center">
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden shrink-0 items-center gap-1 self-stretch lg:flex">
          <MegaMenu data={data} label="Destinations" />
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={styles.navLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2">
          <a
            href={siteConfig.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${siteConfig.social.instagram.handle}`}
            className={styles.iconButton}
          >
            <InstagramIcon className="size-4" />
          </a>
          <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className={styles.ghost}>
            <WhatsAppIcon className="size-3.5" />
            WhatsApp
          </a>
          <Link href="/contact" className={`${styles.cta} ${styles.ctaDesktop}`}>
            Plan a trip
            <ArrowRight className="size-3" aria-hidden />
          </Link>
          {!open && (
            <Link href="/contact" className={`${styles.cta} ${styles.ctaMobile}`}>
              Plan a trip
            </Link>
          )}
          <MenuToggle open={open} onToggle={toggle} />
        </div>
      </div>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}
