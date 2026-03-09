import { cn } from '@/lib/utils/cn'
import type { SectionImage } from '@/types/wedding'

interface SectionImageGalleryProps {
  images: SectionImage[]
  className?: string
}

export function SectionImageGallery({ images, className }: SectionImageGalleryProps) {
  if (!images.length) {
    return null
  }

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-3', className)}>
      {images.map((image) => (
        <article key={image.id} className="surface-card overflow-hidden">
          <div className="aspect-[4/3] w-full overflow-hidden bg-cream-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={image.altText ?? image.title ?? 'Bereichsbild'}
              className="h-full w-full object-cover"
              loading="lazy"
              src={image.imageUrl}
            />
          </div>
          {image.title ? (
            <div className="px-5 py-4">
              <p className="text-sm font-semibold text-charcoal-800">{image.title}</p>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  )
}
