import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext, useEffect, useState } from "react";
import { User } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function HomePage() {

  const navigate = useNavigate();
  const { user, setUser } = useContext(User);
  const [transactions, setTransactions] = useState([]);
  const [saldo, setSaldo] = useState(0)
  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  }
  function logOut() {
 
    const url = `${process.env.REACT_APP_API_URL}/logout`;
    const body = { token: user.token }
    axios.post(url, body)
      .then(() => {
        setUser(null);
        localStorage.setItem("user", JSON.stringify({}));
        navigate('/')
      })
      .catch((e) => {
        if(!user.token){
          alert("Faça loguin")
          navigate('/')
        }else{
          alert(e.response.status)
        }
      })
  }

  useEffect(() => {
    
    const url = `${process.env.REACT_APP_API_URL}/transaction`
    axios.get(url, config)
      .then(e => {
        setTransactions(e.data);
      })
      .catch(e => {
        if(!user.token){
          alert("Faça login")
          navigate('/')
        }
      })
  }, [])

  useEffect(() => {
    exibeSaldo();
  }, [transactions]);

  function exibeSaldo() {
    let total = 0;
    transactions.forEach((t) => {
      const valor = parseFloat(t.valor);
      if (t.type === "saida") {
        total -= valor;
      } else {
        total += valor;
      }
    })
    setSaldo(total)
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={logOut} />
      </Header>
      {transactions.length!==0?<TransactionsContainer>
        
        <ul>
          {transactions.map((transactions) =>
            <ListItemContainer key={transactions._id}>
              <div>
                <span>{transactions.dia}</span>
                <strong>{transactions.descricao}</strong>
              </div>
              <Value color={transactions.type === "saida" ? "negativo" : "positivo"}>{parseFloat(transactions.valor).toFixed(2).replace(".", ",")}</Value>
            </ListItemContainer>
          )}

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={saldo < 0 ? "negativo" : "positivo"}>{saldo.toFixed(2).replace(".", ",")}</Value>
        </article>
      </TransactionsContainer>:
      <TransactionsContainerVazio>
        <p>Não há registros de entrada ou saída</p>
      </TransactionsContainerVazio>}


      <ButtonsContainer>
        <Link to={"/nova-transacao/entrada"}>
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
        <Link to={"/nova-transacao/saida"}>
          <button>
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`

const TransactionsContainerVazio = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  p{
    width: 180px;
    height: 46px;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
  }
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  position: relative;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
    width: 100%;
  }
  ul{
    overflow-y: scroll;
    margin-bottom: 10px;
  }
`
const ButtonsContainer = styled.section`
  margin-top: 0;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  a {
    width: 50%;
    button {
    width: 100%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
      }
    }
  }
`

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`