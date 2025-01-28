import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavbarInterna from './assets/navbarInterna.jsx';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';



const EditarUsuario = () => {
  const { currentUser } = useSelector((state) => state.userReducer); // Usuário atual
  const ID = currentUser?._id;

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    senha:"",
    novasenha: "",
  });


  // Buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`https://localhost:5000/usuarios/getById/${ID}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const users = response.data;

      const dataNascimento = new Date(users.dataNascimento);
      // Formatando a data para "dd/mm/yyyy"
      const dataFormatada = dataNascimento.toISOString().split('T')[0];
        setFormData({
          nome: users.nome,
          dataNascimento: dataFormatada,
          email: users.email,

        });

      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUsuario();
  }, [ID]);

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
      const response = await axios.put(`https://localhost:5000/usuarios/${ID}`, updatedUsuario,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        } 
      )

      if (response.status === 200) {
        toast.success("Usuario atualizado com sucesso!", {
                position: "top-center",
                autoClose: 2500,
                theme: "dark",
              });;
        setTimeout(() => navigate('/PerfilUsuario'), 2500);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Senha incorreta.", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      } else {
        alert("Erro ao atualizar o usuário.");
        console.error("Erro ao atualizar o usuário:", error);
      }
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

              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label" style={{ color: "black" }}>
                  Senha Atual
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="passwordInput"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
            </div>

            <div className="mb-3">
              <label htmlFor="newPasswordInput" className="form-label" style={{ color: "black" }}>
                Nova Senha
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="newPasswordInput"
                  name="novasenha"  // Corrigido para "novasenha"
                  value={formData.novasenha}
                  onChange={handleChange}
                  placeholder="Digite sua nova senha"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>


            

            

            <button type="submit" className="btn btn-primary w-100" style={{ color: "black" }}>
              Confirmar Edições
            </button>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default EditarUsuario;
