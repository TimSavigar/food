import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { OptimizedImage } from './seo/PerformanceOptimizer'

interface AIImageProps {
  /** Text prompt sent to the backend for DALL-E generation */
  prompt: string
  /** Alternative text for the image */
  alt: string
  /** CSS classes applied to the <img> element */
  className?: string
  /** Desired square size (e.g. 256 | 512 | 1024). Backend may override. */
  size?: number
}

/**
 * Fetches (or generates + caches) an AI image from the backend.
 * The backend endpoint POST /api/images/generate should accept { prompt, size }
 * and return { url } with a permanent URL for the image.
 */
const fetchAIImage = async (prompt: string, size: number = 512): Promise<string> => {
  const res = await fetch('/api/images/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt, size })
  })

  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message || 'Failed to generate image')
  }
  const data = await res.json()
  return data.url as string
}

const AIImage: React.FC<AIImageProps> = ({ prompt, alt, className = '', size = 512 }) => {
  const { data: imageUrl, isLoading, isError } = useQuery({
    queryKey: ['ai-image', prompt, size],
    queryFn: () => fetchAIImage(prompt, size),
    staleTime: Infinity, // cache forever for same prompt
    retry: 1
  })

  if (isLoading) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`animate-pulse bg-gray-200 ${className}`}
      />
    )
  }

  if (isError || !imageUrl) {
    return (
      <img
        src="/placeholder-image.jpg"
        alt={alt}
        className={className}
        loading="lazy"
      />
    )
  }

  return (
    <OptimizedImage
      src={imageUrl}
      alt={alt}
      width={size}
      height={size}
      className={className}
      lazy
    />
  )
}

export default AIImage