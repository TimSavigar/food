import * as React from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements
}

export const Card: React.FC<CardProps> = ({ className, as = 'div', children, ...props }) => {
  const Component = as as React.ElementType
  return (
    <Component
      className={cn('card bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200', className)}
      {...props}
    >
      {children}
    </Component>
  )
}