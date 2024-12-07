import React, { useState } from 'react';
import NavbarInterna from './assets/navbarInterna';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cadastro() {

  function notify() {
    toast.success("Cadastro concluido!", {
      position: "top-center", 
      autoClose: 2500, 
      theme: "dark", 
    });
  }


  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    email: '',
    senha: ''
  });

  // Tratador de evento para inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Pega o nome e o valor do campo
    setFormData({
      ...formData,
      [name]: value, // Usa o nome do campo como chave
    });
  };
  

  // Função para salvar usuários
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:5000/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Usuário cadastrado:', data);
        
        // Limpa os campos do formulário após o cadastro
        setFormData({
          nome: '',
          dataNascimento: '',
          cpf: '',
          email: '',
          senha: ''
        });
        notify();
  
      } else {
        console.error('Erro ao cadastrar o usuário. Status:', response.status);
        const errorData = await response.json();
        console.error('Erro do servidor:', errorData);
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
    }
  };
  
  
  
  return (
    <div id="conteinerCadastro">
      <NavbarInterna />

      <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-4" style={{ width: '24rem' }}>
          <h2 className="text-center mb-4" >Cadastrar-se</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label" style={{color: "black"}}>Nome</label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="nome"
                value={formData.nome}
                onChange= {(e) => {handleChange(e)}}
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dobInput" className="form-label"style={{color: "black"}}>Data de Nascimento</label>
              <input
                type="date"
                className="form-control"
                id="dobInput"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange= {(e) => {handleChange(e)}}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cpfInput" className="form-label" style={{color: "black"}}>CPF</label>
              <input
                type="number"
                className="form-control"
                id="cpfInput"
                name="cpf"
                value={formData.cpf}
                onChange= {(e) => {handleChange(e)}}
                placeholder="Digite seu CPF"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label" style={{color: "black"}}>E-mail</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={formData.email}
                onChange= {(e) => {handleChange(e)}}
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label" style={{color: "black"}}>Senha</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                name="senha"
                value={formData.senha}
                onChange= {(e) => {handleChange(e)}}
                placeholder="Digite sua senha"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" style={{color: "black"}}>Cadastrar</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Cadastro;
