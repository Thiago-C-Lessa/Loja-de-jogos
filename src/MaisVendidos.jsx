import Navbar from "./assets/navbar";
import React, { useState, useEffect } from "react";
import CardProduto from './assets/CardProduto';
import { ToastContainer, toast } from 'react-toastify';

function MaisVendidos() {
  function notify() {
    toast.success("Jogo adicionado no carrinho!", {
      position: "top-center", 
      autoClose: 2500, 
      theme: "dark", 
    });
  }

  const [pesquisa, setPesquisa] = useState("");
  const [plataforma] = useState("top10"); // define qual plataforma sera mostrado na pagina

  const [carrinho, setCarrinho] = useState(() => {
    // Carregar o carrinho do localStorage ou iniciar com um carrinho vazio
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho'));
    return carrinhoSalvo || [];
  });

  // Função de busca
  const busca = (Texto) => {
    setPesquisa(Texto);
  };

  // Função de adicionar ao carrinho
  const addToCart = (jogo) => {
    setCarrinho((prevCarrinho) => {
      const novoCarrinho = [...prevCarrinho, jogo];
      // Atualiza o localStorage sempre que o carrinho mudar
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      notify();
      return novoCarrinho;
    });
  };

  return (
    <div id="JogoPcConteiner">
      <Navbar onSearch={busca} />
      <h1 style={{ fontSize: '35px', fontWeight: 'bold', textAlign: 'center' , color:"#ff7f26" }}>Jogos mais vendidos</h1>
      {/* Passando a plataforma como prop para CardProduto */}
      <CardProduto 
        pesquisa={pesquisa} 
        addToCart={addToCart} 
        plataforma={plataforma} // Passando plataforma como parametro
      />
      <ToastContainer />
    </div>
  );
}

export default MaisVendidos;
