import * as React from 'react'
import { cn } from '@/utils/cn'
import { Spinner } from '@/components/ui/Spinner'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children?: React.ReactNode
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500',
  secondary: 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700',
  outline: 'border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white focus:ring-orange-500',
  ghost: 'text-orange-600 hover:bg-orange-50 focus:ring-orange-500'
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...rest }: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {

    return (
      <button
        ref={ref}
        data-variant={variant}
        data-size={size}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none',
          variantClasses[variant as keyof typeof variantClasses],
          sizeClasses[size as keyof typeof sizeClasses],
          className
        )}
        {...rest}
      >
        {isLoading && <Spinner size={16} className="mr-2" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'