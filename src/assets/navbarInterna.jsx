import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../Style/navbarInterna.css';

function NavbarInterna() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Acessa o estado do Redux para verificar se o usuário está logado
  const { currentUser } = useSelector((state) => state.userReducer);

  // Função para voltar à página anterior
  const handleVoltar = () => {
    navigate(-1); // Volta para a última página visitada
  };

  // Função de logout
  const handleLogout = () => {
    dispatch({
      type: 'user/logout', // Dispara a ação de logout
    });
    localStorage.removeItem('token');
  };

  return (
    <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <button onClick={handleVoltar} className="btn btn-outline-secondary" id="botaoVoltar">
          <i className="bi bi-caret-left-fill"></i> {/* Ícone de seta para a esquerda */}
        </button>

        <a className="navbar-brand" href="/" id="conteinerLogo">
          <img
            src="/imagem/logo.png"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
            id="logoNavbar"
          />
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
                <li><a className="dropdown-item" href="/JogoXbox">Xbox Series X/S</a></li>
              </ul>
            </li>
          </ul>
        </div>

        <div id="entrar" style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
          <a className="navbar-brand" href="/Carrinho">
            <img
              src="/imagem/carinho.png"
              alt="Cart"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
              style={{ marginBottom: '5px' }}
            />
          </a>

          {/* Verifica se o usuário está logado */}
          {currentUser ? (
            <>
              <a href="/PerfilUsuario">
                <img
                  src="/imagem/user-avatar.png" // Substitua pela imagem do avatar genérico
                  alt="User Avatar"
                  width="30"
                  height="30"
                  className="d-inline-block align-text-top"
                  style={{ borderRadius: '50%' }}
                />
              </a>
              {/* Botão de logout */}
              <button onClick={handleLogout} className="btn btn-outline-danger ms-2">
                Logout
              </button>
            </>
          ) : (
            <a className="btn btn-outline-success" href="/Login" role="button">
              Entrar
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavbarInterna;
