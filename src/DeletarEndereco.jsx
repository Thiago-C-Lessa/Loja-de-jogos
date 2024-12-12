import React, { useEffect, useState } from "react"; 
import axios from "axios"; 
import NavbarInterna from "./assets/navbarInterna.jsx";
import { useParams } from "react-router-dom";
import "./Style/main.css";
import "./Style/navbarInterna.css";

function DeletarEndereco() {
  const { usuarioId } = useParams(); // Obter o ID do usuário da URL
  const [enderecos, setEnderecos] = useState([]); 

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/endereco/${usuarioId}`); // Ajuste a URL conforme necessário
        setEnderecos(response.data); 
      } catch (error) {
        console.error("Erro ao buscar os endereços:", error);
      }
    };

    fetchEnderecos(); 
  }, [usuarioId]); 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/endereco/${id}`); // Ajuste a URL conforme necessário
      alert("Endereço deletado com sucesso!");
      // Remove o endereço deletado da lista no estado local
      setEnderecos(enderecos.filter((endereco) => endereco.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o endereço:", error);
      alert("Erro ao deletar o endereço.");
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
          Deletar Endereço
        </div>
      </div>

      <div className="container" style={{ margin: "auto", maxWidth: "700px" }}>
        {enderecos.map((endereco) => (
          <div className="card" key={endereco.id} style={{ margin: "10px 0" }}>
            <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)"}}>
              Endereço ID: {endereco.id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                Estado: {endereco.estado}
              </li>
              <li className="list-group-item " style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
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
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                <button className="btn btn-danger" onClick={() => handleDelete(endereco.id)}>
                  Deletar
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default DeletarEndereco;