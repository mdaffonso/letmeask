import { Link } from "react-router-dom"
import logoImg from "../assets/img/logo.svg"

export const Logo = () => {
  return (
    <Link to="/">
      <img data-type="logo" src={logoImg} alt="logo do letmeask" />
    </Link>
  )
}