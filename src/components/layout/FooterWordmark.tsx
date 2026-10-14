"use client";

import { useRef } from "react";
import { useMotionReady } from "@/components/motion/useMotionReady";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const LETTERS = "Lots of Trip".split("");

export function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { reduced } = useMotionReady();

  useGSAP(
    () => {
      if (!ref.current || reduced) return;
      gsap.from("[data-letter]", {
        yPercent: 100,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 1 },
      });
    },
    { dependencies: [reduced], scope: ref },
  );

  return (
    <p
      ref={ref}
      aria-hidden
      className="container-x flex justify-between overflow-hidden pb-4 font-display text-[19.5vw] leading-[0.8] tracking-tight whitespace-pre text-snow select-none"
    >
      {LETTERS.map((letter, index) => (
        <span key={index} data-letter className="inline-block">
          {letter === " " ? " " : letter}
        </span>
      ))}
    </p>
  );
}
