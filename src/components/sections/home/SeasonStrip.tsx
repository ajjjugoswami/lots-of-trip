"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { MONTHS, monthShort, stateLabel } from "@/lib/utils/format";
import type { Destination } from "@/types/destination";

export function SeasonStrip({ destinations }: { destinations: Destination[] }) {
  const [month, setMonth] = useState(10);
  const matches = destinations.filter((item) => item.bestMonths.includes(month));

  return (
    <section className="bg-paper py-section">
      <div className="container-x">
        <SectionIntro
          index="06"
          label="When to go"
          title={
            <>
              Every month, <em className="italic">somewhere</em> is perfect
            </>
          }
          aside={<p className="text-slate">Pick a month to see where the mountains are at their best.</p>}
        />

        <div role="tablist" aria-label="Months" className="mt-16 grid grid-cols-6 border-t border-line md:grid-cols-12">
          {MONTHS.map((name, index) => {
            const value = index + 1;
            const active = value === month;
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMonth(value)}
                className={cn(
                  "relative py-5 text-left transition-colors duration-300",
                  active ? "text-ink" : "text-slate hover:text-ink",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="month-indicator"
                    transition={{ duration: 0.6, ease: CUBIC.outExpo }}
                    className="absolute inset-x-0 -top-px h-0.5 bg-saffron"
                  />
                )}
                <span className="eyebrow">{monthShort(value)}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={month}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5, ease: CUBIC.outExpo }}
                className="font-display text-display-lg"
              >
                {MONTHS[month - 1]}
              </motion.p>
            </AnimatePresence>
            <p className="mt-4 text-slate">
              {matches.length} {matches.length === 1 ? "destination" : "destinations"} in season
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:col-span-8 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {matches.map((destination, index) => (
                <motion.li
                  key={`${month}-${destination.slug}`}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03, duration: 0.6, ease: CUBIC.outExpo } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                >
                  <Link href={`/destinations/${destination.slug}`} className="group block" data-cursor="Explore">
                    <div className="relative aspect-[4/3] overflow-hidden bg-snow">
                      <AppImage
                        image={destination.images[0]}
                        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 28vw, 45vw"
                        className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium">{destination.name}</p>
                    <p className="eyebrow mt-1 text-slate">{stateLabel(destination.state)}</p>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>
  );
}
