import React, { useState, useEffect } from "react";

import axios from "axios";

import NavbarInterna from './assets/navbarInterna.jsx';
import { useSelector } from "react-redux";
import '../src/Style/GerirPagamentos.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pagamentos = () => {

  
  const { currentUser } = useSelector((state) => state.userReducer); // Usuário atual
  const ID = currentUser?._id;

  const [pagamentos, setPagamentos] = useState([]);
  
  const [novoPagamento, setNovoPagamento] = useState({
    ApelidoCartao: "",
    numeroCartao: "",
    NomeCartao: "",
    dataNascimento: "",
    idUsuario: ID,
  });
  const [editarPagamentoId, setEditarPagamentoId] = useState(null);

  const resetForm = () => {
    setNovoEndereco({
      rua: "",
      numero: "",
      cidade: "",
      estado: "",
      cep: "",
      idUsuario: ID,
    });
  };

  const API_URL = "https://localhost:5000/pagamentos";

  useEffect(() => {
    const carregarDados = async () => {
        try {
            const responsePagamento= await axios.get(
              `${API_URL}/${ID}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }
            );
            setPagamentos(responsePagamento.data);
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
        }
    };
    carregarDados();
}, [ID]);


  // Lidar com mudanças no formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoPagamento({ ...novoPagamento, [name]: value });
  };

  function notify(x) {
  
    if (x==0){
    toast.success("pagamento excluido!", {
      position: "top-center", 
      autoClose: 2500, 
      theme: "dark", 
    });}

    if (x==1){
      toast.success("pagamento Adicionado!", {
        position: "top-center", 
        autoClose: 2500, 
        theme: "dark", 
      });}

    if (x==2){
      toast.success("pagamento Atualizado!", {
        position: "top-center", 
        autoClose: 2500, 
        theme: "dark", 
      });}
    
  }

  // Criar ou atualizar um pagamento
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editarPagamentoId) {
      // Atualizar pagamento
      axios
      .put(`${API_URL}/${editarPagamentoId}`, novoPagamento,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then((response) => {
        setPagamentos(
          pagamentos.map((pagamento) =>
            pagamento._id === editarPagamentoId ? response.data : pagamento
          )
        );
        setEditarPagamentoId(null);
        resetForm();
        notify(2)
      })
      .catch((error) => console.error("Erro ao atualizar pagamento:", error));
    
    } else {
      // Criar pagamento
      axios
      .post(API_URL, novoPagamento,        
        {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        console.log("Resposta do servidor:", response.data);
        setPagamentos([...pagamentos, response.data]);
        resetForm();
        notify(1);
      })
      .catch((error) => {
        console.error("Erro ao criar pagamento:", error.response?.data || error.message);
      });
    
    }
    
  };

  // Deletar um pagamento
  const handleDelete = (_id) => {
    axios
      .delete(`${API_URL}/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(() => {
        setPagamentos(pagamentos.filter((pagamento) => pagamento._id !== _id));
        notify(0);
      })
      .catch((error) => console.error("Erro ao deletar pagamento:", error));
  };
  

  // Iniciar edição de um pagamento
  const handleEdit = (pagamento) => {
    setEditarPagamentoId(pagamento._id);
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
              <div className="card" id = "cardPagamento">
                <div className="card-body " style={{color:"white"}}>
                  <h5 className="card-title">
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
                    onClick={() => handleDelete(pagamento._id)}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Pagamentos;
