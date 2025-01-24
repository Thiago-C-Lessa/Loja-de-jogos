import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditarUsuario = () => {
  const { id } = useParams(); // Obter o ID do usuário da URL
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");

  // Buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`https://localhost:5000/api/usuarios/${id}`); // Ajuste conforme o endpoint
        const usuario = response.data;
        setNome(usuario.nome);
        setDataNascimento(usuario.dataNascimento);
        setEmail(usuario.email);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUsuario();
  }, [id]); // Executa sempre que o ID mudar

  const handleConfirmarEdicoes = async () => {
    try {
      const updatedUsuario = { nome, dataNascimento, email };
      await axios.put(`https://localhost:5000/api/usuarios/${id}`, updatedUsuario);
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      alert("Erro ao atualizar o usuário.");
    }
  };

  return (
    <div>
      <h1>Editar Usuário</h1>
      <form>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleConfirmarEdicoes}>
          Confirmar Edições
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;