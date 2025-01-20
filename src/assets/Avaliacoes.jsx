import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import "../Style/Avaliacoes.css"; // Agora usa o CSS global ajustado

const Avaliacoes = ({ jogoId }) => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [avaliacaoTexto, setAvaliacaoTexto] = useState("");
  const [estrelas, setEstrelas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editarAvaliacaoId, setEditarAvaliacaoId] = useState(null);

  const { currentUser } = useSelector((state) => state.userReducer);
  const ID = currentUser?._id;
  const Nome = currentUser?.nome;
  const Tipo = currentUser?.TipoAdm === true;

  const API_URL = "http://localhost:5000/avaliacoes";

  function notify(x) {
    if (x === 0) {
      toast.success("Avaliação excluída!", {
        position: "top-center",
        autoClose: 2500,
        theme: "dark",
      });
    }

    if (x === 1) {
      toast.success("Avaliação enviada com sucesso!", {
        position: "top-center",
        autoClose: 2500,
        theme: "dark",
      });
    }

    if (x === 2) {
      toast.success("Avaliação atualizada!", {
        position: "top-center",
        autoClose: 2500,
        theme: "dark",
      });
    }
  }

  const fetchAvaliacoes = async () => {
    try {
      const response = await axios.get(`${API_URL}/${jogoId}`);
      setAvaliacoes(response.data);
    } catch (error) {
      console.error("Erro ao carregar avaliações:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (avaliacaoTexto.trim() === "" || estrelas <= 0) {
      alert("Preencha todos os campos antes de enviar!");
      return;
    }

    try {
      if (editarAvaliacaoId) {
        await axios.put(`${API_URL}/${editarAvaliacaoId}`, {
          texto: avaliacaoTexto,
          estrelas,
          jogoId: jogoId,
          usuario: Nome,
          idUsuario: ID,
        });
        notify(2);
        setEditarAvaliacaoId(null);
      } else {
        await axios.post(API_URL, {
          texto: avaliacaoTexto,
          estrelas,
          jogoId: jogoId,
          usuario: Nome,
          idUsuario: ID,
        });
        notify(1);
      }
      setAvaliacaoTexto("");
      setEstrelas(0);
      fetchAvaliacoes(); // Atualiza as avaliações
    } catch (error) {
      console.error("Erro ao enviar/atualizar avaliação:", error);
      alert("Erro ao enviar/atualizar avaliação.");
    }
  };

  const handleEdit = (avaliacoes) => {
    setEditarAvaliacaoId(avaliacoes._id);
    setAvaliacaoTexto(avaliacoes.texto);
    setEstrelas(avaliacoes.estrelas);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setAvaliacoes(avaliacoes.filter((avaliacoes) => avaliacoes._id !== id));
      notify(0);
    } catch (error) {
      console.error("Erro ao excluir avaliação:", error);
      alert("Erro ao excluir avaliação.");
    }
  };

  useEffect(() => {
    fetchAvaliacoes();
  }, [jogoId]);

  return (
    <div className="avaliacoes-container">
      <h2>Avaliações</h2>
      {loading ? (
        <p>Carregando avaliações...</p>
      ) : avaliacoes.length === 0 ? (
        <p>Sem avaliações para este jogo.</p>
      ) : (
        <ul>
          {avaliacoes.map((avaliacoes) => (
            <li key={avaliacoes._id}>
              <strong>{avaliacoes.usuario}</strong>: {" "}
              <span>
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index}>
                    {index < avaliacoes.estrelas ? "★" : "☆"}
                  </span>
                ))}
              </span>
              <p>{avaliacoes.texto}</p>

              {avaliacoes.idUsuario === ID ? ( 
              <>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(avaliacoes)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(avaliacoes._id)}
                >
                  Excluir
                </button>
              </>
            ) : (Tipo ? (
              <>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(avaliacoes._id)}
                >
                  Excluir
                </button>
              </>
            ) : null)}

            </li>
          ))}
        </ul>
      )}

      <div className="avaliacoes-formulario">
        <h3>{editarAvaliacaoId ? "Editar Avaliação" : "Adicionar Avaliação"}</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={avaliacaoTexto}
            onChange={(e) => setAvaliacaoTexto(e.target.value)}
            placeholder="Escreva sua avaliação..."
            rows="4"
            required
            style={{border: 'none'}}
          ></textarea>
          <br />
          <label>
            Estrelas:
            <div className="estrelas-container">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className={index < estrelas ? "estrela-ativa" : "estrela-inativa"}
                  onClick={() => setEstrelas(index + 1)}
                  style={{cursor: "pointer", fontSize: "24px"}}
                >
                  ★
                </span>
              ))}
            </div>
          </label>
          <br />
          <div className="botoes-container">
            <button type="submit">
              {editarAvaliacaoId ? "Atualizar Avaliação" : "Enviar Avaliação"}
            </button>
            {editarAvaliacaoId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditarAvaliacaoId(null);
                  setAvaliacaoTexto("");
                  setEstrelas(0);
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Avaliacoes;
