import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { getDestinations, getStates } from "@/lib/data/destinations";
import { getTours } from "@/lib/data/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/destinations",
    "/tours",
    "/about",
    "/contact",
    "/credits",
    ...getStates().map((state) => `/journeys/${state.slug}`),
    ...getDestinations().map((destination) => `/destinations/${destination.slug}`),
    ...getTours().map((tour) => `/tours/${tour.slug}`),
  ];

  return paths.map((path) => ({ url: `${getSiteUrl()}${path}` }));
}
