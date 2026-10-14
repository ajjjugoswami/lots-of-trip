import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils/siteUrl";
import { getDestinations, getStates } from "@/lib/data/destinations";
import { getTours } from "@/lib/data/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const buildDate = new Date("2026-03-01T00:00:00.000Z");

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/destinations`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tours`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/credits`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const stateRoutes: MetadataRoute.Sitemap = getStates().map((state) => ({
    url: `${siteUrl}/journeys/${state.slug}`,
    lastModified: buildDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const destinationRoutes: MetadataRoute.Sitemap = getDestinations().map((destination) => ({
    url: `${siteUrl}/destinations/${destination.slug}`,
    lastModified: buildDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tourRoutes: MetadataRoute.Sitemap = getTours().map((tour) => ({
    url: `${siteUrl}/tours/${tour.slug}`,
    lastModified: buildDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...coreRoutes, ...stateRoutes, ...destinationRoutes, ...tourRoutes];
}
