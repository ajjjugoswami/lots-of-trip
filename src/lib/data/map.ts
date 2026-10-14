import mapSource from "@/content/generated/map.json";
import type { Coordinates } from "@/types/destination";
import type { MapData, MapState } from "@/types/map";
import type { CurrentWeather } from "@/types/weather";
import { getDestinations } from "./destinations";

const { projection } = mapSource;

const STATE_LABELS: { text: string; coordinates: Coordinates }[] = [
  { text: "Himachal Pradesh", coordinates: { lat: 32.75, lng: 77.6 } },
  { text: "Uttarakhand", coordinates: { lat: 30.45, lng: 79.85 } },
  { text: "Punjab", coordinates: { lat: 30.75, lng: 74.9 } },
];

function project({ lat, lng }: Coordinates) {
  return {
    x: Math.round((lng - projection.minLon) * projection.cosMidLat * projection.scale * 10) / 10,
    y: Math.round((projection.maxLat - lat) * projection.scale * 10) / 10,
  };
}

export function getMapData(weather: Record<string, CurrentWeather | null>): MapData {
  return {
    width: mapSource.width,
    height: mapSource.height,
    states: mapSource.states as MapState[],
    labels: STATE_LABELS.map((label) => ({ text: label.text, ...project(label.coordinates) })),
    destinations: getDestinations().map((destination) => ({
      slug: destination.slug,
      name: destination.name,
      region: destination.region,
      state: destination.state,
      tagline: destination.tagline,
      altitudeM: destination.altitudeM,
      bestMonths: destination.bestMonths,
      image: destination.images[0],
      weather: weather[destination.slug] ?? null,
      ...project(destination.coordinates),
    })),
  };
}
