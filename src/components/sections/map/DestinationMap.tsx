"use client";

import { useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { cn } from "@/lib/utils/cn";
import type { MapData } from "@/types/map";
import { MapCanvas } from "./MapCanvas";
import { MapInfoCard } from "./MapInfoCard";

export function DestinationMap({ data }: { data: MapData }) {
  const [active, setActive] = useState(data.destinations[0].slug);
  const activeDestination = data.destinations.find((item) => item.slug === active) ?? data.destinations[0];

  return (
    <section className="bg-paper py-section">
      <div className="container-x">
        <SectionIntro
          label="Explore the map"
          title={
            <>
              Every place, <em>on one map.</em>
            </>
          }
          description="Hover or tap a pin to preview a destination. Tap again to open it."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <MapCanvas data={data} active={active} onActivate={setActive} />
          </div>
          <div className="lg:col-span-4">
            <MapInfoCard destination={activeDestination} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Destinations">
          {data.destinations.map((item) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={item.slug === active}
              onClick={() => setActive(item.slug)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px] font-medium ring-1 ring-inset transition-colors",
                item.slug === active ? "bg-ink text-snow ring-ink" : "text-slate ring-line hover:text-ink",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
