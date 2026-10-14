"use client";

import { useRef } from "react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { useMotionReady } from "@/components/motion/useMotionReady";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { padIndex } from "@/lib/utils/format";
import type { Destination } from "@/types/destination";
import styles from "./DestinationGallery.module.css";

export function DestinationGallery({ destinations, total }: { destinations: Destination[]; total: number }) {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotionReady();

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
            },
          },
        });
        gsap.from("[data-gallery-card]", {
          yPercent: 12,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%", once: true },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [reduced], scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden py-section md:flex md:h-svh md:flex-col md:justify-center md:py-0">
      <div className="container-x mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-5 flex items-center gap-3 text-slate">
            <span>04</span>
            <span className="h-px w-10 bg-ink/30" />
            <span>Destinations</span>
          </p>
          <h2 className="font-display text-display-lg">
            {total} places, <em className="italic">one range</em>
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden h-px w-40 overflow-hidden bg-line md:block">
            <span ref={progressRef} className={styles.progress} />
          </span>
          <ButtonLink href="/destinations" variant="outline">
            View all
          </ButtonLink>
        </div>
      </div>

      <div ref={trackRef} className={styles.track}>
        {destinations.map((destination, index) => (
          <div key={destination.slug} data-gallery-card className={styles.card}>
            <DestinationCard
              destination={destination}
              index={padIndex(index)}
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 24vw, 78vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
