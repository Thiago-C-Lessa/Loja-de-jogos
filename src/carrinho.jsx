import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarInterna from './assets/navbarInterna';
import './Style/carrinho.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Carrinho() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userReducer);
  const ID = currentUser?._id;
  const [carrinhoId, setCarrinhoId] = useState(null); // Adicionando o estado carrinhoId


  const API_URL_CARRINHO = "https://localhost:5000/carrinhos";
  const API_URL_JOGOS = "https://localhost:5000/jogos";

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const responseCarrinho = await axios.get(`${API_URL_CARRINHO}/${ID}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const carrinhoId = responseCarrinho.data._id;
        const itens = responseCarrinho.data.jogo;

        const detalhesJogos = await Promise.all(
          itens.map(async (item) => {
            const responseJogo = await axios.get(`${API_URL_JOGOS}/${item.jogoid}`);
            const { _id, ...jogoDetalhes } = responseJogo.data; // para que _id nao calse complito com o _id do carrinho.jogo

            return {
              ...item,
              ...jogoDetalhes,
              plataforma: item.plataformaSelecionada || "",

            };
          })
        );
        setItensCarrinho(detalhesJogos);
        setCarrinhoId(carrinhoId)
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
        toast.error("Erro ao carregar o carrinho.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    };

    if (currentUser) {
      carregarDados();
    }
  }, [currentUser]);

  const handleRemover = async (jogoId) => {
    try {
      await axios.delete(`${API_URL_CARRINHO}/${carrinhoId}`, { data: { jogoId },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

    setItensCarrinho((prevItens) => prevItens.filter((item) => item._id !== jogoId));
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  const handleQuantidade = async (jogoId, novaQuantidade,limite) => {
    try {
      

      if (novaQuantidade > limite) {
        toast.error(`Quantidade excede o limite de ${limite}.`, { theme: "dark" });
        return;
      }
      const response = await axios.put(
       `${API_URL_CARRINHO}/atualizar-quantidade/${carrinhoId}`,
        {jogoId, novaQuantidade },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setItensCarrinho((prevItens) =>
        prevItens.map((item) =>
          item._id === jogoId ? { ...item, quantidade: novaQuantidade } : item
        )
      );
      
    } catch (error) {
      console.error("Erro ao atualizar a quantidade:", error);
      toast.error("Erro ao atualizar a quantidade.", { theme: "dark" });
    }
  };

  const handlePlataforma = async (jogoId, novaPlataforma,jogo) => {
    try {

      const plataformaDuplicada = itensCarrinho.some(
        (item) => item.jogoid === jogo && item.plataforma === novaPlataforma
      );
    
      if (plataformaDuplicada) {
        toast.error("Este jogo já está selecionado para essa plataforma.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        return;  // Impede a atualização se já existir um item com a mesma plataforma
      }

      const response = await axios.put(
        `${API_URL_CARRINHO}/atualizar-plataforma/${carrinhoId}`,
        { jogoId, novaPlataforma }, // Passando jogoId e novaPlataforma corretamente
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const itemAtualizado = response.data;
      setItensCarrinho((prevItens) =>
        prevItens.map((item) =>
          item._id === jogoId ? { ...item, plataforma: novaPlataforma } : item
        )
      );
      
    } catch (error) {
      console.error("Erro ao atualizar a plataforma:", error);
      toast.error("Erro ao atualizar a plataforma.", { theme: "dark" });
    }
  };
  
  

  const calcularTotal = () => {
    return itensCarrinho
      .reduce((acc, item) => acc + item.preco * (item.quantidade || 1)/10, 0)
      .toFixed(2);
  };

  const handlePagamento = () => {

  const plataformaNaoSelecionada = itensCarrinho.some(item => !item.plataforma);
  
  if (plataformaNaoSelecionada) {
    toast.error("Todos os itens devem ter uma plataforma selecionada.", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
    return;  // Impede de avançar para a próxima página
  }
    if (!currentUser) {
      navigate("/login");
      return;
    }
    navigate("/comprar");
  };

  return (
    <div>
      <NavbarInterna />

      <div className="container text-center" id="containercarinho">
        <h1 style={{ color: "white" }}>MEU CARRINHO</h1>

        <div>
          <table className="table" id="carinhodejogos">
            <thead>
              <tr>
                <th id="colunafoto">Foto</th>
                <th>Nome</th>
                <th id="colunaplataforma">Plataforma</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itensCarrinho.length === 0 ? (
                <tr>
                  <td colSpan="6" id="carrinho-vazio">
                    Ainda não há itens no seu carrinho!!
                  </td>
                </tr>
              ) : (
                itensCarrinho.map((item) => (
                  <tr key={item._id}>
                    <td id="colunaimagem">
                      <img src={item.imagem} alt={item.nome} width="50" />
                    </td>
                    <td id="colunanome">{item.nome}</td>
                    <td id="colunaplataforma">
                      {item.plataforma || ( 
                        <select
                          onChange={(e) => handlePlataforma(item._id, e.target.value,item.jogoid)}
                          value= {item.plataforma || ""}
                          className="form-select"
                        >
                          <option value="" disabled>
                            Escolha
                          </option>
                          {item.quantidade_ps5 > 0 && <option value="PS5">PS5</option>}
                          {item.quantidade_xbox > 0 && <option value="Xbox">Xbox</option>}
                          {item.quantidade_pc > 0 && <option value="PC">PC</option>}
                        </select>
                      )}
                    </td>
                    <td id="colunaquantidade">
                      <input
                        type="number"
                        min="1"
                        max={(
                          item.plataforma === "PS5"
                          ? item.quantidade_ps5
                          : item.plataforma === "Xbox"
                          ? item.quantidade_xbox
                          : item.plataforma === "PC"
                          ? item.quantidade_pc
                          :1)
                        }
                        value={item.quantidade || 1}
                        onChange={(e) => {
                          const novaQuantidade = parseInt(e.target.value);
                          handleQuantidade(item._id, novaQuantidade,(
                            item.plataforma === "PS5"
                            ? item.quantidade_ps5
                            : item.plataforma === "Xbox"
                            ? item.quantidade_xbox
                            : item.plataforma === "PC"
                            ? item.quantidade_pc
                            :1))
                        }}
                      />
                    </td>
                    <td id="colunapreco">
                      R$ {(item.preco * (item.quantidade || 1)/10).toFixed(2)}
                    </td>
                    <td id="colunaexcluir">
                      <button type="button" onClick={() => handleRemover(item._id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <table className="table" id="valortotal">
            <thead>
              <tr>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>R$ {calcularTotal()}</td>
              </tr>
            </tbody>
          </table>

          <div className="pagamento">
            <button
              className="btn btn-outline-success"
              id="botaopagamento"
              onClick={handlePagamento}
            >
              Seguir para pagamento
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Carrinho;
