"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { headerOverlayRoutes, mainNav, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils/cn";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import type { HeaderData } from "@/types/site";
import styles from "./Header.module.css";
import { MegaMenu } from "./MegaMenu";
import { MenuToggle } from "./MenuToggle";
import { MobileMenu } from "./MobileMenu";

const isOverlayRoute = (pathname: string) =>
  headerOverlayRoutes.some((route) => (route === "/" ? pathname === "/" : pathname.startsWith(route)));

export function Header({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > window.innerHeight * 0.7));

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

  const overlay = isOverlayRoute(pathname) && !scrolled && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={styles.header}
      data-overlay={overlay || undefined}
      data-menu-open={open || undefined}
    >
      <div className="container-x relative flex h-14 items-center gap-4">
        <div className="flex flex-1 items-center">
          <Logo tone={overlay ? "dark" : "light"} />
        </div>

        <nav aria-label="Main" className="hidden shrink-0 items-center gap-1 self-stretch lg:flex">
          <MegaMenu data={data} label="Destinations" />
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(styles.navLink, "px-3.5 py-1.5 text-[13px] whitespace-nowrap")}
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
            className={cn(styles.iconButton, "hidden size-8 place-items-center rounded-full sm:grid")}
          >
            <InstagramIcon className="size-4" />
          </a>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(styles.ghost, "hidden h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium whitespace-nowrap lg:inline-flex")}
          >
            <WhatsAppIcon className="size-3.5" />
            WhatsApp
          </a>
          {!open && (
            <Link
              href="/contact"
              className={cn(styles.cta, "group inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold whitespace-nowrap")}
            >
              Plan a trip
              <svg viewBox="0 0 12 12" aria-hidden className="hidden size-3 transition-transform duration-300 group-hover:translate-x-0.5 sm:block">
                <path d="M2 6h8M7 3l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
          <MenuToggle open={open} onToggle={toggle} />
        </div>
      </div>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}
