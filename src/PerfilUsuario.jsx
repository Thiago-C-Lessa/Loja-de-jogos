import React, { useEffect, useState } from "react"; 
import NavbarInterna from "./assets/navbarInterna.jsx";
import "./Style/main.css";
import "./Style/navbarInterna.css";
import { useSelector } from "react-redux";
import EnderecoCard from "./assets/EnderecoCard.jsx";




function PerfilUsuario() {

  //acessa o o usuário no redux
  const { currentUser } = useSelector((state) => state.userReducer);
  const ID = currentUser.id;
  //console.log(currentUser.id)

  //função para converter a data de nascimento
  function formatacaoData(dateString) {
    const [ano, mes, dia] = dateString.split('-');
    return `${dia}/${mes}/${ano}`;
  }



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
            Nome completo: { currentUser.nome}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
            Data de nascimento: {formatacaoData(currentUser.dataNascimento)}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
            Endereço de E-mail: {currentUser.email}
          </li>
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 8%)", color: "white", borderColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}}>
          DADOS DO ENDEREÇO DO USUÁRIO
          </li>
          <EnderecoCard id={ID}></EnderecoCard>

          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
            

            <a href="/CriarEndereco/:usuarioId" className="btn btn-danger">
              Adicionar Endereço
            </a>

            <a href="/EditarEndereco/:usuarioId" className="btn btn-danger">
              Editar Endereços
            </a>

            <a href="/VisualizarEndereco/:usuarioId" className="btn btn-danger">
              Visualizar Endereços
            </a>

            <a href="/DeletarEndereco/:usuarioId" className="btn btn-danger">
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

      {/* Pagamentos cadastrados 
      <div className="card" style={{ maxWidth: "700px", margin: "100px auto" }}>
        <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)"}}>Pagamentos</div>
        <div className="card-body" style={{ backgroundColor:"hsl(235, 60%, 20%)"}}>
          <h5 className="card-title" style={{color: "white"}}>Pagamento cadastrados</h5>
          <a href={`/Pagamentos/${id}`} className="btn btn-danger">
            Acessar
          </a>
        </div>
      </div>
      */}
    </>
  );
}

export default PerfilUsuario;