import React, { useEffect, useState } from "react";
import axios from "axios";

function EnderecoCard({ID}) {
  const API_URL = "http://localhost:5000/enderecos";

  const [enderecos, setEnderecos] = useState([]);



  // Pega os endereços
  useEffect(() => {
    axios
      .get(`${API_URL}/${ID}`)
      .then((response) => {
        setEnderecos(response.data);
      })
      .catch((error) => {
        console.log("Erro ao carregar endereços:", error);
      });
  }, []);

  

  // Se não houver endereços filtrados
  if (enderecos.length === 0) {
    return (
      <li
        className="list-group-item"
        style={{
          backgroundColor: "hsl(235, 60%, 20%)",
          color: "white",
          borderColor: "black",
        }}
      >
        Endereço não disponível.
      </li>
    );
  }
  
  return  enderecos.map((endereco,index) => (
    <div
      key={endereco._id}
      style={{
        borderTop: "5px solid #000", // Linha grossa no topo
        borderBottom: "5px solid #000", // Linha grossa no fundo
        marginBottom: "10px solid ", // Distância entre os endereços
      }}
    >
     <h4
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor: "hsl(235, 60%, 22%)",
          padding: "5px",
          margin: "0",
        }}
      >
        Endereço {index + 1}
      </h4>
      
      <li
        className="list-group-item"
        style={{
          backgroundColor: "hsl(235, 60%, 20%)",
          color: "white",
          borderColor: "black",
        }}
      >
        Rua: {endereco.rua}
      </li>
      
      <li
        className="list-group-item"
        style={{
          backgroundColor: "hsl(235, 60%, 22%)",
          color: "white",
          borderColor: "black",
        }}
      >
        Número: {endereco.numero}
      </li>
      
      <li
        className="list-group-item"
        style={{
          backgroundColor: "hsl(235, 60%, 22%)",
          color: "white",
          borderColor: "black",
        }}
      >
        Cidade: {endereco.cidade}
      </li>

      <li
        className="list-group-item"
        style={{
          backgroundColor: "hsl(235, 60%, 20%)",
          color: "white",
          borderColor: "black",
        }}
      >
        Estado: {endereco.estado}
      </li>
      
      
      
      <li
        className="list-group-item"
        style={{
          backgroundColor: "hsl(235, 60%, 20%)",
          color: "white",
          borderColor: "black",
        }}
      >
        CEP: {endereco.cep}
      </li>
    </div>
  ));
}

export default EnderecoCard;
