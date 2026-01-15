export type ButtonProps = {
  label: string
  onClick?: (() => void) | undefined
}

export const Button = (props: ButtonProps) => {
  return <button>{props.label}</button>
}

export default Button;