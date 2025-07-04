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

declare module 'lucide-react/dist/esm/icons/*' {
  import * as React from 'react'
  const Icon: React.FC<React.SVGProps<SVGSVGElement>>
  export default Icon
}