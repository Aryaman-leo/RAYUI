import type { ButtonHTMLAttributes } from "react"
import "./Button.css"

export type ButtonProps = {
  label: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ label, ...props }: ButtonProps) => {
  return <button {...props}>{label}</button>
}

export default Button
