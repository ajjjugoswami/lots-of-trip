"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { CUBIC } from "@/lib/motion/tokens";

export function HeroImage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: CUBIC.outExpo, delay: 0.3 }}
      className="relative aspect-4/3 overflow-hidden rounded-[28px] bg-pine sm:aspect-16/9 md:rounded-[36px] lg:aspect-21/9"
    >
      {children}
    </motion.div>
  );
}
