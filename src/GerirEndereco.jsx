import React, { useState, useEffect } from "react";
import axios from "axios";

const GerirEnderecos = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [novoEndereco, setNovoEndereco] = useState({
    rua: "",
    numero: "",
    cidade: "",
    estado: "",
    cep: "",
  });
  const [editarEnderecoId, setEditarEnderecoId] = useState(null);

  const API_URL = "http://localhost:5000/api/endereco";

  // Carregar todos os endereços
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setEnderecos(response.data))
      .catch((error) => console.error("Erro ao carregar endereços:", error));
  }, []);

  // Lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoEndereco({ ...novoEndereco, [name]: value });
  };

  // Criar ou atualizar um endereço
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editarEnderecoId) {
      // Atualizar endereço
      axios
        .put(`${API_URL}/${editarEnderecoId}`, novoEndereco)
        .then((response) => {
          setEnderecos(
            enderecos.map((endereco) =>
              endereco.id === editarEnderecoId ? response.data : endereco
            )
          );
          setEditarEnderecoId(null);
          setNovoEndereco({
            rua: "",
            numero: "",
            cidade: "",
            estado: "",
            cep: "",
          });
        })
        .catch((error) =>
          console.error("Erro ao atualizar endereço:", error)
        );
    } else {
      // Criar endereço
      axios
        .post(API_URL, novoEndereco)
        .then((response) => {
          setEnderecos([...enderecos, response.data]);
          setNovoEndereco({
            rua: "",
            numero: "",
            cidade: "",
            estado: "",
            cep: "",
          });
        })
        .catch((error) => console.error("Erro ao criar endereço:", error));
    }
  };

  // Deletar um endereço
  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => setEnderecos(enderecos.filter((endereco) => endereco.id !== id)))
      .catch((error) => console.error("Erro ao deletar endereço:", error));
  };

  // Iniciar edição de um endereço
  const handleEdit = (endereco) => {
    setEditarEnderecoId(endereco.id);
    setNovoEndereco(endereco);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container my-4">
      <h1 style={{ textAlign: "center" }}>Gerir Endereços</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="rua" className="form-label">Rua</label>
            <input
              type="text"
              id="rua"
              name="rua"
              className="form-control"
              value={novoEndereco.rua}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="numero" className="form-label">Número</label>
            <input
              type="text"
              id="numero"
              name="numero"
              className="form-control"
              value={novoEndereco.numero}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="cidade" className="form-label">Cidade</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              className="form-control"
              value={novoEndereco.cidade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="estado" className="form-label">Estado</label>
            <input
              type="text"
              id="estado"
              name="estado"
              className="form-control"
              value={novoEndereco.estado}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="cep" className="form-label">CEP</label>
            <input
              type="text"
              id="cep"
              name="cep"
              className="form-control"
              value={novoEndereco.cep}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {editarEnderecoId ? "Atualizar Endereço" : "Adicionar Endereço"}
        </button>
      </form>

      {/* Lista de Endereços */}
      <div className="row">
        {enderecos.map((endereco) => (
          <div className="col-md-4" key={endereco.id}>
            <div className="card" style={{ marginTop: "20px" }}>
              <div className="card-body">
                <h5 className="card-title">{endereco.rua}, {endereco.numero}</h5>
                <p className="card-text">
                  {endereco.cidade} - {endereco.estado}, {endereco.cep}
                </p>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(endereco)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(endereco.id)}
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

export default GerirEnderecos;
