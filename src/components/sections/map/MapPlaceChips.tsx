import { cn } from "@/lib/utils/cn";
import type { MapPlace } from "@/types/map";

interface MapPlaceChipsProps {
  places: MapPlace[];
  activeSlug: string;
  onSelect: (slug: string) => void;
  className?: string;
}

export function MapPlaceChips({ places, activeSlug, onSelect, className }: MapPlaceChipsProps) {
  return (
    <nav aria-label="Jump to a destination" className={cn("overflow-x-auto overscroll-x-contain", className)}>
      <ul className="flex w-max gap-2 p-1">
        {places.map((place) => {
          const isActive = place.slug === activeSlug;
          return (
            <li key={place.slug}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(place.slug)}
                className={cn(
                  "h-9 rounded-full px-4 text-[13px] font-medium whitespace-nowrap shadow-[0_4px_14px_rgb(0_0_0/0.1)] ring-1 transition-colors",
                  isActive ? "bg-ink text-snow ring-ink" : "bg-snow text-ink-soft ring-line hover:text-ink",
                )}
              >
                {place.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
