import React, { useEffect, useState } from "react"; 
import NavbarInterna from "./assets/navbarInterna.jsx";
import "./Style/main.css";
import "./Style/navbarInterna.css";
import { useSelector } from "react-redux";
import EnderecoCard from "./assets/EnderecoCard.jsx";




function PerfilUsuario() {

  //acessa o o usuário no redux
  const { currentUser } = useSelector((state) => state.userReducer);
  const ID = currentUser._id;
  

  //função para converter a data de nascimento
  function formatacaoData(dateString) {
    // Remove hora
    const partes = dateString.split('T')[0].split('Z')[0].split('/');
    
    
    if (partes[0].includes('-')) {
      const [ano, mes, dia] = partes[0].split('-');
      return `${dia}/${mes}/${ano}`;
    }
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
        
      <div className="card" style={{ width: "700px", margin: "auto", maxWidth:"100%"  }}>
        <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)", display: "flex", justifyContent: "center", alignItems: "center" }}>DADOS DO USUÁRIO</div>
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
          <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
            CPF: {currentUser.cpf}
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

    </>
  );
}

export default PerfilUsuario;