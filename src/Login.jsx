import React, { useState } from 'react';
import NavbarInterna from './assets/navbarInterna';

function Login() {
  // Estado para armazenar os dados do formulário de login
  const [formData, setFormData] = useState({
    login: '',
    senha: ''
  });

  // Função para lidar com as alterações nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode processar os dados, como fazer login, validando o login e a senha
    console.log(formData);
  };

  return (
    <div id='containerLogin'>{/* div que contem a navbar inter e o login */}
      <NavbarInterna/>

    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: '24rem' }}>
      <h2 className="text-center mb-4" style={{ color: "black" }}>Entrar</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginInput" className="form-label" style={{color:"black"}}>Login</label>
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
            <label htmlFor="passwordInput" className="form-label"style={{color:"black"}}>Senha</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>

        <div className="text-center mt-3">
          <span>Não possui uma conta? <a href="/Cadastro">Cadastre-se</a></span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;

