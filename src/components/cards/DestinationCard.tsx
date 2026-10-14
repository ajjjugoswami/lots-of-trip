import Link from "next/link";
import { ViewTransition } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { formatAltitude, stateLabel } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Destination } from "@/types/destination";

interface DestinationCardProps {
  destination: Destination;
  index?: string;
  sizes: string;
  className?: string;
  aspect?: "portrait" | "landscape";
}

export function DestinationCard({
  destination,
  index,
  sizes,
  className,
  aspect = "portrait",
}: DestinationCardProps) {
  const cover = destination.images[0];

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      data-cursor="Explore"
      className={cn("group block", className)}
    >
      <ViewTransition name={`destination-${destination.slug}`} share="morph" default="none">
        <div
          className={cn(
            "relative overflow-hidden bg-paper",
            aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]",
          )}
        >
          <AppImage
            image={cover}
            sizes={sizes}
            className="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-ink/0" />
          {index && <span className="eyebrow absolute top-4 left-4 text-snow">{index}</span>}
          <span className="eyebrow absolute right-4 bottom-4 text-snow/85">
            {formatAltitude(destination.altitudeM)}
          </span>
        </div>
      </ViewTransition>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-3xl leading-none">{destination.name}</h3>
        <span className="eyebrow shrink-0 text-slate">{stateLabel(destination.state)}</span>
      </div>
      <p className="mt-2 text-sm text-slate">{destination.tagline}</p>
    </Link>
  );
}
