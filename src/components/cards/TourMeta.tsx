import { difficultyLabel, formatAltitude, formatINR } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { Tour } from "@/types/tour";

export function TourMeta({ tour, className }: { tour: Tour; className?: string }) {
  const items = [
    { label: "Duration", value: `${tour.durationDays} days` },
    { label: "Level", value: difficultyLabel(tour.difficulty) },
    { label: "Max altitude", value: formatAltitude(tour.maxAltitudeM) },
    { label: "From", value: formatINR(tour.priceFromINR) },
  ];

  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4", className)}>
      {items.map((item) => (
        <div key={item.label} className="border-t border-current/15 pt-3">
          <dt className="eyebrow opacity-60">{item.label}</dt>
          <dd className="mt-1.5 text-base">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
