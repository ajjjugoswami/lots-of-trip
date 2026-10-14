"use client";

import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils/cn";
import type { MapData } from "@/types/map";
import styles from "./DestinationMap.module.css";

interface MapCanvasProps {
  data: MapData;
  active: string;
  onActivate: (slug: string) => void;
}

export function MapCanvas({ data, active, onActivate }: MapCanvasProps) {
  const router = useRouter();
  const open = (slug: string) => router.push(`/destinations/${slug}`);
  const activeDestination = data.destinations.find((item) => item.slug === active);

  const onKey = (event: KeyboardEvent<SVGGElement>, slug: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open(slug);
    }
  };

  return (
    <svg
      viewBox={`0 0 ${data.width} ${data.height}`}
      role="group"
      aria-label="Map of destinations in Uttarakhand and Himachal Pradesh"
      className="h-auto w-full"
    >
      {data.states.map((state) => (
        <path
          key={state.key}
          d={state.path}
          className={cn(styles.state, state.focus ? styles.stateFocus : styles.stateMuted)}
        />
      ))}

      {data.labels.map((label) => (
        <text key={label.text} x={label.x} y={label.y} textAnchor="middle" className={styles.stateLabel}>
          {label.text.toUpperCase()}
        </text>
      ))}

      {data.destinations.map((item) => {
        const isActive = item.slug === active;
        return (
          <g
            key={item.slug}
            role="link"
            tabIndex={0}
            aria-label={`${item.name}, ${item.region}`}
            transform={`translate(${item.x} ${item.y})`}
            onMouseEnter={() => onActivate(item.slug)}
            onFocus={() => onActivate(item.slug)}
            onClick={() => (isActive ? open(item.slug) : onActivate(item.slug))}
            onKeyDown={(event) => onKey(event, item.slug)}
            className={styles.pin}
            data-active={isActive || undefined}
          >
            <circle r={22} className={styles.pinHit} />
            {isActive && <circle r={10} className={styles.pinPulse} />}
            <circle r={isActive ? 9 : 6} className={styles.pinDot} />
          </g>
        );
      })}

      {activeDestination && (
        <g transform={`translate(${activeDestination.x} ${activeDestination.y - 24})`} className={styles.tag} aria-hidden>
          <text textAnchor="middle" className={styles.tagText}>
            {activeDestination.name}
          </text>
        </g>
      )}
    </svg>
  );
}
