import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const url = "";
  function cadastro(e){
    e.preventDefault();
    if(password !== confirmPassword){
      alert("As senhas devem ser iguais")
      return;
    }
    const body = {name, email, password};
    axios.post(url, body)
      .then(() => navigate('/'))
      .catch((err) =>{
        alert(err.message)
      })
  }
  return (
    <SingUpContainer>
      <form onSubmit={cadastro}>
        <MyWalletLogo />
        <input 
          placeholder="Nome"
          type="text" 
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="E-mail" 
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input 
          placeholder="Senha" 
          type="password" 
          //autocomplete="new-password" 
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input 
          placeholder="Confirme a senha" 
          type="password" 
         // autocomplete="new-password" 
          id="confirmPassword"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button>Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
