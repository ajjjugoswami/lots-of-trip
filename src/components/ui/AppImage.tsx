import Image from "next/image";
import type { ImageAsset } from "@/types/image";
import { cn } from "@/lib/utils/cn";

interface AppImageProps {
  image: ImageAsset;
  sizes: string;
  className?: string;
  preload?: boolean;
  alt?: string;
}

export function AppImage({ image, sizes, className, preload, alt }: AppImageProps) {
  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      fill
      sizes={sizes}
      preload={preload}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      className={cn("object-cover", className)}
    />
  );
}
