"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { CUBIC, IMAGE_REVEAL } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

interface RevealImageProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

export function RevealImage({ children, className, delay = 0 }: RevealImageProps) {
  const reduceMotion = useReducedMotion();
  const transition = { duration: IMAGE_REVEAL.duration, ease: CUBIC.outExpo, delay };

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={reduceMotion ? false : { clipPath: IMAGE_REVEAL.inset }}
      whileInView={{ clipPath: IMAGE_REVEAL.open }}
      viewport={VIEWPORT}
      transition={transition}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: IMAGE_REVEAL.scale }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={transition}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
