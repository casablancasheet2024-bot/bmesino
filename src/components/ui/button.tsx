import { Link } from "@/i18n/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-[0.005em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_1px_0_rgb(255_255_255/0.15)_inset,0_6px_16px_-8px_rgb(7_87_184/0.7)] hover:bg-brand-700",
  secondary: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border border-line-strong bg-white text-navy-900 hover:border-brand-600 hover:text-brand-600",
  ghost: "text-brand-600 hover:text-navy-900",
  light: "bg-white text-navy-900 hover:bg-surface-2",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-5 text-[0.95rem] sm:px-6",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
  icon?: ReactNode;
};

export function ButtonLink({ variant, size, className, arrow, icon, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5"
        />
      )}
    </Link>
  );
}

/** For external destinations (wa.me, mailto:, tel:). */
export function ExternalButton({
  variant,
  size,
  className,
  icon,
  children,
  href,
  newTab = true,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; size?: Size; icon?: ReactNode; newTab?: boolean }) {
  return (
    <a
      href={href}
      className={buttonClasses({ variant, size, className })}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}
