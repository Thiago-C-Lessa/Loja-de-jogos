import React, { useEffect, useState } from "react";
import NavbarInterna from "./assets/navbarInterna.jsx";
import "./Style/main.css";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Style/HistoricoCompras.css";

function HistoricoCompras() {
  const { currentUser } = useSelector((state) => state.userReducer); // Usuário atual
  const ID = currentUser?._id;

  const API_URL_pedidos = "http://localhost:5000/pedidos";
  const API_URL_endereco = "http://localhost:5000/enderecos";

  const [pedidos, setPedidos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  // Carregar pedidos do usuário
  useEffect(() => {
    const carregarDados = async () => {
        try {
            const [responsePedidos, responseEndereco] = await Promise.all([
                axios.get(`${API_URL_pedidos}/${ID}`),
                axios.get(`${API_URL_endereco}/${ID}`),
            ]);
            setPedidos(responsePedidos.data);
            setEnderecos(responseEndereco.data);
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    };
    carregarDados();
}, [ID]);

  // Função para obter o nome do endereço pelo ID
  const obterEndereco = (enderecoId) => {
    const endereco = enderecos.find((endereco) => endereco._id === enderecoId);
    return endereco ? `${endereco.rua}, numero ${endereco.numero}` : "Endereço não encontrado";
  };

  return (
    <div>
      <NavbarInterna />
      <div className="container my-4">
        <h1 style={{ color: "White", textAlign: "center" }}>
          Compras realizadas
        </h1>

        {/* Se não houver pedidos */}
        {pedidos.length === 0 ? (
          <div _id="vazio">
            <h4 style={{ color: "white", textAlign: "center" }}>
              Ainda não há compras realizadas.
            </h4>
          </div>
        ) : (
          <div>
            {pedidos.map((pedido) => (
              <div key={pedido._id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid white", borderRadius: "8px" }}>
                <div className="card-body" style={{ color: "white" }}>
                  <h2>Pedido do Dia {new Date(pedido.data).toLocaleDateString() } </h2>
                  
                  <div className="d-flex justify-content-between" >
                    <div className="esquerda">
                      <strong>Identificador do pedido:</strong> {pedido._id}
                    </div>
                    <div className="direita">
                      <strong>Número de jogos:</strong> {pedido.jogosComprados.length}
                    </div>
                  </div>

                  <div>
                    <strong>Jogos:</strong>
                    {pedido.jogosComprados.map((jogo, index) => (
                      <div key={index} _id="jogos">
                        <div style={{backgroundColor: "hsl(235, 60%, 22%)"}}><strong>Jogo:</strong> {jogo.jogo}</div>
                        <div><strong>Plataforma:</strong> {jogo.plataformaSelecionada}</div>
                        <div><strong>Quantidade:</strong> {jogo.quantidade}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <strong>Endereço:</strong>
                    <div style={{ backgroundColor: "hsl(235, 60%, 22%)", padding: "5px", margin: "5px 0", borderRadius: "5px" }}>
                      Rua: {obterEndereco(pedido.enderecoId)}
                    </div>
                  </div>

                  <div className="">
                    <strong>Total:</strong> {pedido.total}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoricoCompras;
