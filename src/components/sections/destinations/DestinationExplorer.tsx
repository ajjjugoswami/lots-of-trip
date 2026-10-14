"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { CUBIC } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";
import { tripTypeLabel } from "@/lib/utils/format";
import type { Destination, StateSlug, TripType } from "@/types/destination";

type StateFilter = StateSlug | "all";

const STATE_FILTERS: { value: StateFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "himachal", label: "Himachal" },
];

export function DestinationExplorer({ destinations }: { destinations: Destination[] }) {
  const searchParams = useSearchParams();
  const types = Array.from(new Set(destinations.flatMap((item) => item.types)));
  const initialType = searchParams.get("type") as TripType | null;

  const [state, setState] = useState<StateFilter>("all");
  const [type, setType] = useState<TripType | null>(
    initialType && types.includes(initialType) ? initialType : null,
  );

  const results = destinations.filter(
    (item) => (state === "all" || item.state === state) && (!type || item.types.includes(type)),
  );

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div role="tablist" aria-label="State" className="inline-flex rounded-full bg-paper p-1">
          {STATE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              role="tab"
              aria-selected={state === filter.value}
              onClick={() => setState(filter.value)}
              className={cn(
                "relative rounded-full px-5 py-2 text-[14px] font-medium transition-colors",
                state === filter.value ? "text-ink" : "text-slate hover:text-ink",
              )}
            >
              {state === filter.value && (
                <motion.span
                  layoutId="state-filter"
                  transition={{ duration: 0.4, ease: CUBIC.outExpo }}
                  className="absolute inset-0 rounded-full bg-surface shadow-sm"
                />
              )}
              <span className="relative">{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {types.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={type === value}
              onClick={() => setType(type === value ? null : value)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px] font-medium ring-1 ring-inset transition-colors",
                type === value ? "bg-ink text-snow ring-ink" : "text-slate ring-line hover:text-ink",
              )}
            >
              {tripTypeLabel(value)}
            </button>
          ))}
        </div>

        <p className="text-[14px] text-slate">
          {results.length} {results.length === 1 ? "destination" : "destinations"}
        </p>
      </div>

      <motion.ul layout className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((destination) => (
            <motion.li
              key={destination.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: CUBIC.outExpo }}
            >
              <DestinationCard
                destination={destination}
                aspect="landscape"
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
