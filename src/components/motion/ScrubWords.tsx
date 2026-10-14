"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/motion/gsap";
import { useMotionReady } from "./useMotionReady";

export function ScrubWords({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { reduced } = useMotionReady();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || reduced) return;
      const split = SplitText.create(element, {
        type: "words",
        autoSplit: true,
        onSplit: (self) =>
          gsap.fromTo(
            self.words,
            { opacity: 0.12 },
            {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: element, start: "top 80%", end: "bottom 45%", scrub: true },
            },
          ),
      });
      return () => split.revert();
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
