"use client";

import { useRef } from "react";
import { useMotionReady } from "@/components/motion/useMotionReady";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import type { StatePanelData } from "./StatePanel";
import { StatePanel } from "./StatePanel";

export function TwoStates({ panels }: { panels: [StatePanelData, StatePanelData] }) {
  const rootRef = useRef<HTMLElement>(null);
  const { reduced } = useMotionReady();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        timeline
          .to('[data-panel="0"] [data-panel-copy]', { yPercent: -40, autoAlpha: 0 }, 0)
          .fromTo(
            '[data-panel="1"]',
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut" },
            0.1,
          )
          .from('[data-panel="1"] [data-panel-copy]', { yPercent: 40, autoAlpha: 0 }, 0.45);

        if (!reduced) {
          timeline
            .to('[data-panel="0"] [data-panel-image]', { scale: 1.12, yPercent: -6 }, 0)
            .from('[data-panel="1"] [data-panel-image]', { scale: 1.3, yPercent: 10 }, 0.1);
        }
      });
      return () => mm.revert();
    },
    { dependencies: [reduced], scope: rootRef },
  );

  return (
    <section ref={rootRef} aria-label="Two states" className="relative bg-ink text-snow md:h-svh md:overflow-hidden">
      {panels.map((panel, index) => (
        <StatePanel key={panel.slug} panel={panel} index={index} />
      ))}
    </section>
  );
}
