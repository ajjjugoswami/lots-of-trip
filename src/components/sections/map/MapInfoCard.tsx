"use client";

import { CalendarDays, Mountain } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WeatherIcon } from "@/components/ui/WeatherIcon";
import { CUBIC } from "@/lib/motion/tokens";
import { formatAltitude, formatMonthRange } from "@/lib/utils/format";
import type { MapDestination } from "@/types/map";

export function MapInfoCard({ destination }: { destination: MapDestination }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-surface shadow-[0_20px_50px_-20px_rgb(0_0_0/0.25)] ring-1 ring-line">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={destination.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: CUBIC.outExpo }}
        >
          <div className="relative aspect-4/3 bg-paper">
            <AppImage image={destination.image} sizes="(min-width: 1024px) 24rem, 100vw" />
            {destination.weather && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur">
                <WeatherIcon kind={destination.weather.kind} className="size-3.5" />
                {destination.weather.temperature}° · {destination.weather.label}
              </span>
            )}
          </div>
          <div className="p-6">
            <p className="eyebrow text-saffron">{destination.region}</p>
            <h3 className="mt-2 text-[1.75rem] leading-tight">{destination.name}</h3>
            <p className="mt-1 text-[15px] text-slate">{destination.tagline}</p>
            <ul className="mt-4 space-y-1.5 text-[14px] text-ink-soft">
              <li className="flex items-center gap-2">
                <Mountain className="size-4 text-slate" aria-hidden />
                {formatAltitude(destination.altitudeM)}
              </li>
              <li className="flex items-center gap-2">
                <CalendarDays className="size-4 text-slate" aria-hidden />
                Best: {formatMonthRange(destination.bestMonths)}
              </li>
            </ul>
            <ButtonLink href={`/destinations/${destination.slug}`} className="mt-6 w-full">
              Explore {destination.name}
            </ButtonLink>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
