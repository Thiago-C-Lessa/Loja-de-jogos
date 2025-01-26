import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Certifique-se de importar corretamente o hook
import NavbarInterna from "./assets/navbarInterna";
import Avaliacoes from "./assets/Avaliacoes";
import "./Style/JogoDetalhes.css";
import axios from "axios";

function JogoDetalhes() {
  const { _id } = useParams();
  const [jogo, setJogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para redirecionar

  const { currentUser } = useSelector((state) => state.userReducer); // Usuário atual
  const ID = currentUser?._id;

  const API_URL_JOGO = "https://localhost:5000/jogos";
  const API_URL = "https://localhost:5000/carrinhos";

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const addToCart = async () => {
    if (!ID) {
      navigate('/login'); // Redireciona para a página de login
    return;}

    const dadosjogo = {
      idUsuario: ID,
      jogo: [{ jogoid: jogo._id, quantidade: 1 }],
    };

    try {
      // Verificar se o carrinho já existe no banco de dados
      const response = await axios.get(`${API_URL}/${ID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Se o carrinho já existir
      if (response.status === 200) {
        const carrinhoId = response.data._id;

        // Adiciona o novo jogo ao carrinho
        await axios.put(
          `${API_URL}/${carrinhoId}`,
          { jogo: [{ jogoid: jogo._id, quantidade: 1 }] },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      }
    } catch (error) {
      // Se o carrinho não existir (404), cria um novo
      if (error.response?.status === 404) {
        await axios.post(`${API_URL}`, dadosjogo, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        console.error("Erro ao adicionar jogo ao carrinho:", error);
      }
    } finally {
      // Após adicionar ao carrinho, redireciona para a página do carrinho
      navigate(`/Carrinho`);
    }
  };

  if (loading) {
    return <div style={{ color: "white" }}>Carregando informações do jogo...</div>;
  }

  if (!jogo) {
    return <div style={{ color: "white" }}>Jogo não encontrado.</div>;
  }

  return (
    <div>
      <NavbarInterna />
      <div className="jogo-detalhes-container" style={{ maxWidth: "1200px" }}>
        <h1 className="jogo-detalhes-titulo">{jogo.nome}</h1>
        <img
          src={jogo.imagem}
          alt={jogo.nome}
          className="jogo-detalhes-imagem"
        />
        <p className="jogo-detalhes-descricao">{jogo.descricao}</p>
        <p className="jogo-detalhes-preco">
          Preço: R$ {(jogo.preco / 10).toFixed(2)}
        </p>

        {/* Substitua o <a> por um botão */}
        <button onClick={addToCart} className="jogo-detalhes-botao">
          Adicionar ao Carrinho
        </button>

        <Avaliacoes jogoId={_id} />
      </div>
    </div>
  );
}

export default JogoDetalhes;
