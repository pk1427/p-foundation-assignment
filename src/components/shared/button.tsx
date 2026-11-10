import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonBaseProps {
  variant?: "primary" | "outline" | "ghost" | "danger";
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

const variants = {
  primary:
    "bg-practo-primary text-white rounded-xl px-5 py-3 font-medium shadow-soft hover:bg-practo-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-practo-primary focus-visible:ring-offset-2 active:scale-95 transition-all",
  outline:
    "border border-practo-border bg-practo-surface text-practo-text rounded-xl px-5 py-3 font-medium shadow-soft hover:bg-practo-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-practo-primary focus-visible:ring-offset-2 active:scale-95 transition-all",
  ghost:
    "text-practo-text-muted rounded-xl px-5 py-3 font-medium hover:bg-practo-primary-light hover:text-practo-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-practo-primary focus-visible:ring-offset-2 active:scale-95 transition-all",
  danger:
    "bg-practo-emergency text-white rounded-xl px-5 py-3 font-medium shadow-soft hover:bg-practo-emergency focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-practo-emergency focus-visible:ring-offset-2 active:scale-95 transition-all",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-6 py-4 text-lg",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const base = cn(variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return <a {...props} href={props.href} className={cn(base, "inline-block text-center")} />;
  }

  return <button type="button" className={base} {...props} />;
}
