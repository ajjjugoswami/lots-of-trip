import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { ArrowUpRightIcon } from "./icons";
import styles from "./ButtonLink.module.css";

export type ButtonVariant = "solid" | "light" | "outline" | "outline-light" | "saffron";

const VARIANTS: Record<ButtonVariant, string> = {
  solid: "bg-ink text-snow hover:bg-pine",
  light: "bg-snow text-ink hover:bg-paper",
  saffron: "bg-saffron text-ink hover:bg-snow",
  outline: "border border-ink/25 text-ink hover:border-ink",
  "outline-light": "border border-snow/35 text-snow hover:border-snow",
};

export const buttonClassName = (variant: ButtonVariant, className?: string) =>
  cn(
    styles.button,
    "group inline-flex h-12 items-center gap-3 rounded-full pr-2 pl-6 text-sm font-medium whitespace-nowrap transition-colors duration-300",
    VARIANTS[variant],
    className,
  );

export function ButtonContent({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  const glyph = icon ?? <ArrowUpRightIcon className="size-4" />;
  return (
    <>
      <span className={styles.label}>
        <span
          className={styles.labelInner}
          data-label={typeof children === "string" ? children : undefined}
        >
          {children}
        </span>
      </span>
      <span className={cn(styles.iconWrap, "grid size-8 place-items-center rounded-full")}>
        <span className={styles.icon}>{glyph}</span>
        <span className={styles.iconNext}>{glyph}</span>
      </span>
    </>
  );
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  external?: boolean;
}

export function ButtonLink({
  children,
  variant = "solid",
  icon,
  external,
  className,
  ...props
}: ButtonLinkProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link {...props} {...externalProps} className={buttonClassName(variant, className)}>
      <ButtonContent icon={icon}>{children}</ButtonContent>
    </Link>
  );
}
