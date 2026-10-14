import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { Chevron } from "@/components/ui/ButtonLink";
import { difficultyLabel, formatINR } from "@/lib/utils/format";
import type { Tour } from "@/types/tour";

export function TourCard({ tour }: { tour: Tour }) {
  const facts = [`${tour.durationDays} days`, difficultyLabel(tour.difficulty), tour.groupSize];

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-paper transition-shadow duration-500 hover:shadow-[0_20px_50px_rgb(0_0_0/0.1)]"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <AppImage
          image={tour.cover}
          sizes="(min-width: 768px) 40rem, 100vw"
          className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7 md:p-9">
        <div className="flex flex-wrap gap-2">
          {facts.map((fact) => (
            <span key={fact} className="rounded-full bg-white px-3 py-1 text-[12px] font-medium text-ink-soft">
              {fact}
            </span>
          ))}
        </div>
        <h3 className="mt-5 text-display-md">{tour.title}</h3>
        <p className="mt-3 text-slate">{tour.summary}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <p className="text-[14px] text-slate">
            From <span className="text-lg font-semibold text-ink">{formatINR(tour.priceFromINR)}</span>
          </p>
          <span className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent">
            View itinerary <Chevron />
          </span>
        </div>
      </div>
    </Link>
  );
}
