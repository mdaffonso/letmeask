import { createContext, ReactNode, useCallback } from "react"

import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { firebase, auth } from "../services/firebase"

type AuthContextType = {
  user: UserType | undefined,
  signInWithGoogle: () => Promise<void>
}

type UserType = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = (props: AuthContextProviderProps) => {

  const history = useHistory()
  const [user, setUser] = useState<UserType>()

  const authenticate = useCallback((user: any) => {
    if(user) {
      const { displayName, photoURL, uid } = user

      if(!displayName || !photoURL) {
        history.push("/bad?r=info")
        return
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }, [history])

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged(user => {
        authenticate(user)
      })
      
      return () => {
        unsubscribe()
      }
    } catch {
      history.push("/bad?r=server")
    }
  }, [authenticate, history])

  const signInWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      const result = await auth.signInWithPopup(provider)
  
      authenticate(result.user)
    } catch {
      history.push("/bad?r=server")
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}