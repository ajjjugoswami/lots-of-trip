import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationGrid } from "@/components/sections/destinations/DestinationGrid";
import { Itinerary } from "@/components/sections/tour/Itinerary";
import { TourEnquiry } from "@/components/sections/tour/TourEnquiry";
import { TourHero } from "@/components/sections/tour/TourHero";
import { TourInclusions } from "@/components/sections/tour/TourInclusions";
import { getDestination } from "@/lib/data/destinations";
import { getTour, getTours } from "@/lib/data/tours";

export function generateStaticParams() {
  return getTours().map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tours/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return {
    title: `${tour.title} — ${tour.durationDays} days`,
    description: tour.summary,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: { images: [tour.cover.src] },
  };
}

export default async function TourPage({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const destinations = tour.destinations.map(getDestination).filter((item) => item !== undefined);

  return (
    <>
      <TourHero tour={tour} places={destinations.map((item) => item.name)} />
      <Itinerary days={tour.itinerary} />
      <TourInclusions inclusions={tour.inclusions} exclusions={tour.exclusions} />
      <section className="container-x pb-section">
        <h2 className="text-display-md">Places on this journey</h2>
        <div className="mt-8">
          <DestinationGrid destinations={destinations} />
        </div>
      </section>
      <TourEnquiry title={tour.title} />
    </>
  );
}
