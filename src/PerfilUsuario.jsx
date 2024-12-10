import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";  
import axios from "axios"; 
import NavbarInterna from "./assets/navbarInterna.jsx";
import "./Style/main.css";
import "./Style/navbarInterna.css";

function PerfilUsuario() {
  const { id } = useParams();  
  const [endereco, setEndereco] = useState(null); 

  useEffect(() => {
    const fetchEndereco = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/endereco`); // Ajuste a URL conforme necessário
        const enderecos = response.data;

        // Filtrar o endereço com o maior ID
        const enderecoMaiorId = enderecos.reduce((prev, current) => {
          return (prev.id > current.id) ? prev : current;
        });

        setEndereco(enderecoMaiorId); // Armazena o endereço com o maior ID no estado
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
      }
    };

    fetchEndereco(); 
  }, []); // O efeito será executado apenas uma vez ao montar o componente

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
        
      <div className="card" style={{ width: "700px", margin: "auto" }}>
        <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)", display: "flex", justifyContent: "center", alignItems: "center"}}>DADOS DO USUÁRIO</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
            Nome completo: {/* Aqui você pode adicionar o nome do usuário */}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
            Data de nascimento: {/* Aqui você pode adicionar a data de nascimento do usuário */}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
            Endereço de E-mail: {/* Aqui você pode adicionar o e-mail do usuário */}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 8%)", color: "white", borderColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}}>
          DADOS DO ENDEREÇO DO USUÁRIO (mais recente)
          </li>

          {endereco && (
            <>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                Estado: {endereco.estado}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
                Cidade: {endereco.cidade}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                Rua: {endereco.rua}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
                Número: {endereco.numero}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                CEP: {endereco.cep}
              </li>
            </>
          )}
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
            

            <a href="/CriarEndereco/:id" className="btn btn-danger">
              Adicionar Endereço
            </a>

            <a href="/EditarEndereco/:id" className="btn btn-danger">
              Editar Endereços
            </a>

            <a href="/VisualizarEndereco/:id" className="btn btn-danger">
              Visualizar Endereços
            </a>

            <a href="/DeletarEndereco/:id" className="btn btn-danger">
              Remover Endereço
            </a>
          </li>
        </ul>
      </div>

      {/* Histórico de Compras */}
      <div className="card" style={{ maxWidth: "700px", margin: "100px auto" }}>
        <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)"}}>Histórico de Compras</div>
        <div className="card-body" style={{ backgroundColor:"hsl(235, 60%, 20%)"}}>
          <h5 className="card-title" style={{color: "white"}}>Ver histórico de compras</h5>
          <a href="#" className="btn btn-danger">
            Acessar
          </a>
        </div>
      </div>

      {/* Pagamentos cadastrados */}
      <div className="card" style={{ maxWidth: "700px", margin: "100px auto" }}>
        <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)"}}>Pagamentos</div>
        <div className="card-body" style={{ backgroundColor:"hsl(235, 60%, 20%)"}}>
          <h5 className="card-title" style={{color: "white"}}>Pagamento cadastrados</h5>
          <a href={`/Pagamentos/${id}`} className="btn btn-danger">
            Acessar
          </a>
        </div>
      </div>
    </>
  );
}

export default PerfilUsuario;