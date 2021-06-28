import { useState, useEffect } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth"

type FirebasQuestions = Record<string, {
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likes: Record<string, {
    authorId: string
  }>
}>

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likeCount: number
  likeId: string | undefined
}

export const useRoom = (roomId: string) => {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [title, setTitle] = useState<string>()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)
    
    roomRef.on("value", room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebasQuestions = databaseRoom.questions ?? {}
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })
      setQuestions(parsedQuestions)
      setTitle(databaseRoom.title)
      setLoading(false)
    })

    return () => {
      roomRef.off("value")
    }

  }, [roomId, user?.id])

  return { questions, title, loading }
}