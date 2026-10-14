import Link from "next/link";
import { ViewTransition } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { formatAltitude } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Destination } from "@/types/destination";

interface DestinationCardProps {
  destination: Destination;
  sizes: string;
  className?: string;
  aspect?: "portrait" | "landscape";
}

export function DestinationCard({ destination, sizes, className, aspect = "portrait" }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`} className={cn("group block", className)}>
      <ViewTransition name={`destination-${destination.slug}`} share="morph" default="none">
        <div
          className={cn(
            "relative overflow-hidden rounded-[24px] bg-paper",
            aspect === "portrait" ? "aspect-4/5" : "aspect-4/3",
          )}
        >
          <AppImage
            image={destination.images[0]}
            sizes={sizes}
            className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
          />
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-medium text-ink backdrop-blur">
            {formatAltitude(destination.altitudeM)}
          </span>
        </div>
      </ViewTransition>
      <div className="mt-4 px-1">
        <p className="text-[12px] font-semibold text-saffron">{destination.region}</p>
        <h3 className="mt-1 text-xl tracking-tight">{destination.name}</h3>
        <p className="mt-1 text-[15px] text-slate">{destination.tagline}</p>
      </div>
    </Link>
  );
}
