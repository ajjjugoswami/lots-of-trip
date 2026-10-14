import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils/cn";

const MARK_CLASS = "size-full scale-[1.12] object-cover";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group inline-flex items-center gap-2 text-ink", className)}
    >
      <span className="relative size-7 shrink-0 overflow-hidden rounded-full">
        <Image src="/logo-light.png" alt="" width={28} height={28} sizes="28px" className={cn(MARK_CLASS, "dark:hidden")} />
        <Image src="/logo-dark.png" alt="" width={28} height={28} sizes="28px" className={cn(MARK_CLASS, "hidden dark:block")} />
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
