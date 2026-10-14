import type { Coordinates } from "@/types/destination";

interface MiniMapProps {
  coordinates: Coordinates;
  name: string;
}

function buildDirectionsUrl({ lat, lng }: Coordinates) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

function buildEmbedUrl({ lat, lng }: Coordinates) {
  const delta = 0.06;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

export function MiniMap({ coordinates, name }: MiniMapProps) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <iframe
        title={`Map of ${name}`}
        src={buildEmbedUrl(coordinates)}
        width="100%"
        height="200"
        loading="lazy"
        className="block border-0"
        aria-label={`Interactive map showing the location of ${name}`}
      />
      <a
        href={buildDirectionsUrl(coordinates)}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm backdrop-blur transition-colors hover:bg-white"
      >
        Get directions ↗
      </a>
    </div>
  );
}
