import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useContext } from "react";
import { User } from "../context/UserContext";
import axios from "axios";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(User);

  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_API_URL}`;
  function login(e){
    e.preventDefault();
    const body = {email, password};
    axios.post(url, body)
      .then((e) => {
        const {token, name} = e.data;
        localStorage.setItem("user", JSON.stringify({token, name}));
        setUser({token, name})
        navigate("/home");
      })
      .catch((err) =>{
        if(err.response.status === 401){
          alert("senha incorreta");
        }
        else if(err.response.status === 404){
          alert("e-mail não cadastrado");
        }
        else if(err.response.status === 422){
          alert("Favor inserir um e-mail valido")
        }
        else{
          alert("Um erro inesperado ocorreu! Favor tentar novamente")
        }
      })
  }
  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
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
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button>Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
