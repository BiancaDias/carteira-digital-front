import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { User } from "../context/UserContext"

export default function TransactionsPage() {
  
  const { tipo } = useParams()
  const { user } = useContext(User);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("")
  const navigate = useNavigate()
  function transaction(e){
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/transaction`
    const config = {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    }
    let novoValor = valor;
    if(valor.includes(",")){
      novoValor = valor.replace(",",".")
    }
    const body = {valor:novoValor, descricao, tipo}
    axios.post(url, body, config)
      .then(() => navigate("/home"))
      .catch((err) =>{
        if(err.response.status === 401 || err.response.status === 404){
          alert("Usuario deslogado! Por favor, faça login");
          navigate("/")
        }
        if(err.response.status === 422){
          alert("O valor não é valido! Favor verificar se o valor digitado é positivo");
        }
      })
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={transaction}>
        <input 
          placeholder="Valor" 
          type="text"
          id="valor"
          value={valor}
          onChange={e => setValor(e.target.value)}
          required
        />
        <input 
          placeholder="Descrição" 
          type="text" 
          id="descricao"
          value={descricao}
          onChange = {e => setDescricao(e.target.value)}
          required
        />
        <button>Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
