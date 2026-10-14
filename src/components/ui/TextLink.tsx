import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./TextLink.module.css";

export function TextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} className={cn(styles.link, className)} />;
}
