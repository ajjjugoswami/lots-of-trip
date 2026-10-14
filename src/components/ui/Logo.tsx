import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  tone?: "light" | "dark";
  size?: "sm" | "lg";
  className?: string;
}

const LOGO_SRC = {
  light: "/logo-light.png",
  dark: "/logo-dark.png",
};

export function Logo({ tone = "light", size = "sm", className }: LogoProps) {
  const pixels = size === "lg" ? 56 : 36;

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full ring-1 transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]",
          tone === "light" ? "ring-ink/10" : "ring-snow/15",
          size === "lg" ? "size-14" : "size-9",
        )}
      >
        <Image
          src={LOGO_SRC[tone]}
          alt=""
          width={pixels}
          height={pixels}
          sizes={`${pixels}px`}
          className="size-full scale-[1.12] object-cover"
        />
      </span>
      <span
        className={cn(
          "font-semibold tracking-tight whitespace-nowrap",
          size === "lg" ? "text-xl" : "text-[15px]",
        )}
      >
        Lots of Trip
      </span>
    </Link>
  );
}
