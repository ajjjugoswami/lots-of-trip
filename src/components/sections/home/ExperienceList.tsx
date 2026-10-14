"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { useIsTouch } from "@/hooks/useIsTouch";
import { CUBIC } from "@/lib/motion/tokens";
import { padIndex } from "@/lib/utils/format";
import type { ImageAsset } from "@/types/image";

export interface ExperienceItem {
  type: string;
  label: string;
  description: string;
  count: number;
  image: ImageAsset;
}

const SPRING = { stiffness: 220, damping: 26, mass: 0.7 };

export function ExperienceList({ items }: { items: ExperienceItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const isTouch = useIsTouch();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);

  const onMove = (event: PointerEvent<HTMLUListElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  };

  return (
    <section className="container-x py-section">
      <SectionIntro index="07" label="Ways to travel" title="Choose how you want to feel up there" />

      <ul
        className="relative mt-16 border-t border-line md:mt-24"
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
      >
        {items.map((item, index) => (
          <li key={item.type} onPointerEnter={() => setActive(index)} className="border-b border-line">
            <Link
              href={`/destinations?type=${item.type}`}
              className="group grid grid-cols-12 items-center gap-4 py-7 md:py-9"
            >
              <span className="eyebrow col-span-2 text-slate md:col-span-1">{padIndex(index)}</span>
              <span className="col-span-10 font-display text-display-md transition-transform duration-700 ease-out-expo group-hover:translate-x-4 md:col-span-6">
                {item.label}
              </span>
              <span className="col-span-10 col-start-3 text-sm text-slate md:col-span-3 md:col-start-auto">
                {item.description}
              </span>
              <span className="col-span-12 flex items-center justify-between md:col-span-2 md:justify-end md:gap-6">
                <span className="eyebrow text-slate">{item.count} places</span>
                <ArrowUpRightIcon className="size-5 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
              </span>
            </Link>
          </li>
        ))}

        {!isTouch && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block"
            style={{ x: springX, y: springY }}
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key={items[active].type}
                  initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 50% 50% 50%)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.55, ease: CUBIC.outExpo }}
                  className="absolute -top-36 -left-28 h-72 w-56 overflow-hidden"
                >
                  <AppImage image={items[active].image} sizes="14rem" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </ul>
    </section>
  );
}
