import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "solid" | "dark" | "light" | "outline" | "outline-light" | "link" | "link-light";

const VARIANTS: Record<ButtonVariant, string> = {
  solid: "h-11 rounded-full bg-accent px-5 text-white hover:bg-accent-hover",
  dark: "h-11 rounded-full bg-ink px-5 text-white hover:bg-ink-soft",
  light: "h-11 rounded-full bg-white px-5 text-ink hover:bg-paper",
  outline: "h-11 rounded-full px-5 text-ink ring-1 ring-ink/20 ring-inset hover:bg-ink hover:text-white",
  "outline-light": "h-11 rounded-full px-5 text-white ring-1 ring-white/30 ring-inset hover:bg-white hover:text-ink",
  link: "text-accent hover:underline underline-offset-4",
  "link-light": "text-accent-light hover:underline underline-offset-4",
};

export const buttonClassName = (variant: ButtonVariant, className?: string) =>
  cn(
    "group inline-flex items-center justify-center gap-1.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200",
    VARIANTS[variant],
    className,
  );

export function Chevron() {
  return (
    <ChevronRight
      aria-hidden
      className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
    />
  );
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  external?: boolean;
}

export function ButtonLink({ children, variant = "solid", icon, external, className, ...props }: ButtonLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link {...props} {...externalProps} className={buttonClassName(variant, className)}>
      {icon}
      {children}
      {!icon && <Chevron />}
    </Link>
  );
}
