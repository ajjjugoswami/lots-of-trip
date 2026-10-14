import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
}

const LOGO_SRC = {
  light: "/logo-light.png",
  dark: "/logo-dark.png",
};

export function Logo({ tone = "light", className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <span className="relative size-7 shrink-0 overflow-hidden rounded-full">
        <Image
          src={LOGO_SRC[tone]}
          alt=""
          width={28}
          height={28}
          sizes="28px"
          className="size-full scale-[1.12] object-cover"
        />
      </span>
      <span className="inline-flex items-baseline text-[17px] font-semibold tracking-[-0.02em] whitespace-nowrap">
        {siteConfig.name}
        <span
          className="ml-1 size-1.5 rounded-full bg-accent transition-opacity group-hover:opacity-60"
          aria-hidden
        />
      </span>
    </Link>
  );
}
