import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationHero } from "@/components/sections/destination/DestinationHero";
import { DestinationOverview } from "@/components/sections/destination/DestinationOverview";
import { LiveWeather } from "@/components/sections/destination/LiveWeather";
import { NextDestination } from "@/components/sections/destination/NextDestination";
import { PhotoGrid } from "@/components/sections/destination/PhotoGrid";
import { SeasonBar } from "@/components/sections/destination/SeasonBar";
import { PlanCta } from "@/components/sections/shared/PlanCta";
import { TourGrid } from "@/components/sections/shared/TourGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import { getAdjacentDestination, getDestination, getDestinations } from "@/lib/data/destinations";
import { getToursForDestination } from "@/lib/data/tours";
import { getSiteUrl } from "@/lib/utils/siteUrl";

export function generateStaticParams() {
  return getDestinations().map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};
  return {
    title: `${destination.name} — ${destination.tagline}`,
    description: destination.description,
    alternates: { canonical: `/destinations/${destination.slug}` },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const tours = getToursForDestination(destination.slug);
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.description,
    url: `${siteUrl}/destinations/${destination.slug}`,
    image: destination.images[0]?.src ? `${siteUrl}${destination.images[0].src}` : undefined,
    geo: {
      "@type": "GeoCoordinates",
      latitude: destination.coordinates.lat,
      longitude: destination.coordinates.lng,
    },
    touristType: destination.types,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <DestinationHero destination={destination} />
      <DestinationOverview destination={destination} />
      <LiveWeather destination={destination} />
      <PhotoGrid images={destination.images.slice(1)} title={`${destination.name} in pictures`} />
      <SeasonBar months={destination.bestMonths} name={destination.name} />
      {tours.length > 0 && (
        <section className="container-x pb-section">
          <h2 className="text-display-md">Journeys that include {destination.name}</h2>
          <div className="mt-8">
            <TourGrid tours={tours} />
          </div>
        </section>
      )}
      <NextDestination destination={getAdjacentDestination(destination.slug)} />
      <PlanCta image={destination.images[1] ?? destination.images[0]} subject={destination.name} />
    </>
  );
}
