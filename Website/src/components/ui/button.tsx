import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-base font-black uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tiktok-border',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-viralify-purple to-viralify-pink text-white hover:opacity-90 hover:scale-105',
        destructive:
          'bg-red-600 text-white hover:bg-red-700',
        outline:
          'border-2 border-white bg-transparent text-white hover:bg-white hover:text-black',
        secondary:
          'bg-gradient-to-r from-viralify-orange to-viralify-red text-white hover:opacity-90 hover:scale-105',
        ghost: 'bg-transparent hover:bg-white/10 border-0',
        link: 'text-viralify-pink underline-offset-4 hover:underline border-0',
      },
      size: {
        default: 'h-14 px-8 py-4',
        sm: 'h-10 px-4 py-2 text-sm',
        lg: 'h-16 px-10 py-5 text-xl',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

