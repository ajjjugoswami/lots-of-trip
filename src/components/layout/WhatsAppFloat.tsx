"use client";

import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { usePreloaderDone } from "@/hooks/usePreloaderDone";
import { CUBIC } from "@/lib/motion/tokens";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";

export function WhatsAppFloat() {
  const visible = usePreloaderDone();

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: CUBIC.outExpo, delay: 1.2 }}
          className="group fixed right-4 bottom-4 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-pine pr-4 pl-4 text-snow shadow-[0_10px_40px_-10px_rgb(19_37_29/0.6)] transition-[gap,background-color] duration-500 ease-out-expo hover:gap-3 hover:bg-ink md:right-8 md:bottom-8"
        >
          <WhatsAppIcon className="size-6 shrink-0" />
          <span className="max-w-0 overflow-hidden text-sm whitespace-nowrap transition-[max-width] duration-500 ease-out-expo group-hover:max-w-40">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
