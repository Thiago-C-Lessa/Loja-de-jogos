import React, { useEffect, useState } from "react"; 
import axios from "axios"; 
import NavbarInterna from "./assets/navbarInterna.jsx";
import "./Style/main.css";
import "./Style/navbarInterna.css";

function EditarEndereco() {
  const [enderecos, setEnderecos] = useState([]); // Armazena todos os endereços
  const [selectedEndereco, setSelectedEndereco] = useState(null); // Armazena o endereço selecionado
  const [formData, setFormData] = useState({}); // Armazena os dados do formulário

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/endereco`); // Ajuste a URL conforme necessário
        setEnderecos(response.data); // Armazena todos os endereços no estado
      } catch (error) {
        console.error("Erro ao buscar os endereços:", error);
      }
    };

    fetchEnderecos(); 
  }, []); // O efeito será executado apenas uma vez ao montar o componente

  const handleSelectEndereco = (endereco) => {
    setSelectedEndereco(endereco);
    setFormData(endereco); // Preenche o formulário com os dados do endereço selecionado
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Atualiza os dados do formulário
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/endereco/${selectedEndereco.id}`, formData); // Ajuste a URL conforme necessário
      alert("Endereço atualizado com sucesso!");
      // Atualiza a lista de endereços após a edição
      const response = await axios.get(`http://localhost:5000/api/endereco`);
      setEnderecos(response.data);
      setSelectedEndereco(null); // Limpa a seleção
      setFormData({}); // Limpa os dados do formulário
    } catch (error) {
      console.error("Erro ao atualizar o endereço:", error);
      alert("Erro ao atualizar o endereço.");
    }
  };

  const handleCancel = () => {
    setSelectedEndereco(null); // Limpa a seleção
    setFormData({}); // Limpa os dados do formulário
  };

  return (
    <>
      <NavbarInterna />

      <div className="card" style={{ height: "100px" }}>
        <div
          className="card-body"
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "white",
            fontSize: "xx-large",
          }}
        >
          Editar Endereço
        </div>
      </div>

      <div className="container" style={{ margin: "auto", maxWidth: "700px" }}>
        {enderecos.map((endereco) => (
          <div className="card" key={endereco.id} style={{ margin: "10px 0" }}>
            <div className="card-header" style={{color:"white", backgroundColor:"hsl(235, 60%, 8%)"}}>
              Endereço ID: {endereco.id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                Estado: {endereco.estado}
              </li>
              <li className="list-group-item " style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
                Cidade: {endereco.cidade}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                Rua: {endereco.rua}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 22%)", color: "white", borderColor: "black"}}>
                Número: {endereco.numero}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                CEP: {endereco.cep}
              </li>
              <li className="list-group-item" style={{backgroundColor: "hsl(235, 60%, 20%)", color: "white", borderColor: "black"}}>
                <button className="btn btn-primary" onClick={() => handleSelectEndereco(endereco)}>
                  Editar
                </button>
              </li>
            </ul>
          </div>
        ))}
      </div>

      {selectedEndereco && (
        <div className="container" style={{ margin: "auto", maxWidth: "700px", marginTop: "20px" }}>
          <h3>Editar Endereço</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Estado:</label>
              <input type="text" name="estado" value={formData.estado} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Cidade:</label>
              <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Rua:</label>
              <input type="text" name="rua" value={formData.rua} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>Número:</label>
              <input type="text" name="numero" value={formData.numero} onChange={handleChange} className="form-control" required />
            </div>
            <div className="form-group">
              <label>CEP:</label>
              <input type="text" name="cep" value={formData.cep} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-success">Salvar Alterações</button>
            <button type="button" onClick={handleCancel} className="btn btn-secondary" style={{ marginLeft: "10px" }}>Cancelar</button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditarEndereco;