import React, { useState } from "react";
import axios from "axios";

function CriarEndereco() {
  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const API_URL = "http://localhost:5000/api/endereco";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEndereco((prevEndereco) => ({
      ...prevEndereco,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados enviados para criação:", endereco); // Log dos dados enviados
    axios.post(API_URL, endereco)
      .then((response) => {
        console.log("Resposta ao criar o endereço:", response.data);
        alert("Endereço criado com sucesso!");
        // Redirecionar ou limpar o formulário após o sucesso
        setEndereco({
          rua: "",
          numero: "",
          cidade: "",
          estado: "",
          cep: "",
        });
      })
      .catch((error) => {
        console.error("Erro ao criar o endereço:", error);
        alert("Houve um erro ao criar o endereço. Tente novamente mais tarde.");
      });
  };

  return (
    <div>
      <h1 style={{color:"white"}}>Adicionar Endereço</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{color:"white"}}>Rua:</label>
          <input
            type="text"
            name="rua"
            value={endereco.rua}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{color:"white"}}>Número:</label>
          <input
            type="text"
            name="numero"
            value={endereco.numero}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{color:"white"}}>Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={endereco.cidade}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{color:"white"}}>Estado:</label>
          <input
            type="text"
            name="estado"
            value={endereco.estado}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{color:"white"}}>CEP:</label>
          <input
            type="text"
            name="cep"
            value={endereco.cep}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CriarEndereco;