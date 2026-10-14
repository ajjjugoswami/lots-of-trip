import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { AppImage } from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import type { ImageAsset } from "@/types/image";

export function PhotoGrid({ images, title }: { images: ImageAsset[]; title: string }) {
  if (!images.length) return null;

  return (
    <section className="container-x pb-section">
      <h2 className="text-display-md">{title}</h2>
      <Reveal stagger className="mt-8 grid gap-4 md:grid-cols-3">
        {images.map((image, index) => (
          <RevealItem
            key={image.src}
            className={cn(
              "relative overflow-hidden rounded-xl bg-paper",
              index === 0 ? "aspect-4/3 md:col-span-2 md:row-span-2 md:aspect-auto" : "aspect-4/3",
            )}
          >
            <AppImage image={image} sizes={index === 0 ? "(min-width: 768px) 52rem, 100vw" : "(min-width: 768px) 26rem, 100vw"} />
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
}
