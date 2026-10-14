"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import { CloseIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { mainNav, siteConfig } from "@/content/site";
import { CUBIC } from "@/lib/motion/tokens";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const links = [...mainNav, { label: "Plan a trip", href: "/contact" }];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: CUBIC.inOutQuart }}
          data-lenis-prevent
          className="fixed inset-0 z-[55] flex flex-col bg-pine-deep text-snow"
        >
          <div className="container-x flex h-20 items-center justify-between">
            <span className="eyebrow text-snow/60">Menu</span>
            <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-10 place-items-center">
              <CloseIcon className="size-6" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center gap-1">
            {links.map((item, index) => (
              <div key={item.href} className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "110%" }}
                  transition={{ duration: 0.8, ease: CUBIC.outExpo, delay: 0.25 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-baseline gap-4 py-1 font-display text-display-md transition-colors hover:text-saffron"
                  >
                    <span className="eyebrow w-8 text-snow/40">{String(index + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </motion.div>
              </div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            exit={{ opacity: 0 }}
            className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-line-light py-6 text-sm"
          >
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <WhatsAppIcon className="size-5" /> WhatsApp
            </a>
            <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
              <InstagramIcon className="size-5" /> {siteConfig.social.instagram.handle}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
