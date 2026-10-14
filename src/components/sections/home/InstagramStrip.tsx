import { FadeUp } from "@/components/motion/FadeUp";
import { AppImage } from "@/components/ui/AppImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InstagramIcon } from "@/components/ui/icons";
import { siteConfig } from "@/content/site";
import type { ImageAsset } from "@/types/image";

export function InstagramStrip({ images }: { images: ImageAsset[] }) {
  const { instagram } = siteConfig.social;

  return (
    <section className="container-x py-section">
      <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-5 flex items-center gap-3 text-slate">
            <span>09</span>
            <span className="h-px w-10 bg-ink/30" />
            <span>On the trail with us</span>
          </p>
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-display-lg transition-colors hover:text-saffron"
          >
            {instagram.handle}
          </a>
        </div>
        <ButtonLink href={instagram.url} external variant="outline" icon={<InstagramIcon className="size-4" />}>
          Follow on Instagram
        </ButtonLink>
      </div>

      <FadeUp stagger className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
        {images.map((image, index) => (
          <a
            key={image.src}
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Follow"
            aria-label={`View ${instagram.handle} on Instagram`}
            className={index % 2 === 1 ? "group relative block aspect-square overflow-hidden md:translate-y-8" : "group relative block aspect-square overflow-hidden"}
          >
            <AppImage
              image={image}
              sizes="(min-width: 768px) 16vw, 50vw"
              className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
            />
            <span className="absolute inset-0 grid place-items-center bg-ink/0 text-snow opacity-0 transition-all duration-500 group-hover:bg-ink/35 group-hover:opacity-100">
              <InstagramIcon className="size-7" />
            </span>
          </a>
        ))}
      </FadeUp>
    </section>
  );
}
