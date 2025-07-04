import * as React from 'react'
import { cn } from '@/utils/cn'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 24, className, ...props }) => (
  <div
    role="status"
    className={cn('animate-spin rounded-full border-2 border-orange-200 border-t-orange-600', className)}
    style={{ width: size, height: size, borderWidth: size / 12 }}
    {...props}
  />
)