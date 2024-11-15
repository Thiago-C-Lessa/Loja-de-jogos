import React, { useState } from 'react';

function Cadastro() {
  // Definindo o estado inicial do formulário
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: '',
    senha: ''
  });

  // tratador de evento submit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para salvar usuarios
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode processar os dados do formulário, por exemplo, enviando-os para um servidor
    console.log(formData);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: '24rem' }}>
        <h2 className="text-center mb-4">Cadastrar-se</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">Nome</label>
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
            <label htmlFor="dobInput" className="form-label">Data de Nascimento</label>
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
            <label htmlFor="cpfInput" className="form-label">CPF</label>
            <input
              type="number"
              className="form-control"
              id="cpfInput"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Digite seu CPF"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">E-mail</label>
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
            <label htmlFor="passwordInput" className="form-label">Senha</label>
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

          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;