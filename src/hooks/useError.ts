import { useEffect, useState } from "react"

export const useError = (inputCode: string | null) => {

  const [error, setError] = useState("O endereço que você está procurando não existe")

  useEffect(() => {
    const codes = [
      {
        code: "unauthorized",
        message: "Somente o criador da sala pode ver as suas funções de administrador"
      },
    
      {
        code: "error",
        message: "Ocorreu um erro na sua solicitação"
      },

      {
        code: "closed",
        message: "Esta sala já foi fechada"
      },

      {
        code: "nonexistent",
        message: "O código de sala informado não corresponde a nenhuma sala"
      },

      {
        code: "logged",
        message: "Você precisa estar logado para postar uma pergunta"
      },

      {
        code: "info",
        message: "Você deve ter uma imagem de perfil e um nome de display registrados na sua conta do Google"
      },

      {
        code: "server",
        message: "Ocorreu um erro no servidor. Tente novamente."
      }
    ]
  
    const findError = codes.filter(c => c.code === inputCode?.toLowerCase())
    if(findError.length) {
      setError(findError[0].message)
    }
  }, [inputCode])

  return error
}