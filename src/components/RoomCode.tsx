import styles from "./RoomCode.module.scss"
import copyImg from "../assets/img/copy.svg"

type RoomCodeProps = {
  code: string
}

export const RoomCode = (props: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code)
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