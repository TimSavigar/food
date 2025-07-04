import React, { useEffect, useRef } from 'react'

interface PerformanceOptimizerProps {
  children: React.ReactNode
  preloadImages?: string[]
  preloadFonts?: string[]
  enableLazyLoading?: boolean
  enableIntersectionObserver?: boolean
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({
  children,
  preloadImages = [],
  preloadFonts = [],
  enableLazyLoading = true,
  enableIntersectionObserver = true
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Preload critical images
    preloadImages.forEach(imageUrl => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = imageUrl
      document.head.appendChild(link)
    })

    // Preload critical fonts
    preloadFonts.forEach(fontUrl => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.href = fontUrl
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // Set up Intersection Observer for lazy loading
    if (enableIntersectionObserver && enableLazyLoading) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              if (img.dataset.src) {
                img.src = img.dataset.src
                img.classList.remove('lazy')
                observerRef.current?.unobserve(img)
              }
            }
          })
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      )

      // Observe all lazy images
      const lazyImages = document.querySelectorAll('img[data-src]')
      lazyImages.forEach(img => {
        observerRef.current?.observe(img)
      })
    }

    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration)
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [preloadImages, preloadFonts, enableLazyLoading, enableIntersectionObserver])

  return <>{children}</>
}

// Image optimization component
interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  lazy?: boolean
  sizes?: string
  priority?: boolean
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = true,
  sizes = '100vw',
  priority = false
}) => {
  const generateSrcSet = (imageUrl: string) => {
    const sizes = [320, 640, 768, 1024, 1280, 1920]
    return sizes
      .map(size => `${imageUrl}?w=${size} ${size}w`)
      .join(', ')
  }

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget
    img.classList.add('loaded')
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget
    img.src = '/placeholder-image.jpg'
  }

  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} optimized-image`}
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="eager"
      />
    )
  }

  if (lazy) {
    return (
      <img
        data-src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} optimized-image lazy`}
        data-srcset={generateSrcSet(src)}
        data-sizes={sizes}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} optimized-image`}
      srcSet={generateSrcSet(src)}
      sizes={sizes}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  )
}

// Resource hints component
interface ResourceHintsProps {
  dnsPrefetch?: string[]
  preconnect?: string[]
  prefetch?: string[]
  preload?: Array<{ href: string; as: string; type?: string }>
}

export const ResourceHints: React.FC<ResourceHintsProps> = ({
  dnsPrefetch = [],
  preconnect = [],
  prefetch = [],
  preload = []
}) => {
  useEffect(() => {
    // DNS prefetch
    dnsPrefetch.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = domain
      document.head.appendChild(link)
    })

    // Preconnect
    preconnect.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      document.head.appendChild(link)
    })

    // Prefetch
    prefetch.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = url
      document.head.appendChild(link)
    })

    // Preload
    preload.forEach(({ href, as, type }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      if (type) link.type = type
      document.head.appendChild(link)
    })
  }, [dnsPrefetch, preconnect, prefetch, preload])

  return null
}

// Critical CSS inliner
export const CriticalCSS: React.FC<{ css: string }> = ({ css }) => {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [css])

  return null
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, parameters: any) => void
  }
}

// Performance monitoring
export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log('LCP:', lastEntry.startTime)
        
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'LCP', {
            value: Math.round(lastEntry.startTime),
            event_category: 'Web Vitals'
          })
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          const fidEntry = entry as PerformanceEntry & { processingStart: number }
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
          
          if (window.gtag) {
            window.gtag('event', 'FID', {
              value: Math.round(fidEntry.processingStart - fidEntry.startTime),
              event_category: 'Web Vitals'
            })
          }
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach(entry => {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value
            console.log('CLS:', clsValue)
            
            if (window.gtag) {
              window.gtag('event', 'CLS', {
                value: Math.round(clsValue * 1000) / 1000,
                event_category: 'Web Vitals'
              })
            }
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])

  return null
}

export default PerformanceOptimizer 