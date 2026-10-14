"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { DURATION, EASE, STAGGER } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { useMotionReady } from "./useMotionReady";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export function FadeUp({ children, className, delay = 0, stagger = false }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready, reduced, dependencies } = useMotionReady();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !ready) return;
      const targets = stagger ? Array.from(element.children) : element;
      if (reduced) {
        gsap.set(element, { autoAlpha: 1 });
        return;
      }
      gsap.set(element, { autoAlpha: 1 });
      gsap.from(targets, {
        y: 48,
        autoAlpha: 0,
        duration: DURATION.reveal,
        ease: EASE.outExpo,
        delay,
        stagger: stagger ? STAGGER.cards : 0,
        scrollTrigger: { trigger: element, start: "top 90%", once: true },
      });
    },
    { dependencies, scope: ref },
  );

  return (
    <div ref={ref} className={cn("invisible", className)}>
      {children}
    </div>
  );
}
