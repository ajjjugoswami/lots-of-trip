import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils/cn";
import type { StateInfo } from "@/types/destination";
import type { ImageAsset } from "@/types/image";

export interface StatePanelData extends StateInfo {
  image: ImageAsset;
}

export function StatePanel({ panel, index }: { panel: StatePanelData; index: number }) {
  return (
    <div
      data-panel={index}
      className={cn("relative h-svh min-h-[36rem] overflow-hidden md:absolute md:inset-0", index === 1 && "md:z-10 md:[clip-path:inset(100%_0_0_0)]")}
    >
      <div data-panel-image className="absolute inset-0">
        <AppImage image={panel.image} sizes="100vw" />
        <div className="absolute inset-0 bg-linear-to-r from-ink/75 via-ink/30 to-ink/10" />
      </div>

      <div
        data-panel-copy
        className="relative z-10 container-x flex h-full flex-col justify-between pt-28 pb-12 md:pb-16"
      >
        <p className="eyebrow flex items-center gap-3 text-snow/70">
          <span>{index === 0 ? "02" : "03"}</span>
          <span className="h-px w-10 bg-snow/40" />
          <span>{panel.epithet}</span>
        </p>

        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 className="font-display text-display-xl">{panel.name}</h2>
            <p className="mt-6 max-w-md text-lg text-snow/85">{panel.intro}</p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <dl className="mb-8 divide-y divide-line-light border-y border-line-light">
              {panel.stats.map((stat) => (
                <div key={stat.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="eyebrow text-snow/60">{stat.label}</dt>
                  <dd className="font-display text-2xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <ButtonLink href={`/journeys/${panel.slug}`} variant="light">
              {`Discover ${panel.slug === "himachal" ? "Himachal" : panel.name}`}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
