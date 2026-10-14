"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { TextLink } from "@/components/ui/TextLink";
import { mainNav } from "@/content/site";
import { CUBIC } from "@/lib/motion/tokens";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(current > previous && current > 160);
  });

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: CUBIC.outExpo }}
        className="fixed inset-x-0 top-0 z-50 text-snow mix-blend-difference"
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-9 text-sm lg:flex">
            {mainNav.map((item) => (
              <TextLink key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </TextLink>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link href="/contact" className="hidden text-sm sm:inline-flex">
              <span className="eyebrow">Plan a trip</span>
              <span className="ml-2 inline-block size-1.5 translate-y-1 rounded-full bg-current" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center lg:hidden"
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
