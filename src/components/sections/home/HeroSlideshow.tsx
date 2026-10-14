"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { useDarkScrollbar } from "@/hooks/useDarkScrollbar";
import { cn } from "@/lib/utils/cn";
import type { ImageAsset } from "@/types/image";
import styles from "./HeroSlideshow.module.css";

export interface HeroSlide {
  image: ImageAsset;
  caption: string;
}

const INTERVAL_MS = 5000;

export function HeroSlideshow({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  useDarkScrollbar(sectionRef);

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % slides.length), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion, slides.length]);

  return (
    <section ref={sectionRef} className="relative isolate flex flex-col overflow-hidden bg-night text-white md:min-h-svh">
      <div className="absolute inset-0 -z-10" aria-hidden>
        {slides.map((slide, index) => (
          <div key={slide.image.src} className={styles.slide} data-active={index === active || undefined}>
            <AppImage image={slide.image} sizes="100vw" preload={index === 0} alt="" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/35 to-black/80 md:from-black/55 md:via-black/15 md:to-black/75" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/50 via-black/10 to-transparent" />

      <div className="container-x flex flex-1 flex-col justify-end pt-24 pb-6 sm:pt-32 md:pt-36 md:pb-10">
        {children}

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex gap-1.5" role="tablist" aria-label="Hero photos">
            {slides.map((slide, index) => (
              <button
                key={slide.image.src}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={slide.caption}
                onClick={() => setActive(index)}
                className="group py-2"
              >
                <span className={styles.track}>
                  <span
                    key={index === active ? `active-${active}` : "idle"}
                    className={cn(styles.fill, index === active && !reducedMotion && styles.running, index === active && reducedMotion && styles.full)}
                  />
                </span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-right text-[11px] tracking-[0.18em] text-white/60 uppercase">
            {slides[active].caption}
          </p>
        </div>
      </div>
    </section>
  );
}
