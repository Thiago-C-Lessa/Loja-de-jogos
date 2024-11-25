import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarInterna from "./assets/navbarInterna";
import "./Style/JogoDetalhes.css";

function JogoDetalhes() {
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../Json/jogos.json");
        const jogos = await response.json();

        // Verifica o jogo com o ID correspondente
        const jogoEncontrado = jogos.find((jogo) => jogo.id === id);

        setJogo(jogoEncontrado);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Carregando informações do jogo...</div>;
  }

  if (!jogo) {
    return <div>Jogo não encontrado.</div>;
  }

  return (
    <div>
      <NavbarInterna />
      <div className="jogo-detalhes-container">
        <h1 className="jogo-detalhes-titulo">{jogo.nome}</h1>
        <img
          src={jogo.imagem}
          alt={jogo.nome}
          className="jogo-detalhes-imagem"
        />
        <p className="jogo-detalhes-descricao">{jogo.descricao}</p>
        <p className="jogo-detalhes-preco">
          Preço: R$ {(jogo.preco/10).toFixed(2)}
        </p>
        <a href="/Carrinho" className="jogo-detalhes-botao">
          Comprar Agora
        </a>
      </div>
    </div>
  );
}

export default JogoDetalhes;
