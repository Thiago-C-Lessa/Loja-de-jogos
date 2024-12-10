import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarInterna from "./assets/navbarInterna";
import Avaliacoes from "./Avaliacoes";
import "./Style/JogoDetalhes.css";


function JogoDetalhes() {
  const{id} = useParams();
  const[jogo, setJogo] = useState(null);
  const[loading, setLoading] = useState(true);

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

  const handleAdicionarAoCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExistente = carrinho.find(item => item.id === jogo.id);

    if(itemExistente){
      itemExistente.quantidade += 1;
    }else{
      carrinho.push({
        id: jogo.id,
        nome: jogo.nome,
        imagem: jogo.imagem,
        preco: jogo.preco,
        quantidade: 1,
        plataforma: null,
      });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    history.push("/Carrinho"); // Navega para a página do carrinho
  };

  if(loading){
    return <div>Carregando informações do jogo...</div>;
  }

  if(!jogo){
    return <div>Jogo não encontrado.</div>;
  }

  return(
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

        <button onClick={handleAdicionarAoCarrinho} className="jogo-detalhes-botao">
          Adicionar ao Carrinho
        </button>

        <Avaliacoes jogoId={id} />
      </div>
    </div>
  );
}

export default JogoDetalhes;
