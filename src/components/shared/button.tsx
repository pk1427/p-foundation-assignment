import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonBaseProps {
  variant?: "primary" | "outline" | "ghost" | "danger" | "amber";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

type ButtonAnchorProps = ButtonBaseProps & {
  href: string;
} & Pick<
  React.ComponentPropsWithoutRef<"a">,
  "target" | "rel" | "aria-label"
>;

type ButtonHTMLProps = ButtonBaseProps & {
  href?: never;
} & Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "onClick" | "children"
>;

type ButtonProps = ButtonAnchorProps | ButtonHTMLProps;

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-practo-primary text-white shadow-soft hover:bg-practo-primary-hover focus-visible:ring-practo-primary",
  outline:
    "border border-practo-border bg-practo-surface text-practo-text shadow-soft hover:bg-practo-primary-light focus-visible:ring-practo-primary",
  ghost:
    "text-practo-text-muted hover:bg-practo-primary-light hover:text-practo-primary focus-visible:ring-practo-primary",
  danger:
    "bg-practo-emergency text-white shadow-soft hover:bg-practo-emergency focus-visible:ring-practo-emergency",
  amber:
    "bg-practo-amber text-white shadow-soft hover:bg-practo-amber focus-visible:ring-practo-amber",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm min-h-[44px]",
  md: "px-4 py-2.5 text-sm min-h-[44px]",
  lg: "px-5 py-3 text-base min-h-[52px]",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseCls = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return <a {...props} href={props.href} className={baseCls} />;
  }

  return <button type="button" className={baseCls} {...props} />;
}
