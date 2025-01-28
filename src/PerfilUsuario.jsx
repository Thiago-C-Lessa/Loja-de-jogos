import React, { useEffect, useState } from "react"; 
import NavbarInterna from "./assets/navbarInterna.jsx";
import "./Style/main.css";
import "./Style/navbarInterna.css";
import { useSelector, useDispatch } from 'react-redux';
import EnderecoCard from "./assets/EnderecoCard.jsx";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function PerfilUsuario() {

  //acessa o o usuário no redux
  const { currentUser } = useSelector((state) => state.userReducer);
  const ID = currentUser._id;
  
  const API_URL = "https://localhost:5000/usuarios"

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`${API_URL}/getById/${ID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const users = response.data;

      const dataNascimento = new Date(users.dataNascimento);
      // Formatando a data para "dd/mm/yyyy"
      const dataFormatada = dataNascimento.toISOString().split('T')[0];
        setFormData({
          nome: users.nome,
          dataNascimento: dataFormatada,
          email: users.email,
          cpf: users.cpf,

        });

      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUsuario();
  }, [ID]);

  const handleDelete = async () => {
    try {
      // Faz a requisição DELETE para a API
      await axios.delete(`${API_URL}/${ID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Exibe um toast de sucesso e navega após 1 segundo
      toast.success("Usuário excluído!", {
        position: "top-center",
        autoClose: 2500,
        theme: "dark",
      });
      dispatch({
        type: 'user/logout', // Dispara a ação de logout
      });
      localStorage.removeItem('token');
      navigate("/", { state: { message: "Usuário excluído com sucesso!" } });
    } catch (error) {
      // Caso ocorra um erro, exibe a mensagem e loga o erro no console
      console.error("Erro ao deletar usuário:", error);
      alert("ERRO AO DELETAR USUÁRIO");
    }
  };
  




  return (
    <>
      <NavbarInterna />

      <div className="card" style={{ height: "100px" }}>
        <div
          className="card-body"
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "white",
            fontSize: "xx-large",
          }}
        >
          Perfil de Usuário
        </div>
      </div>
        
      <div className="card" style={{ width: "700px", margin: "auto", maxWidth:"100%"  }}>
        <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)", display: "flex", justifyContent: "center", alignItems: "center" }}>DADOS DO USUÁRIO</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
            Nome completo: { formData.nome}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
            Data de nascimento: {formData.dataNascimento}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
            Endereço de E-mail: {formData.email}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
            CPF: {formData.cpf}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black", textAlign: "center",}}>
            
            <a href={`/EditarUsuario`} className="btn btn-danger" style={{marginRight:'1rem'}}>
              Editar usuario
            </a>
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 8%)", color: "white", borderColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}}>
          ENDEREÇO DO USUÁRIO
          </li>

           <EnderecoCard ID={ID}></EnderecoCard>  


          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black", textAlign: "center",}}>
            
            <a href={`/GerirEndereco`} className="btn btn-danger" >
              Acessar
            </a>
          </li>
          
        </ul>
      </div>

      {/* Histórico de Compras */}
      <div className="card" style={{ maxWidth: "700px", margin: "25px auto" }}>
        <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)"}}>Histórico de Compras</div>
        <div className="card-body" style={{ backgroundColor:"hsl(235, 60%, 20%)"}}>
          <h5 className="card-title" style={{color: "white"}}>Ver histórico de compras</h5>
          <a href="/historicoCompras"  className="btn btn-danger">
            Acessar
          </a>
        </div>
      </div>


      <div>
        <div className="card" style={{ maxWidth: "700px", margin: "0px auto"}}>
          <div
            className="card-header"
            style={{ color: "white", backgroundColor: "hsl(235, 60%, 8%)" }}
          >
            Pagamentos
          </div>
          <div className="card-body" style={{ backgroundColor: "hsl(235, 60%, 20%)" }}>
            <h5 className="card-title" style={{ color: "white" }}>
              Pagamento cadastrados
            </h5>
            <a href={`/Pagamentos`} className="btn btn-danger">
              Acessar
            </a>
          </div>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={handleDelete} className="btn"
          style={{ marginRight: '1rem', backgroundColor: 'red', color: 'white' }}
        >
          Deletar usuário
        </button>
      </div>

          <ToastContainer/>

    </>
  );
}

export default PerfilUsuario;