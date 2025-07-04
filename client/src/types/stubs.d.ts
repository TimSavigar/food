declare module 'lucide-react/dist/esm/icons/*' {
  import * as React from 'react'
  const Icon: React.FC<React.SVGProps<SVGSVGElement>>
  export default Icon
}

declare module 'framer-motion' {
  import * as React from 'react'
  /**
   * Minimal stub so TS can resolve when official typings cannot be found in certain bundler setups.
   */
  export interface MotionProps {
    [key: string]: any
  }

  export const motion: {
    div: React.FC<MotionProps>
    span: React.FC<MotionProps>
    svg: React.FC<MotionProps>
    // fallback for any other element tag
    <T extends keyof JSX.IntrinsicElements>(
      tag: T
    ): React.FC<MotionProps & JSX.IntrinsicElements[T]>
  }

  export const AnimatePresence: React.FC<{ children?: React.ReactNode }>
  export const useAnimation: () => any
  export const useMotionValue: <T>(value: T) => any
}