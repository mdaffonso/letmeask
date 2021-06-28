import styles from "./RoomCode.module.scss"
import copyImg from "../assets/img/copy.svg"
import toast from "react-hot-toast"

type RoomCodeProps = {
  code: string
}

export const RoomCode = (props: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    try {
      navigator.clipboard.writeText(props.code)
      toast.success("O código foi copiado para a sua área de transferência!")
    } catch {
      toast.error("Ocorreu um erro ao tentar copiar o código para a sua área de transferência. :(")
    }
  }

  return (
    <button data-type="code" className={styles.RoomCode} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="copiar o código da sala" />
      </div>
      <span>{props.code}</span>
    </button>
  )
}