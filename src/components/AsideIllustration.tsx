import illustrationImg from "../assets/img/illustration.svg"
import styles from "./AsideIllustration.module.scss"

export const AsideIllustration = () => {
  return (
    <aside className={styles.AsideIllustration}>
      <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
      <strong>Crie salas de Q&amp;A ao vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo real</p>
    </aside>
  )
}