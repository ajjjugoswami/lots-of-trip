"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { EASE } from "@/lib/motion/tokens";
import { useMotionReady } from "./useMotionReady";

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

const format = new Intl.NumberFormat("en-IN");

export function Counter({ value, suffix = "", className, duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { ready, reduced, dependencies } = useMotionReady();

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !ready || reduced) return;
      const state = { current: 0 };
      element.textContent = `0${suffix}`;
      gsap.to(state, {
        current: value,
        duration,
        ease: EASE.outQuart,
        scrollTrigger: { trigger: element, start: "top 92%", once: true },
        onUpdate: () => {
          element.textContent = `${format.format(Math.round(state.current))}${suffix}`;
        },
      });
    },
    { dependencies: [...dependencies, value], scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {format.format(value)}
      {suffix}
    </span>
  );
}
