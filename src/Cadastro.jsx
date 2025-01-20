import React, { useState } from "react";
import axios from "axios";
import NavbarInterna from "./assets/navbarInterna";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js"; 

function Cadastro() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 2500,
      theme: "dark",
    });
  };

  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    email: "",
    senha: "",
    tipoAdm: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  // Tratador de evento para inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para salvar usuários usando Axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza o hash SHA-256 da senha
      //const hashedPassword = CryptoJS.SHA256(formData.senha).toString();

      // Cria um novo objeto com a senha em hash
      const userData = {
        ...formData,
      };
      const response = await axios.post("http://localhost:5000/usuarios", userData);

      if (response.status === 201 || response.status === 200) {
        const user = response.data; // Usuário retornado pelo backend

        // Atualiza o estado global com o usuário logado
        dispatch({
          type: "user/login",
          payload: user,
        });

        notify("Cadastro concluído!");

        // Redireciona para a página inicial ou anterior
        console.log("redirecionando")
        navigate(-2);
      } else {
        notify("Erro ao cadastrar o usuário. Tente novamente.", "error");
      }
    } catch (err) {
      console.error("Erro na requisição:", err.response.data.message);
      notify(err.response.data.message, "error");
    }
  };

  return (
    <div id="conteinerCadastro">
      <NavbarInterna />

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-4" style={{ width: "24rem" }}>
          <h2 className="text-center mb-4">Cadastrar-se</h2>

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
                placeholder="Digite seu nome"
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
              <label htmlFor="cpfInput" className="form-label" style={{ color: "black" }}>
                CPF
              </label>
              <input
                type="text"
                className="form-control"
                id="cpfInput"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="Digite seu CPF"
                pattern="^[0-9]{11}$"
                maxLength="11"
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
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label" style={{ color: "black" }}>
                Senha
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

            <button type="submit" className="btn btn-primary w-100" style={{ color: "black" }}>
              Cadastrar
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cadastro;
