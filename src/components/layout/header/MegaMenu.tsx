"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import type { HeaderData } from "@/types/site";
import styles from "./MegaMenu.module.css";

export function MegaMenu({ data, label }: { data: HeaderData; label: string }) {
  const [dismissed, setDismissed] = useState(false);

  const dismiss = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.blur();
    setDismissed(true);
    window.setTimeout(() => setDismissed(false), 400);
  };

  return (
    <div className={cn(styles.mega, "group flex h-full items-center", dismissed && styles.dismissed)}>
      <button
        type="button"
        aria-haspopup="true"
        className="inline-flex items-center gap-1 px-3.5 py-1.5 text-[13px] transition-opacity duration-200 group-focus-within:opacity-60 group-hover:opacity-60"
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className="size-3 transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180"
        >
          <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      <div className={styles.panel}>
        <div className="container-x grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)] gap-12 pt-8 pb-12 text-ink">
          {data.groups.map((group) => (
            <div key={group.href}>
              <Link
                href={group.href}
                onClick={dismiss}
                className={cn(styles.reveal, "group/head inline-flex items-center gap-2 text-[12px] text-slate hover:text-ink")}
              >
                {group.label}
                <ArrowUpRightIcon className="size-3 transition-transform duration-300 group-hover/head:translate-x-0.5 group-hover/head:-translate-y-0.5" />
              </Link>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href} className={styles.reveal}>
                    <Link
                      href={item.href}
                      onClick={dismiss}
                      className="group/item flex items-baseline justify-between gap-3 text-[14px] font-medium transition-colors hover:text-saffron"
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="font-mono text-[10px] text-slate/70 opacity-0 transition-opacity group-hover/item:opacity-100">
                        {item.meta}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Link href={data.feature.href} onClick={dismiss} className={cn(styles.reveal, "group/feature block")}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper">
              <AppImage
                image={data.feature.image}
                sizes="24rem"
                className="transition-transform duration-[1.2s] ease-out-expo group-hover/feature:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-snow/90 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
                {data.feature.eyebrow}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-[15px] font-semibold tracking-tight">{data.feature.title}</p>
                <p className="text-[12px] text-slate">{data.feature.meta}</p>
              </div>
              <span className="grid size-8 place-items-center rounded-full bg-ink text-snow transition-transform duration-300 group-hover/feature:rotate-45">
                <ArrowUpRightIcon className="size-3.5" />
              </span>
            </div>
          </Link>
        </div>

        <div className="container-x flex items-center justify-between border-t border-line py-4 text-[13px]">
          <span className="text-slate">24 destinations across two Himalayan states</span>
          <Link href="/destinations" onClick={dismiss} className="inline-flex items-center gap-1.5 font-medium hover:text-saffron">
            Browse all destinations <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
      </div>
      <div className={styles.scrim} aria-hidden />
    </div>
  );
}
