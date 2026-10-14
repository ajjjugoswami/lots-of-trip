"use client";

import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa6";
import { CUBIC } from "@/lib/motion/tokens";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: CUBIC.outExpo, delay: 1 }}
      className="group fixed right-4 bottom-4 z-40 flex h-12 items-center overflow-hidden rounded-full bg-[#25d366] pr-3.5 pl-3.5 text-white shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-[#1ebe5a] md:right-6 md:bottom-6"
    >
      <FaWhatsapp className="size-6 shrink-0" />
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-[max-width,margin] duration-500 ease-out-expo group-hover:ml-2 group-hover:max-w-40">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
