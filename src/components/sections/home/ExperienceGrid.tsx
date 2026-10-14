import Link from "next/link";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ImageAsset } from "@/types/image";

export interface ExperienceItem {
  type: string;
  label: string;
  description: string;
  count: number;
  image: ImageAsset;
}

export function ExperienceGrid({ items }: { items: ExperienceItem[] }) {
  return (
    <section className="container-x py-section">
      <SectionIntro
        align="center"
        label="Ways to travel"
        title={
          <>
            Choose how you want to <em>feel</em> up there.
          </>
        }
      />
      <Reveal stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <RevealItem key={item.type}>
            <Link href={`/destinations?type=${item.type}`} className="group block">
              <div className="relative aspect-3/2 overflow-hidden rounded-[24px] bg-paper">
                <AppImage
                  image={item.image}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 px-1">
                <h3 className="text-xl tracking-tight">{item.label}</h3>
                <span className="text-[13px] text-slate">{item.count} places</span>
              </div>
              <p className="mt-1 px-1 text-[15px] text-slate">{item.description}</p>
            </Link>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
