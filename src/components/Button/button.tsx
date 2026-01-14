import type { ButtonHTMLAttributes } from "react"

export type ButtonVariant = "primary"
export type ButtonSize = "md"

export type ButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
  }

export function Button({
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      data-variant={variant}
      data-size={size}
      {...props}
    />
  )
}
