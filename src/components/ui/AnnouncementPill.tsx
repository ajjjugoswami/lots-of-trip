import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface AnnouncementPillProps {
  href: string;
  label: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function AnnouncementPill({ href, label, children, tone = "light", className }: AnnouncementPillProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border py-1 pr-3 pl-1 text-[13px] transition-colors duration-200",
        tone === "light"
          ? "border-line text-slate hover:border-glacier hover:text-ink"
          : "border-white/15 text-white/70 hover:border-white/30 hover:text-white",
        className,
      )}
    >
      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent-light">{label}</span>
      {children}
      <ChevronRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
