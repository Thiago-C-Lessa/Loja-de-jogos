import React, { useEffect, useState } from "react";
import axios from "axios";

function EnderecoCard(ID) {
  const API_URL = "http://localhost:5000/enderecos";

  const [end, setEnd] = useState([]);
  
  // Pega os endereços
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setEnd(response.data);
      })
      .catch((error) => {
        console.log("Erro ao carregar endereços:", error);
      });
  }, []);

  // Filtra os endereços
  const enderecosFiltrados = end.filter((endereco) => endereco.usuarioId === ID.id);

  // Se não houver endereços filtrados
  if (enderecosFiltrados.length === 0) {
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

  return enderecosFiltrados.map((endereco) => (
    <div
      key={endereco.id}
      style={{
        borderTop: "5px solid #000", // Linha grossa no topo
        borderBottom: "5px solid #000", // Linha grossa no fundo
      }}
    >
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
