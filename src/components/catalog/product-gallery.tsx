"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { ProductImage } from "@/data/products";
import { cn } from "@/lib/cn";

export function ProductGallery({ images, name, badge }: { images: ProductImage[]; name: string; badge?: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  if (!current) {
    return (
      <div className="grid aspect-square place-items-center rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface text-center text-sm text-muted">
        <span className="flex flex-col items-center gap-3">
          <ImageOff aria-hidden className="size-6 text-subtle" />
          Photos disponibles sur demande
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface sm:aspect-[5/4] lg:aspect-square">
        {images.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            preload={index === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              index === active ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={index !== active}
          />
        ))}
        {badge && (
          <span className="absolute left-4 top-4 rounded bg-white/92 px-2.5 py-1 font-label text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted shadow-soft">
            {badge}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div role="group" aria-label={`Photos de ${name}`} className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              aria-label={`Afficher la photo ${index + 1} sur ${images.length}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border-2 bg-surface transition-colors",
                index === active ? "border-brand-600" : "border-transparent hover:border-line-strong",
              )}
            >
              <Image src={image.src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
