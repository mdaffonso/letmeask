import { useAuth } from "../hooks/useAuth"

import { useHistory } from "react-router-dom"

import { AsideIllustration } from "../components/AsideIllustration"
import { Button } from "../components/Button"
import { MainScaffold } from "../components/MainScaffold"

import logoImg from "../assets/img/logo.svg"
import googleIconImg from "../assets/img/google-icon.svg"

import "../styles/cover.scss"
import { FormEvent } from "react"
import { useState } from "react"
import { database } from "../services/firebase"

export const Home = () => {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState<string>()

  const handleCreateRoom = async () => {
    if(!user) {
      await signInWithGoogle()
    }
    history.push("/rooms/new")
  }

  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault()

    if(roomCode?.trim() === "") {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()) {
      alert("A sala não existe.")
      return
    }

    if(roomRef.val().endedAt) {
      alert("Esta sala já foi encerrada. :(")
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <MainScaffold>
      <AsideIllustration />
      <main>
        <div className="main-content">
          <img src={logoImg} alt="logo do letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={e => setRoomCode(e.target.value)} 
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </MainScaffold>
  )
}