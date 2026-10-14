"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { MONTHS, monthShort } from "@/lib/utils/format";
import type { Destination } from "@/types/destination";

export function SeasonStrip({ destinations }: { destinations: Destination[] }) {
  const [month, setMonth] = useState(10);
  const matches = destinations.filter((item) => item.bestMonths.includes(month));

  return (
    <section className="bg-paper py-section">
      <div className="container-x">
        <SectionIntro
          align="center"
          label="When to go"
          title={
            <>
              Every month, <em>somewhere</em> is perfect.
            </>
          }
          description="Pick a month to see where the mountains are at their best."
        />

        <div className="mt-12 flex justify-center">
          <div
            role="tablist"
            aria-label="Months"
            className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-surface p-1 ring-1 ring-line ring-inset scrollbar-none"
          >
            {MONTHS.map((name, index) => {
              const value = index + 1;
              const active = value === month;
              return (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={name}
                  onClick={() => setMonth(value)}
                  className={cn(
                    "relative shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 md:px-4",
                    active ? "text-snow" : "text-slate hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="month-pill"
                      transition={{ duration: 0.45, ease: CUBIC.outExpo }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  )}
                  <span className="relative">{monthShort(value)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-[15px] text-slate">
          <span className="font-semibold text-ink">{matches.length}</span>{" "}
          {matches.length === 1 ? "destination" : "destinations"} in season in {MONTHS[month - 1]}
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {matches.map((destination, index) => (
              <motion.li
                key={`${month}-${destination.slug}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03, duration: 0.5, ease: CUBIC.outExpo } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <Link
                  href={`/destinations/${destination.slug}`}
                  className="group block overflow-hidden rounded-xl bg-surface transition-shadow duration-300 hover:shadow-[0_12px_30px_rgb(0_0_0/0.08)]"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <AppImage
                      image={destination.images[0]}
                      sizes="(min-width: 1024px) 15rem, (min-width: 640px) 30vw, 45vw"
                      className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                    />
                  </div>
                  <div className="px-4 py-3.5">
                    <p className="text-[15px] font-semibold tracking-tight">{destination.name}</p>
                    <p className="text-[12px] text-slate">{destination.region}</p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}
