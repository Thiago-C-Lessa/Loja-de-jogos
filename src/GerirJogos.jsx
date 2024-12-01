import React, { useState, useEffect } from "react";
import axios from "axios";


const GerirJogos = () => {
  const [jogos, setJogos] = useState([]);
  const [novoJogo, setNovoJogo] = useState({
    nome: "",
    imagem: "",
    preco: "",
    descricao: "",
    genero: "",
    quantidade_ps5: 0,
    quantidade_pc: 0,
    quantidade_xbox: 0,
  });
  const [editarJogoId, setEditarJogoId] = useState(null);

  const API_URL = "http://localhost:5000/api/jogos";

  // Carregar todos os jogos
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setJogos(response.data))
      .catch((error) => console.error("Erro ao carregar jogos:", error));
  }, []);

  // Lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoJogo({ ...novoJogo, [name]: value });
  };

  // Criar ou atualizar um jogo
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editarJogoId) {
      // Atualizar jogo
      axios
        .put(`${API_URL}/${editarJogoId}`, novoJogo)
        .then((response) => {
          setJogos(
            jogos.map((jogo) =>
              jogo.id === editarJogoId ? response.data : jogo
            )
          );
          setEditarJogoId(null);
          setNovoJogo({
            nome: "",
            imagem: "",
            preco: "",
            descricao: "",
            genero: "",
            quantidade_ps5: '',
            quantidade_pc: 0,
            quantidade_xbox: 0,

          });
        })
        .catch((error) => console.error("Erro ao atualizar jogo:", error));
    } else {
      // Criar jogo
      axios
        .post(API_URL, novoJogo)
        .then((response) => {
          setJogos([...jogos, response.data]);
          setNovoJogo({
            nome: "",
            imagem: "",
            preco: "",
            descricao: "",
            genero: "",
            quantidade_ps5: 0,
            quantidade_pc: 0,
            quantidade_xbox: 0,
          });
        })
        .catch((error) => console.error("Erro ao criar jogo:", error));
    }
  };

  // Deletar um jogo
  const handleDelete = (id) => {
    console.log(typeof(id))
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setJogos(jogos.filter((jogo) => jogo.id !== id)))
      .catch((error) => console.error("Erro ao deletar jogo:", error));
  };

  // Iniciar edição de um jogo
  const handleEdit = (jogo) => {
    setEditarJogoId(jogo.id);
    setNovoJogo(jogo);

    window.scrollTo({
      top: 0,
      behavior: "smooth", // Para fazer transição suave
    });

  };

  return (
    <div className="container my-4">
      <h1 style={{color:"White", textAlign: "center"}}>Gerir Jogos</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="form-control"
              value={novoJogo.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="imagem" className="form-label">Imagem</label>
            <input
              type="text"
              id="imagem"
              name="imagem"
              className="form-control"
              value={novoJogo.imagem}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="preco" className="form-label">Preço</label>
            <input
              type="number"
              id="preco"
              name="preco"
              className="form-control"
              value={novoJogo.preco}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="genero" className="form-label">Gênero</label>
            <input
              type="text"
              id="genero"
              name="genero"
              className="form-control"
              value={novoJogo.genero}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="descricao" className="form-label">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              className="form-control"
              value={novoJogo.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="quantidade_ps5" className="form-label">Quantidade PS5</label>
            <input
              type="number"
              id="quantidade_ps5"
              name="quantidade_ps5"
              className="form-control"
              value={novoJogo.quantidade_ps5}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="quantidade_pc" className="form-label">Quantidade PC</label>
            <input
              type="number"
              id="quantidade_pc"
              name="quantidade_pc"
              className="form-control"
              value={novoJogo.quantidade_pc}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <label htmlFor="quantidade_xbox" className="form-label" >Quantidade Xbox</label >
            <input
              type="number"
              id="quantidade_xbox"
              name="quantidade_xbox"
              className="form-control"
              value={novoJogo.quantidade_xbox}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <button type="submit" className="btn btn-primary">
          {editarJogoId ? "Atualizar Jogo" : "Adicionar Jogo"}
        </button>
      </form>
      

      {/* Lista de Jogos */}
      <div className="row" >
        {jogos.map((jogo) => (
          <div className="col-md-4" key={jogo.id}>
            <div className="card" style={{marginTop:"20px"}}>
              <img src={jogo.imagem} className="card-img-top" alt={jogo.nome} />
              <div className="card-body">
              <h5 className="card-title" style={{ color: "white" }}>{jogo.nome}</h5>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(jogo)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(jogo.id)}
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GerirJogos;
