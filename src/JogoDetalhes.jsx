import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarInterna from "./assets/navbarInterna";
import Avaliacoes from "./assets/Avaliacoes";
import "./Style/JogoDetalhes.css";
import axios from "axios";


function JogoDetalhes() {
  const{_id} = useParams();
  const[jogo, setJogo] = useState(null);
  const[loading, setLoading] = useState(true);

  const API_URL_JOGO = "https://localhost:5000/jogos";

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await fetch("../Json/jogos.json");
        const responseJogo = await axios.get(`${API_URL_JOGO}/${_id}`);
        setJogo(responseJogo.data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id]);

  const handleAdicionarAoCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push({
        id: jogo._id,
        nome: jogo.nome,
        imagem: jogo.imagem,
        preco: jogo.preco,
        quantidade: 1,
        quantidade_ps5: jogo.quantidade_ps5,
        quantidade_xbox: jogo.quantidade_xbox,
        quantidade_pc: jogo.quantidade_pc ,
      });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    history.push("/Carrinho"); // Navega para a página do carrinho
  };

  if(loading){
    return <div style={{color:"white"}}>Carregando informações do jogo...</div>;
  }

  if(!jogo){
    return <div style={{color:"white"}}>Jogo não encontrado.</div>;
  }

  return(
    <div>
      <NavbarInterna />
      <div className="jogo-detalhes-container"  style={{ maxWidth: "1200px"}}>
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

        
        <a href="/Carrinho" onClick={handleAdicionarAoCarrinho} className="jogo-detalhes-botao">Adicionar ao Carrinho</a>

        
        

        <Avaliacoes jogoId={_id} />
      </div>
    </div>
  );
}

export default JogoDetalhes;
