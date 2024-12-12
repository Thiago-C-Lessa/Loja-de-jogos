import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/CardProduto.css";

function CardProduto(props) {
  const [jogos, setJogos] = useState([]);

  // Carregar os jogos
  useEffect(() => {
    axios
      .get("http://localhost:5000/jogos")
      .then((response) => {
        setJogos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar os jogos:", error);
      });
  }, []);

  // Filtrar jogos com base na pesquisa e na plataforma
  const jogosFiltrados = jogos.filter(
    (jogo) =>
      (jogo.nome.toLowerCase().includes(props.pesquisa.toLowerCase()) ||
        jogo.genero.toLowerCase().includes(props.pesquisa.toLowerCase())) &&
      ((props.plataforma === "todos" &&
        (jogo.quantidade_pc > 0 ||
          jogo.quantidade_ps5 > 0 ||
          jogo.quantidade_xbox > 0)) ||
        (props.plataforma === "pc" && jogo.quantidade_pc > 0) ||
        (props.plataforma === "ps5" && jogo.quantidade_ps5 > 0) ||
        (props.plataforma === "xbox" && jogo.quantidade_xbox > 0))
  );

  // Agrupar jogos por gênero
  const jogosPorGenero = jogosFiltrados.reduce((grupo_jogos, jogo) => {
    const genero = jogo.genero || "Outros"; // Gênero padrão se estiver ausente
    if (!grupo_jogos[genero]) {
      grupo_jogos[genero] = [];
    }
    grupo_jogos[genero].push(jogo); // Adiciona o jogo ao array do seu gênero
    return grupo_jogos;
  }, {});

  return (
    <div className="CardsGrid">
      {Object.keys(jogosPorGenero).map((genero) => (
        <div key={genero}>
          <h2 className="genero-titulo">{genero}</h2>
          <div className="genero-jogos">
            {jogosPorGenero[genero].map((jogo, index) => (
              <div key={index} className="card-item">
                <a
                  href={`/jogo/${jogo.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card" data-bs-theme="dark">
                    <img
                      src={jogo.imagem}
                      className="card-img-top"
                      alt={jogo.nome}
                    />
                    <div className="card-body">
                      <h2 className="card-title">{jogo.nome}</h2>
                      <a
                        className="btn btn-outline-success valor"
                        role="button"
                        style={{ marginRight: "15px" }}
                      >
                        R$ {jogo.preco}
                      </a>
                      <a
                        className="btn btn-outline-success valor"
                        role="button"
                        style={{ marginLeft: "15px" }}
                        onClick={(e) => {
                          e.preventDefault();
                          props.addToCart(jogo); // Chama a função addToCart que foi passada como prop
                        }}
                      >
                        <img
                          src={"./imagem/carinho.png"}
                          alt="Cart"
                          width="25"
                          height="25"
                        />
                      </a>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <hr className="genero-separa" />
        </div>
      ))}
    </div>
  );
}

export default CardProduto;
