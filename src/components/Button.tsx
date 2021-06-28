import { ButtonHTMLAttributes } from "react"
import styles from "./Button.module.scss"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  hollow?: boolean
}

export const Button = ({hollow = false, ...props}: ButtonProps) => {
  const buttonStyle = hollow ? `${styles.Button} ${styles.Hollow}` : styles.Button
  return (
    <button className={buttonStyle} {...props}></button>
  )
}