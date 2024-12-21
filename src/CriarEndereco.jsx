import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NavbarInterna from "./assets/navbarInterna";
import { toast, ToastContainer } from "react-toastify"; // Corrigido aqui a importação do ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify

// Estilo customizado para o Toastify
const customToastStyle = {
  backgroundColor: "hsl(235, 60%, 20%)",
  color: "white",
  borderRadius: "5px",
  fontSize: "16px",
};

// Lista de estados brasileiros válidos
const estadosValidos = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", 
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", 
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

function CriarEndereco() {
  const { currentUser } = useSelector((state) => state.userReducer);

  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    cidade: "",
    estado: "",
    cep: "",
    usuarioId: currentUser.id,
  });

  const API_URL = "http://localhost:5000/enderecos";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEndereco((prevEndereco) => ({
      ...prevEndereco,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(API_URL, endereco)
      .then((response) => {
        toast.success("Endereço criado com sucesso!", {
          style: customToastStyle,
        });
        setEndereco({
          rua: "",
          numero: "",
          cidade: "",
          estado: "",
          cep: "",
          usuarioId: currentUser.id,
        });
      })
      .catch((error) => {
        toast.error("Houve um erro ao criar o endereço. Tente novamente mais tarde.", {
          style: customToastStyle,
        });
      });
  };

  return (
    <div>
      <NavbarInterna />
      <div className="container my-4">
        <h1 style={{ color: "white", textAlign: "center" }}>Adicionar Endereço</h1>
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="rua" className="form-label" style={{ color: "white" }}>
                Rua:
              </label>
              <input
                type="text"
                id="rua"
                name="rua"
                className="form-control"
                value={endereco.rua}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="numero" className="form-label" style={{ color: "white" }}>
                Número:
              </label>
              <input
                type="text"
                id="numero"
                name="numero"
                className="form-control"
                value={endereco.numero}
                onChange={handleChange}
                required
                pattern="^[0-9]*$"
                title="Somente números são permitidos"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="cidade" className="form-label" style={{ color: "white" }}>
                Cidade:
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                className="form-control"
                value={endereco.cidade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="estado" className="form-label" style={{ color: "white" }}>
                Estado:
              </label>
              <select
                id="estado"
                name="estado"
                className="form-control"
                value={endereco.estado}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um estado</option>
                {estadosValidos.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="cep" className="form-label" style={{ color: "white" }}>
                CEP:
              </label>
              <input
                type="text"
                id="cep"
                name="cep"
                className="form-control"
                value={endereco.cep}
                onChange={handleChange}
                required
                pattern="^[0-9]{8}$" // Expressão regular para garantir que tenha exatamente 8 dígitos
                title="O CEP deve conter exatamente 8 dígitos numéricos"
                maxLength="8"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </form>
      </div>

      {/* Inicializando o Toastify */}
      <ToastContainer />
    </div>
  );
}

export default CriarEndereco;
