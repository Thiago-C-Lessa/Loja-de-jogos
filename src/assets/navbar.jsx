import React from 'react';

import '../Style/navbar.css'



function Navbar({ onSearch }) {
  const handleSearchChange = (event) => {
    onSearch(event.target.value); // Passar a pesquisa para o App
  };
  return (
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
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
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '300px' }}>
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
                <li><a className="dropdown-item" href="/jogoPs5">PS5</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/JogoXbox">Xbox Series X/S</a></li>
              </ul>
            </li>
            {/* link da página de gerir jogos */}
            <li className="nav-item">
              <a className="nav-link" href="/GerirJogos">Gerir Jogos</a>
            </li>
          </ul>
          
          <div id="pesquisas" style={{ width: 'auto', marginRight: '20px' }}>           {/* parte da pesquisa*/}
            <form className="d-flex" role="search" style={{ marginBottom: '0' }}>
              <input className="form-control me-2" type="search" onChange={handleSearchChange} /* passar pesquisa*/ placeholder="Procurar jogo" aria-label="Search" />
            </form>
          </div>
        </div>

        <div id="entrar" style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
          <a className="navbar-brand" href="/Carrinho">
            <img src={'/public/imagem/carinho.png'} alt="Cart" width="30" height="30" className="d-inline-block align-text-top" style={{ marginBottom: '5px' }} />
          </a>

          <a className="btn btn-outline-success" href="/Login" role="button">Entrar</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
