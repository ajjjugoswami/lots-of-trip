"use client";

import { useRef } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { DURATION, EASE } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import type { ImageAsset } from "@/types/image";
import { useMotionReady } from "./useMotionReady";

interface ImageRevealProps {
  image: ImageAsset;
  sizes: string;
  className?: string;
  imageClassName?: string;
  preload?: boolean;
  parallax?: boolean;
  direction?: "up" | "left" | "right";
}

const CLIP_FROM = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

export function ImageReveal({
  image,
  sizes,
  className,
  imageClassName,
  preload,
  parallax = false,
  direction = "up",
}: ImageRevealProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { ready, reduced, dependencies } = useMotionReady();

  useGSAP(
    () => {
      const frame = frameRef.current;
      const inner = innerRef.current;
      if (!frame || !inner || !ready || reduced) return;

      gsap
        .timeline({ scrollTrigger: { trigger: frame, start: "top 88%", once: true } })
        .fromTo(
          frame,
          { clipPath: CLIP_FROM[direction] },
          { clipPath: "inset(0% 0% 0% 0%)", duration: DURATION.hero, ease: EASE.inOutQuart },
        )
        .fromTo(inner, { scale: 1.35 }, { scale: 1, duration: DURATION.hero * 1.2, ease: EASE.outExpo }, 0);

      if (parallax) {
        gsap.fromTo(
          inner,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    },
    { dependencies, scope: frameRef },
  );

  return (
    <div ref={frameRef} className={cn("relative overflow-hidden bg-paper", className)}>
      <div ref={innerRef} className={cn("absolute inset-0", parallax && "-inset-y-[8%]")}>
        <AppImage image={image} sizes={sizes} preload={preload} className={imageClassName} />
      </div>
    </div>
  );
}
