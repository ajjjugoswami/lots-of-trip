"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { EASE, PRELOADER_DONE_EVENT } from "@/lib/motion/tokens";
import type { ImageAsset } from "@/types/image";

function announceDone() {
  window.__lotPreloaderDone = true;
  window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
}

export function Preloader({ images }: { images: ImageAsset[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [finished, setFinished] = useState(false);
  const reduced = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (finished) lenis.start();
    else lenis.stop();
  }, [lenis, finished]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      if (reduced) {
        announceDone();
        setFinished(true);
        return;
      }

      const frames = gsap.utils.toArray<HTMLElement>("[data-frame]", root);
      const progress = { value: 0 };

      gsap
        .timeline({
          defaults: { ease: EASE.inOutQuart },
          onComplete: () => setFinished(true),
        })
        .to(progress, {
          value: 100,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
            }
          },
        })
        .fromTo(
          frames,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, stagger: 0.45 },
          0.1,
        )
        .from("[data-frame] img", { scale: 1.4, duration: 1.4, stagger: 0.45, ease: EASE.outExpo }, 0.1)
        .to("[data-fade]", { autoAlpha: 0, y: -12, duration: 0.5, stagger: 0.04 }, "-=0.2")
        .add(announceDone, "-=0.1")
        .to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1 }, "<");
    },
    { dependencies: [reduced], scope: rootRef },
  );

  if (finished) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-pine-deep p-gutter text-snow"
    >
      <div className="flex items-start justify-between">
        <span data-fade className="eyebrow">Lots of Trip</span>
        <span data-fade className="eyebrow text-right text-snow/60">
          Uttarakhand
          <br />
          Himachal Pradesh
        </span>
      </div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 aspect-[4/5] w-[46vw] max-w-[22rem] -translate-x-1/2 -translate-y-1/2 md:w-[22vw]">
        {images.map((image, index) => (
          <div key={image.src} data-frame data-index={index} className="absolute inset-0 overflow-hidden [clip-path:inset(100%_0_0_0)]">
            <AppImage image={image} sizes="(min-width: 768px) 22vw, 46vw" preload={index === 0} />
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between">
        <span ref={counterRef} data-fade className="font-display text-display-xl tabular-nums">
          000
        </span>
        <span data-fade className="eyebrow max-w-[12rem] text-right text-snow/60">
          Loading the mountains
        </span>
      </div>
    </div>
  );
}
