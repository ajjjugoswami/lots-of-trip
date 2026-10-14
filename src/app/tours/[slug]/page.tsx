import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationGrid } from "@/components/sections/destinations/DestinationGrid";
import { Itinerary } from "@/components/sections/tour/Itinerary";
import { RelatedTours } from "@/components/sections/tour/RelatedTours";
import { TourEnquiry } from "@/components/sections/tour/TourEnquiry";
import { TourHero } from "@/components/sections/tour/TourHero";
import { TourInclusions } from "@/components/sections/tour/TourInclusions";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDestination } from "@/lib/data/destinations";
import { getRelatedTours, getTour, getTours } from "@/lib/data/tours";
import { getSiteUrl } from "@/lib/utils/siteUrl";

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
  };
}

export default async function TourPage({ params }: PageProps<"/tours/[slug]">) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const destinations = tour.destinations.map(getDestination).filter((item) => item !== undefined);
  const related = getRelatedTours(slug);
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Trip",
    name: tour.title,
    description: tour.summary,
    url: `${siteUrl}/tours/${tour.slug}`,
    itinerary: destinations.map((d) => ({
      "@type": "City",
      name: d.name,
    })),
    offers: {
      "@type": "Offer",
      price: tour.priceFromINR,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
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
      <RelatedTours tours={related} />
    </>
  );
}

