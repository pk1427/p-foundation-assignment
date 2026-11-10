import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  viewAll?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  viewAll,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 mb-10", className)}>
      <div className="space-y-2">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-practo-border/50 bg-practo-sage px-3 py-1 text-[10px] font-bold text-practo-amber uppercase tracking-wider">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl font-bold text-practo-text leading-tight">{title}</h2>
        {subtitle && <p className="text-sm text-practo-text-muted">{subtitle}</p>}
      </div>
      {viewAll && (
        <a
          href={typeof viewAll === "string" ? viewAll : "/search"}
          className="text-sm font-semibold text-practo-primary flex items-center gap-1 hover:underline underline-offset-4"
        >
          {typeof viewAll === "string" ? "View all" : viewAll}
        </a>
      )}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: "surface" | "sage" | "none";
}

export function Section({
  children,
  className,
  background = "none",
}: SectionProps) {
  const bgClass =
    background === "surface"
      ? "bg-practo-surface/40"
      : background === "sage"
        ? "bg-practo-sage"
        : "";

  return (
    <section className={cn("py-12 sm:py-16 lg:py-24", bgClass, className)}>
      {children}
    </section>
  );
}
