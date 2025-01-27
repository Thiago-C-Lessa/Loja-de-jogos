import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavbarInterna from './assets/navbarInterna.jsx';



const EditarUsuario = () => {
  const { id } = useParams(); // Obter o ID do usuário da URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
  });

  const hoje = new Date().toISOString().split('T')[0]; 

  // Buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`https://localhost:5000/usuarios/${id}`);
        const usuario = response.data;
        setFormData({
          nome: usuario.nome,
          dataNascimento: usuario.dataNascimento,
          email: usuario.email,
        });
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUsuario = { ...formData };
      const response = await axios.put(`https://localhost:5000/usuarios/${id}`, updatedUsuario);

      if (response.status === 200) {
        alert("Usuário atualizado com sucesso!");
        navigate(-1); // Redireciona para a página anterior
      } else {
        alert("Erro ao atualizar o usuário.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      alert("Erro ao atualizar o usuário.");
    }
  };

  return (
    <div>
    <NavbarInterna />
    <div id="conteinerCadastro">
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-4" style={{ width: "24rem" }}>
          <h2 className="text-center mb-4">Editar Usuário</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label" style={{ color: "black" }}>
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite o nome"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dobInput" className="form-label" style={{ color: "black" }}>
                Data de Nascimento
              </label>
              <input
                type="date"
                className="form-control"
                id="dobInput"
                name="dataNascimento"
                value={formData.dataNascimento}
                max={hoje}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label" style={{ color: "black" }}>
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite o e-mail"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" style={{ color: "black" }}>
              Confirmar Edições
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EditarUsuario;
