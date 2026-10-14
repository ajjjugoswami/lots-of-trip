"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/motion/gsap";
import { DURATION, EASE, STAGGER } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { useMotionReady } from "./useMotionReady";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

interface RevealTextProps {
  as?: Tag;
  children: ReactNode;
  className?: string;
  delay?: number;
  onScroll?: boolean;
  split?: "lines" | "words";
}

export function RevealText({
  as = "div",
  children,
  className,
  delay = 0,
  onScroll = true,
  split = "lines",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const { ready, reduced, dependencies } = useMotionReady();
  const Component = as as ElementType;

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !ready) return;
      if (reduced) {
        gsap.set(element, { autoAlpha: 1 });
        return;
      }

      const instance = SplitText.create(element, {
        type: split === "lines" ? "lines" : "words,lines",
        mask: split,
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          gsap.set(element, { autoAlpha: 1 });
          return gsap.from(split === "lines" ? self.lines : self.words, {
            yPercent: 115,
            duration: DURATION.reveal,
            ease: EASE.outExpo,
            stagger: split === "lines" ? STAGGER.lines : STAGGER.words,
            delay,
            scrollTrigger: onScroll ? { trigger: element, start: "top 90%", once: true } : undefined,
          });
        },
      });

      return () => instance.revert();
    },
    { dependencies, scope: ref },
  );

  return (
    <Component ref={ref} className={cn("invisible", className)}>
      {children}
    </Component>
  );
}
