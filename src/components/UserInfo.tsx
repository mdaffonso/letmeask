import styles from "./UserInfo.module.scss"

type UserInfoProps = {
  image: string
  name: string
  strong?: boolean
}

export const UserInfo = (props: UserInfoProps) => {
  const infoStyle = props.strong ? `${styles.UserInfo} ${styles.Strong}` : styles.UserInfo
  return (
    <div className={infoStyle}>
      <img src={props.image} alt={props.name} />
      <span>{props.name}</span>
    </div>
  )
}