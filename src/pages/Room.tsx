import { useHistory, useParams } from "react-router-dom"
import { FormEvent, useState, useEffect } from "react"
import { Button } from "../components/Button"
import { Logo } from "../components/Logo"
import { Question } from "../components/Question"
import { RoomCode } from "../components/RoomCode"
import { Spinner } from "../components/Spinner"
import { UserInfo } from "../components/UserInfo"

import { useAuth } from "../hooks/useAuth"
import { useRoom } from "../hooks/useRoom"
import { database } from "../services/firebase"

import "../styles/rooms.scss"

type RoomParams = {
  id: string
}

export const Room = () => {
  const { user } = useAuth()
  const history = useHistory()
  const params = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState<string>()
  const roomId = params.id
  const { questions, title, loading } = useRoom(roomId)

  useEffect(() => {
    const checkRef = async () => {
      const roomRef = await database.ref(`rooms/${roomId}`).get()
      if(!roomRef.val()) {
        history.push("/bad?r=nonexistent")
        return
      }

      if(roomRef.val().endedAt) {
        history.push("/bad?r=closed")
        return
      }

      if(roomRef.val().authorId === user?.id) {
        history.push(`/admin/rooms/${roomId}`)
        return
      }
    }
    checkRef()
  }, [roomId, history, user])

  const handleSendQuestion = async (e: FormEvent) => {
    e.preventDefault()
    if(newQuestion?.trim() === "") {
      return
    }

    if(!user) {
      history.push("/bad?r=logged")
      return
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion("")
  }

  const handleLikeQuestion = async (questionId: string, likeId: string | undefined) => {
    if(likeId) {
      return await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
    }

    return await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
      authorId: user?.id,
    })
  }

  return (
    loading ? (
      <Spinner />
    ) : (
      <div id="page-room">
        <header>
          <div className="content">
            <Logo />
            <RoomCode code={roomId} />
          </div>
        </header>
        <main>
          <div className="room-title">
            <h1>{title}</h1>
            { questions.length > 0 && <span data-singular={questions.length === 1 ? "yes" : "no"}>{questions.length}</span> }
          </div>

          <form onSubmit={handleSendQuestion}>
            <textarea 
              placeholder="O que voc?? quer perguntar?" 
              onChange={e => setNewQuestion(e.target.value)}
              value={newQuestion}
              autoFocus
            />

            <div className="form-footer">
              
              {
                user ? (
                  <UserInfo image={user.avatar} name={user.name} strong={true} />
                ) : (
                  <span>Para enviar uma pergunta, <button>fa??a seu login</button></span> 
                )
              }

              <Button type="submit" disabled={!user}>Enviar pergunta</Button>
            </div>
          </form>

          <div>
            {
              questions.map(q => (
                <Question 
                  author={q.author}
                  content={q.content} 
                  key={q.id} 
                  isHighlighted={q.isHighlighted}
                  isAnswered={q.isAnswered}
                >

                {!q.isAnswered && (
                  <button
                    onClick={() => handleLikeQuestion(q.id, q.likeId)}
                    className={ `like-button ${q.likeId && "liked"}` }
                    type="button"
                    aria-label="marcar como gostei"
                  >
                    { q.likeCount > 0 && <span>{q.likeCount}</span> }
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}

                </Question>
              ))
            }
          </div>
        </main>
      </div>
    )
  )
}