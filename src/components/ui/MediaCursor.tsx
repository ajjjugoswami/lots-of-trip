"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { CUBIC } from "@/lib/motion/tokens";

const SPRING = { stiffness: 380, damping: 32, mass: 0.6 };

export function MediaCursor() {
  const isTouch = useIsTouch();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[65]"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        initial={false}
        animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
        transition={{ duration: 0.5, ease: CUBIC.outExpo }}
        className="-mt-12 -ml-12 grid size-24 place-items-center rounded-full bg-snow text-ink"
      >
        <span className="eyebrow">{label}</span>
      </motion.div>
    </motion.div>
  );
}
