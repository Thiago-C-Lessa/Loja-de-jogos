import React, { useState } from "react";
import axios from "axios";
import NavbarInterna from "./assets/navbarInterna";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cadastro() {
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
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  // Função para validar CPF
  const isValidCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.charAt(10));
  };

  // Tratador de evento para inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para gerar hash SHA-256
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  };

  // Função para salvar usuários usando Axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidCPF(formData.cpf)) {
      notify("CPF inválido!", "error");
      return;
    }

    try {
      // Gera o hash da senha
      const hashedPassword = await hashPassword(formData.senha);

      // Substitui a senha original pelo hash
      const formDataWithHashedPassword = { ...formData, senha: hashedPassword };

      const response = await axios.post("http://localhost:5000/usuarios", formDataWithHashedPassword);

      if (response.status === 201 || response.status === 200) {
        console.log("Usuário cadastrado:", response.data);

        setFormData({
          nome: "",
          dataNascimento: "",
          cpf: "",
          email: "",
          senha: "",
        });
        notify("Cadastro concluído!");
      } else {
        notify("Erro ao cadastrar o usuário. Tente novamente.", "error");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      notify("Erro na requisição. Verifique sua conexão.", "error");
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
                  type={showPassword ? "text" : "password"} // Alterna entre "text" e "password"
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
                  onClick={() => setShowPassword(!showPassword)} // Alterna a visibilidade
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
