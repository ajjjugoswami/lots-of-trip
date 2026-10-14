import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/utils/cn";

interface SectionIntroProps {
  index?: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}

export function SectionIntro({ index, label, title, aside, className, tone = "dark" }: SectionIntroProps) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <p className={cn("eyebrow mb-6 flex items-center gap-3", tone === "dark" ? "text-slate" : "text-snow/60")}>
          {index && <span>{index}</span>}
          <span className={cn("h-px w-10", tone === "dark" ? "bg-ink/30" : "bg-snow/40")} />
          <span>{label}</span>
        </p>
        <RevealText as="h2" className="font-display text-display-lg text-balance">
          {title}
        </RevealText>
      </div>
      {aside && <div className="md:col-span-4 md:pb-3">{aside}</div>}
    </div>
  );
}
