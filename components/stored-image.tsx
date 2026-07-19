import { useEffect, useState } from 'react'
import { loadImage, isImageId } from '@/lib/image-store'

export const StoredImage = ({
  src,
  alt,
  className,
}: {
  src: string | null | undefined
  alt: string
  className?: string
}) => {
  const [resolved, setResolved] = useState<string | undefined>(
    src && !isImageId(src) ? src : undefined // raw URLs/base64 render immediately, no lookup needed
  )

  useEffect(() => {
    let cancelled = false

    if (!src) {
      setResolved(undefined)
      return
    }

    if (!isImageId(src)) {
      setResolved(src)
      return
    }

    loadImage(src).then((dataUrl) => {
      if (!cancelled) setResolved(dataUrl)
    })

    return () => {
      cancelled = true
    }
  }, [src])

  if (!resolved) {
    return <div className={`${className} bg-neutral-200 animate-pulse`} />
  }

  return <img src={resolved} alt={alt} className={className} />
}