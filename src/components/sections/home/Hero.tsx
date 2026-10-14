"use client";

import { useRef } from "react";
import { useMotionReady } from "@/components/motion/useMotionReady";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { gsap, SplitText, useGSAP } from "@/lib/motion/gsap";
import { DURATION, EASE, STAGGER } from "@/lib/motion/tokens";
import type { ImageAsset } from "@/types/image";
import { HeroMeta } from "./HeroMeta";

export function Hero({ image }: { image: ImageAsset }) {
  const rootRef = useRef<HTMLElement>(null);
  const { ready, reduced, dependencies } = useMotionReady();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !ready) return;
      gsap.set("[data-hero-hidden]", { autoAlpha: 1 });
      if (reduced) return;

      const split = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines", linesClass: "split-line" });

      gsap
        .timeline({ defaults: { ease: EASE.outExpo } })
        .fromTo(
          "[data-hero-frame]",
          { clipPath: "inset(18% 34% 18% 34%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: DURATION.hero, ease: EASE.inOutQuart },
        )
        .from("[data-hero-image]", { scale: 1.45, duration: DURATION.hero * 1.4 }, 0)
        .from(split.lines, { yPercent: 115, duration: DURATION.reveal, stagger: STAGGER.lines }, 0.7)
        .from("[data-hero-fade]", { autoAlpha: 0, y: 24, duration: DURATION.reveal, stagger: 0.08 }, 0.95);

      const scroll = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-hero-frame]", { yPercent: 22, ease: "none", scrollTrigger: scroll });
      gsap.to("[data-hero-content]", { yPercent: -30, autoAlpha: 0, ease: "none", scrollTrigger: scroll });

      return () => split.revert();
    },
    { dependencies, scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative h-svh min-h-[40rem] overflow-hidden bg-ink text-snow">
      <div data-hero-frame className="absolute inset-0 overflow-hidden">
        <div data-hero-image className="absolute inset-0">
          <AppImage image={image} sizes="100vw" preload alt="Key Monastery above the Spiti river, covered in snow" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
      </div>

      <div
        data-hero-content
        data-hero-hidden
        className="invisible relative z-10 container-x flex h-full flex-col justify-end pb-10 md:pb-14"
      >
        <p data-hero-fade className="eyebrow mb-8 text-snow/75">
          Journeys across Uttarakhand &amp; Himachal Pradesh
        </p>
        <h1 data-hero-title className="max-w-[12ch] font-display text-display-2xl">
          Where the Himalaya <em className="italic">begins</em>
        </h1>
        <div className="mt-10 grid gap-8 border-t border-line-light pt-6 md:mt-14 md:grid-cols-12 md:items-end">
          <p data-hero-fade className="max-w-sm text-sm text-snow/80 md:col-span-4">
            Small-group treks, pilgrimages and slow road journeys — planned by people who grew up
            beneath these peaks.
          </p>
          <HeroMeta />
          <div data-hero-fade className="md:col-span-3 md:justify-self-end">
            <ButtonLink href="/destinations" variant="light">
              Explore destinations
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
