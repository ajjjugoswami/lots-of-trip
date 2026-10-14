import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils/cn";
import { MountainIcon } from "./icons";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <MountainIcon className="h-4 w-7 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
      <span className="font-display text-2xl leading-none tracking-tight">
        Lots <em className="italic">of</em> Trip
      </span>
    </Link>
  );
}
