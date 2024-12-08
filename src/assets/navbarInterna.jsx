import React from 'react';
import  {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import '../Style/navbarInterna.css'

function NavbarInterna() {

  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); // Volta para a última página visitada
  };
  

  return (
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
      <button onClick={handleVoltar} className="btn btn-outline-secondary" id='botaoVoltar'>
        <i class="bi bi-caret-left-fill"></i> {/* Ícone de seta para a esquerda */}
      </button>


        <a className="navbar-brand" href="/" id='conteinerLogo'>
          <img src="/public/imagem/logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top" id='logoNavbar'/>
          Jogo.com
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ width: 'auto' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Mais Vendidos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/JogoPc">Jogos para PC</a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Jogos para Console
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/JogoPs5">PS5</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="JogoXbox">Xbox Series X/S</a></li>
              </ul>
            </li>
          </ul>
          
        </div>

        <div id="entrar" style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
          <a className="navbar-brand" href="/Carrinho">
            <img src={'/public/imagem/carinho.png'} alt="Cart" width="30" height="30" className="d-inline-block align-text-top" style={{ marginBottom: '5px' }} />
          </a>
         { /*<a className="btn btn-outline-success" href="/Login" role="button">Entrar</a>*/}
          <a className="btn btn-outline-success" id = "Perfil" href="/PerfilUsuario/:id" role="button">U</a>
        </div>
      </div>
    </nav>
  );
}

export default NavbarInterna;
