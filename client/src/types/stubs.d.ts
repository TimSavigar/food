declare module 'framer-motion' {
  // Framer Motion ships its own typings, but in case of resolution issues, fall back to any.
  const Motion: any
  export = Motion
}

declare module 'lucide-react' {
  import * as React from 'react'

  /**
   * Generic icon component exported by lucide-react.
   * Real package ships proper typings, this is a minimal fallback.
   */
  export type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>

  const icons: Record<string, LucideIcon>

  export default icons
}