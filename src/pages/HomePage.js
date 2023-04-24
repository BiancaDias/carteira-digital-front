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
    console.log(user.token)
    const url = `${process.env.REACT_APP_API_URL}/logout`;
    const body = { token: user.token }
    axios.post(url, body)
      .then(() => {
        console.log("chegou aqui");
        setUser(null);
        navigate('/')
      })
      .catch((e) => alert(e.response.status))
  }

  useEffect(() => {
    const url = "http://localhost:5000/transaction"
    axios.get(url, config)
      .then(e => {
        setTransactions(e.data);
      })
      .catch(e => {
        alert(e)
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

      <TransactionsContainer>
        <ul>
          {transactions.map((transactions) =>
            <ListItemContainer>
              <div key={transactions._id}>
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
      </TransactionsContainer>


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
    position: fixed
    width: 100%;
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  a {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    color: inherit;
    background: #A328D6;
    border-radius: 5px;

    button {
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-size: 18px;
      }
    }
  }
`;


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