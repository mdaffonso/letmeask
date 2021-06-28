import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Button } from "../components/Button"
import { useError } from "../hooks/useError"
import { useQuery } from "../hooks/useQuery"

import "../styles/unauthorized.scss"

export const Unauthorized = () => {
  const history = useHistory()
  const makeSadEmoji = () => {
    const emojis = [
      "😔", "😥", "😕", "🙁", "😞", "😟", "😢"
    ]

    const randomEntry = Math.floor(Math.random()*(emojis.length-1))
    return emojis[randomEntry]
  }
  const query = useQuery().get("r")
  const error = useError(query)
  
  useEffect(() => {
    setTimeout(() => {
      history.push("/")
    }, 5000)
  }, [history])

  return (
    <div id="pg-unauthorized">
      <h1>{makeSadEmoji()}</h1>
      <p className="error">{error}</p>

      <p>Você será redirecionado automaticamente em 5 segundos</p>

      <Link to="/">
        <Button>
          voltar para a home
        </Button>
      </Link>
    </div>
  )
}