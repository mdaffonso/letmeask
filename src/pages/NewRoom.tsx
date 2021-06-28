import { FormEvent, useState } from "react"

import { useAuth } from "../hooks/useAuth"

import { AsideIllustration } from "../components/AsideIllustration"
import { Button } from "../components/Button"
import { Link, useHistory } from "react-router-dom"
import { MainScaffold } from "../components/MainScaffold"

import { database } from "../services/firebase"

import logoImg from "../assets/img/logo.svg"

import "../styles/cover.scss"

export const NewRoom = () => {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState<string>()

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault()

    if(newRoom?.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms")
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <MainScaffold>
      <AsideIllustration />
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo do letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui.</Link>
          </p>
        </div>
      </main>
    </MainScaffold>
  )
}