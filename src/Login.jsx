import React, { useState } from "react";
import NavbarInterna from "./assets/navbarInterna";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js"; 

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    login: "",
    senha: "",
  });

  const [erros, setError] = useState();
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  // Função para lidar com as alterações nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gera o hash da senha digitada
      const hashedPassword = CryptoJS.SHA256(formData.senha).toString();
      const response = await axios.get("http://localhost:5000/usuarios");
      const resposta = response.data;

      // Verifica se o usuário existe e se a senha corresponde ao hash
      const user = resposta.find(
        (u) => u.email === formData.login && u.senha === hashedPassword
      );

      if (user) {
        // Login bem-sucedido
        dispatch({
          type: "user/login",
          payload: user,
        });
        setError(null);
        navigate(-1); // Volta à página anterior
      } else {
        // Usuário ou senha inválidos
        setError("Login ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      setError("Ocorreu um erro ao tentar fazer login. Tente novamente.");
    }
  };

  // Usa o Redux
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  console.log({ currentUser });

  return (
    <div id="containerLogin">
      {/* Div que contém a navbar interna e o login */}
      <NavbarInterna />

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-4" style={{ width: "24rem" }}>
          <h2 className="text-center mb-4" style={{ color: "black" }}>
            Entrar
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="loginInput" className="form-label" style={{ color: "black" }}>
                Login
              </label>
              <input
                type="text"
                className="form-control"
                id="loginInput"
                name="login"
                value={formData.login}
                onChange={handleChange}
                placeholder="Digite seu login"
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

            {erros && <div className="text-danger text-center mb-3">{erros}</div>}

            <button type="submit" className="btn btn-primary w-100">
              Entrar
            </button>
          </form>

          <div className="text-center mt-3">
            <span>
              Não possui uma conta? <a href="/Cadastro">Cadastre-se</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
