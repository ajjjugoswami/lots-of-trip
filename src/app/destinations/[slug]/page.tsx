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

  const coverImage = destination.images[0]?.src;
  const stateLabel = destination.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
  const title = `${destination.name}, ${stateLabel} — Travel Guide, Weather & Trips`;
  const description = `${destination.description.slice(0, 150)}... Explore ${destination.name} highlights, best months to visit, live weather, and custom itineraries.`;

  return {
    title,
    description,
    keywords: [
      `${destination.name} travel guide`,
      `${destination.name} tour package`,
      `places to visit in ${destination.name}`,
      `best time to visit ${destination.name}`,
      `${destination.name} weather`,
      `${destination.name} ${stateLabel}`,
      ...destination.highlights,
    ],
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      type: "website",
      title: `${destination.name} — ${destination.tagline}`,
      description,
      url: `/destinations/${destination.slug}`,
      images: coverImage
        ? [
            {
              url: coverImage,
              width: 1200,
              height: 800,
              alt: `${destination.name} in ${stateLabel}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${destination.name} — ${destination.tagline}`,
      description,
      images: coverImage ? [coverImage] : undefined,
    },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const tours = getToursForDestination(destination.slug);
  const siteUrl = getSiteUrl();
  const stateName = destination.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: destination.name,
      description: destination.description,
      url: `${siteUrl}/destinations/${destination.slug}`,
      image: destination.images.map((img) => `${siteUrl}${img.src}`),
      geo: {
        "@type": "GeoCoordinates",
        latitude: destination.coordinates.lat,
        longitude: destination.coordinates.lng,
      },
      touristType: destination.types,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: stateName,
      },
      hasMap: `https://www.openstreetmap.org/?mlat=${destination.coordinates.lat}&mlon=${destination.coordinates.lng}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Destinations",
          item: `${siteUrl}/destinations`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: destination.name,
          item: `${siteUrl}/destinations/${destination.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={schemas} />
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
