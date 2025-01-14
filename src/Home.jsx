import React, { useState, useEffect } from "react";
import Navbar from './assets/navbar';
import Carousel from "./assets/carouselPrincipal";
import CardProduto from './assets/CardProduto';
import './Style/Home.css';
import { ToastContainer, toast } from 'react-toastify';



function Home() {
  function notify() {
    toast.success("Jogo adicionado no carrinho!", {
      position: "top-center", 
      autoClose: 2500, 
      theme: "dark", 
    });
  }
  const [plataforma, setPlataforma] = useState("todos");   // define qual plataforma vai ser mostrada na tela

  const [pesquisa, setPesquisa] = useState("");

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

    const jogoComQuantidade = { ...jogo, quantidade: 1 };
    
    setCarrinho((prevCarrinho) => {
      const novoCarrinho = [...prevCarrinho, jogoComQuantidade];
      // Atualiza o localStorage sempre que o carrinho mudar
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      notify()
      return novoCarrinho;
    });
  };

  return (
    <div id="HomeConteiner">
      <Navbar onSearch={busca} />
      <Carousel />
      {/* Passando a função addToCart como prop para CardProduto */}
      <CardProduto pesquisa={pesquisa} addToCart={addToCart} 
      plataforma= {plataforma} // passa plataforma como parametro
      />
      <ToastContainer />
    </div>
  );
}

export default Home;
