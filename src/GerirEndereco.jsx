import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarInterna from './assets/navbarInterna.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from "react-redux";

const GerirEnderecos = () => {

  const { currentUser } = useSelector((state) => state.userReducer); // Usuário atual
  const ID = currentUser?._id;


  const [enderecos, setEnderecos] = useState([]);
  
  const [novoEndereco, setNovoEndereco] = useState({
    rua: "",
    numero: "",
    cidade: "",
    estado: "",
    cep: "",
    idUsuario: ID,
  });
  const [editarEnderecoId, setEditarEnderecoId] = useState(null);

  const API_URL = "http://localhost:5000/enderecos";
  

  function notify(x) {
    if (x === 0) {
      toast.success("Endereço excluído!", {
        position: "top-center",
        autoClose: 2500,
        theme: "dark",
      });
    } else if (x === 1) {
      toast.success("Endereço Adicionado!", {
        position: "top-center",
        autoClose: 2500,
        theme: "dark",
      });
    } else if (x === 2) {
      toast.success("Endereço Atualizado!", {
        position: "top-center",
        autoClose: 2500,
        theme: "dark",
      });
    }
  }

  // Carregar todos os endereços
  useEffect(() => {
    const carregarDados = async () => {
      try{
        const responseEndereco= await axios.get(`${API_URL}/${ID}`);
        setEnderecos(responseEndereco.data);
      }catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
};
carregarDados();
}, [ID]);

  

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
              endereco._id === editarEnderecoId ? response.data : endereco
            )
          );
          setEditarEnderecoId(null);
          notify(2);
        })
        .catch((error) => console.error("Erro ao atualizar endereço:", error));
    } else {
      // Criar endereço
      axios.post(API_URL, novoEndereco)
        .then((response) => {
          setEnderecos([...enderecos, response.data]);
          notify(1);
        })
        .catch((error) => console.error("Erro ao criar endereço:", error));
    }
  };

  // Deletar um endereço
  const handleDelete = (_id) => {
    axios
      .delete(`${API_URL}/${_id}`)
      .then(() => {
        setEnderecos(enderecos.filter((e) => e._id !== _id))
        notify(0);
      })
      .catch((error) => console.error("Erro ao deletar endereço:", error));
  };

  // Iniciar edição de um endereço
  const handleEdit = (endereco) => {
    setEditarEnderecoId(endereco._id);
    setNovoEndereco(endereco);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <NavbarInterna />
      <div className="container my-4">
        <h1 style={{ color: "White", textAlign: "center" }}>Gerir Endereços</h1>

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
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
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

         {/* Lista de Pagamentos */}
         <div className="row">
         {enderecos.map((endereco) => (
  <div className="col-md-4" key={endereco._id}>
    <div className="card" id="cardPagamento">
      <div className="card-body" style={{ color: "white" }}>
        <h5 className="card-title">Rua: {endereco.rua}</h5>
        <p className="card-text">Número: {endereco.numero}</p>
        <p className="card-text">Cidade: {endereco.cidade}</p>
        <p className="card-text">Estado: {endereco.estado}</p>
        <p className="card-text">CEP: {endereco.cep}</p>
        <button
          className="btn btn-warning me-2"
          onClick={() => handleEdit(endereco)}
        >
          Editar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(endereco._id)}
        >
          Deletar
        </button>
      </div>
    </div>
  </div>
))}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GerirEnderecos;
