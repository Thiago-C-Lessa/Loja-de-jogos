import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Para obter o parâmetro da URL
import NavbarInterna from './assets/navbarInterna.jsx';

const Pagamentos = () => {
  const { id } = useParams(); // Obtém o ID do usuário da URL
  const [pagamentos, setPagamentos] = useState([]);
  const [novoPagamento, setNovoPagamento] = useState({
    ApelidoCartao: "",
    numeroCartao: "",
    NomeCartao: "",
    dataNascimento: "",
    id: id, // O ID do usuário será atribuído ao criar um novo pagamento
  });
  const [editarPagamentoId, setEditarPagamentoId] = useState(null);

  const API_URL = "http://localhost:5000/pagamento";

  // Carregar pagamentos de um usuário específico
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        console.log(response.data); // Verifique os dados retornados
        setPagamentos(response.data);
      })
      .catch((error) => console.error("Erro ao carregar pagamentos:", error));
  }, [id]);
  

  // Lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoPagamento({ ...novoPagamento, [name]: value });
  };

  // Criar ou atualizar um pagamento
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editarPagamentoId) {
      // Atualizar pagamento
      axios
        .put(`${API_URL}/${editarPagamentoId}`, novoPagamento)
        .then((response) => {
          setPagamentos(
            pagamentos.map((pagamento) =>
              pagamento.idPagamento === editarPagamentoId ? response.data : pagamento
            )
          );
          setEditarPagamentoId(null);
          setNovoPagamento({
            ApelidoCartao: "",
            numeroCartao: "",
            NomeCartao: "",
            dataNascimento: "",
            id: id,
          });
        })
        .catch((error) => console.error("Erro ao atualizar pagamento:", error));
    } else {
      // Criar pagamento
      axios
        .post(API_URL, novoPagamento)
        .then((response) => {
          setPagamentos([...pagamentos, response.data]);
          setNovoPagamento({
            ApelidoCartao: "",
            numeroCartao: "",
            NomeCartao: "",
            dataNascimento: "",
            id: id,
          });
        })
        .catch((error) => console.error("Erro ao criar pagamento:", error));
    }
  };

  // Deletar um pagamento
  const handleDelete = (idPagamento) => {
    axios
      .delete(`${API_URL}/${idPagamento}`)
      .then(() => setPagamentos(pagamentos.filter((p) => p.idPagamento !== idPagamento)))
      .catch((error) => console.error("Erro ao deletar pagamento:", error));
  };

  // Iniciar edição de um pagamento
  const handleEdit = (pagamento) => {
    setEditarPagamentoId(pagamento.idPagamento);
    setNovoPagamento(pagamento);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <NavbarInterna />
      <div className="container my-4">
        <h1 style={{ color: "White", textAlign: "center" }}>Gerir Pagamentos</h1>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ApelidoCartao" className="form-label">Apelido do Cartão</label>
              <input
                type="text"
                id="ApelidoCartao"
                name="ApelidoCartao"
                className="form-control"
                value={novoPagamento.ApelidoCartao}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="numeroCartao" className="form-label">Número do Cartão</label>
              <input
                type="text"
                id="numeroCartao"
                name="numeroCartao"
                className="form-control"
                value={novoPagamento.numeroCartao}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="NomeCartao" className="form-label">Nome no Cartão</label>
              <input
                type="text"
                id="NomeCartao"
                name="NomeCartao"
                className="form-control"
                value={novoPagamento.NomeCartao}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="dataNascimento" className="form-label">Data de Validade</label>
              <input
                type="month"
                id="dataNascimento"
                name="dataNascimento"
                className="form-control"
                value={novoPagamento.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            {editarPagamentoId ? "Atualizar Pagamento" : "Adicionar Pagamento"}
          </button>
        </form>

        {/* Lista de Pagamentos */}
        <div className="row">
          {pagamentos.map((pagamento) => (
            <div className="col-md-4" key={pagamento.idPagamento}>
              <div className="card" style={{ marginTop: "20px" }}>
                <div className="card-body " style={{color:"white"}}>
                  <h5 className="card-title" style={{ color: "white" }}>
                    {pagamento.ApelidoCartao}
                  </h5>
                  <p className="card-text">N. cartão: {pagamento.NomeCartao}</p>
                  <p className="card-text">Número: {pagamento.numeroCartao}</p>
                  <p className="card-text">Validade: {pagamento.dataNascimento}</p>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(pagamento)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(pagamento.idPagamento)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pagamentos;
