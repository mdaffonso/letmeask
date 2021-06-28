import { ReactNode } from "react"
import { UserInfo } from "../components/UserInfo"
import styles from "./Question.module.scss"

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
  isAnswered?: boolean
  isHighlighted?: boolean
}

export const Question = ({content, author, children, isAnswered, isHighlighted}: QuestionProps) => {

  const questionStyle = [
    styles.Question,
    isAnswered && styles.Answered,
    isHighlighted && !isAnswered && styles.Highlighted
  ].join(" ")

  return (
    <div className={questionStyle}>
      <p>{content}</p>
      <footer>
        <UserInfo image={author.avatar} name={author.name} />
        
        <div className={styles.Buttons}>
          {children}
        </div>
      </footer>
    </div>
  )
}