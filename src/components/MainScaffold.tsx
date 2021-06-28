import styles from "./MainScaffold.module.scss"

export const MainScaffold = (props: any) => {
  return (
    <div className={styles.MainScaffold}>
      {props.children}
    </div>
  )
}