import Image from "next/image";
import { Link } from "@/i18n/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Approved Bmesino artwork (transparent PNG, cropped to its bounds — proportions preserved). */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label={`${siteConfig.name} — accueil`}>
      <Image
        src={siteConfig.logo.src}
        width={siteConfig.logo.width}
        height={siteConfig.logo.height}
        alt={siteConfig.name}
        preload={priority}
        sizes="180px"
        className="h-full w-auto"
      />
    </Link>
  );
}
