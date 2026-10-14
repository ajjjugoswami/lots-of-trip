import { tourContent } from "@/content/tours";
import type { Tour } from "@/types/tour";
import { resolveImage } from "./images";

const tours: Tour[] = tourContent.map((content) => ({
  ...content,
  cover: resolveImage(content.cover, content.title),
  itinerary: content.itinerary.map((day) => ({
    ...day,
    image: resolveImage(day.image, day.title),
  })),
}));

export const getTours = () => tours;

export const getFeaturedTours = () => tours.filter((tour) => tour.featured);

export const getTour = (slug: string) => tours.find((tour) => tour.slug === slug);

export const getToursForDestination = (destinationSlug: string) =>
  tours.filter((tour) => tour.destinations.includes(destinationSlug));
