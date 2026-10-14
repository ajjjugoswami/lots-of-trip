import Link from "next/link";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { RevealText } from "@/components/motion/RevealText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils/cn";
import type { Tour } from "@/types/tour";
import { TourMeta } from "./TourMeta";

interface TourRowProps {
  tour: Tour;
  index: string;
  reverse?: boolean;
}

export function TourRow({ tour, index, reverse }: TourRowProps) {
  return (
    <article className="grid gap-8 md:grid-cols-12 md:gap-12">
      <Link
        href={`/tours/${tour.slug}`}
        data-cursor="View"
        className={cn("md:col-span-7", reverse && "md:order-2 md:col-start-6")}
      >
        <ImageReveal
          image={tour.cover}
          sizes="(min-width: 768px) 58vw, 100vw"
          parallax
          className="aspect-[4/3] md:aspect-[5/4]"
        />
      </Link>
      <div
        className={cn(
          "flex flex-col justify-end md:col-span-5 md:pb-4",
          reverse ? "md:order-1 md:col-span-4 md:col-start-1" : "md:col-span-4 md:col-start-9",
        )}
      >
        <p className="eyebrow mb-5 text-slate">Journey {index}</p>
        <RevealText as="h3" className="font-display text-display-md">
          {tour.title}
        </RevealText>
        <p className="mt-5 max-w-md text-slate">{tour.summary}</p>
        <TourMeta tour={tour} className="mt-8" />
        <div className="mt-9">
          <ButtonLink href={`/tours/${tour.slug}`} variant="outline">
            See the itinerary
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
