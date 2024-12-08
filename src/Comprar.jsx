import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarInterna from './assets/navbarInterna';
import './Style/Compra.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Comprar() {
    const { id } = useParams(); // Captura o ID da URL
    const [pagamentos, setPagamentos] = useState([]); // Métodos de pagamento disponíveis
    const [metodoSelecionado, setMetodoSelecionado] = useState(""); // Método selecionado
    const [novoMetodo, setNovoMetodo] = useState(false); // Controle para exibir formulário de novo método
    const [Cartao, detalhesCartao] = useState({ ApelidoCartao: "", numeroCartao: "", NomeCartao: "", dataNascimento: "" });

    const navigate = useNavigate();

    function notify() {
        toast.success("Pagamento concluido!", {
          position: "top-center", 
          autoClose: 2500, 
          theme: "dark", 
        });
      }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("../Json/pagamento.json");
                const data = await response.json();

                // Filtra os métodos de pagamento pelo ID da URL
                const metodosFiltrados = data.filter((item) => item.id === parseInt(id));
                setPagamentos(metodosFiltrados);
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
                alert("Erro ao carregar métodos de pagamento.");
            }
        };

        fetchData();
    }, [id]);

    function handleMetodoChange(e) {
        const metodo = e.target.value;
        setMetodoSelecionado(metodo);

        // Exibe o formulário se "Novo método" for selecionado
        setNovoMetodo(metodo === "NovoPagamento");
    }

    function handleDetalhesCaratao(e) {
        const { name, value } = e.target;
        detalhesCartao({ ...Cartao, [name]: value });
    }

    async function saveToJsonFile(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/pagamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...Cartao, id: parseInt(id) }), // Inclui o ID
            });

            if (response.ok) {
                setNovoMetodo(false);
                setMetodoSelecionado(""); // Limpa seleção
                detalhesCartao({ ApelidoCartao: "", numeroCartao: "", NomeCartao: "", dataNascimento: "" });
                notify();
                setTimeout(() => {
                    navigate("/")
                }, 3000);
            } else {
                throw new Error("Erro ao salvar o novo método.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar o novo método.");
        }
    }

    function finalizado(){
        notify()
        setTimeout(() => {
            navigate("/")
        }, 3000);
    }

    return (
        <div>
            <NavbarInterna />
            <div className="container d-flex flex-column align-items-center mt-4">
                <h2 style={{color:"white"}}>Selecionar Método de Pagamento</h2>
                <select className="form-select mb-4" value={metodoSelecionado} onChange={handleMetodoChange}>
                    <option value="">Escolha um método</option>
                    {pagamentos.map((metodo, index) => (
                        <option key={index} value={metodo.ApelidoCartao}>
                            {metodo.ApelidoCartao}
                        </option>
                    ))}
                    <option value="NovoPagamento">Adicionar Novo Método</option>
                </select>

                {metodoSelecionado && metodoSelecionado !== "NovoPagamento" && (
                    <div className="card p-4">
                        <h3 style={{textAlign: "center"}}>Método Selecionado: <br/> {metodoSelecionado}</h3> <br/>

                        {/* Exibindo informações do cartão */}
                        {pagamentos
                        .filter((metodo) => metodo.ApelidoCartao === metodoSelecionado)
                                .map((metodo, index) => (
                                    <div key={index}>
                                        <p><strong>Nome no Cartão:</strong> {metodo.NomeCartao}</p>
                                        <p><strong>Número do Cartão:</strong> {String(metodo.numeroCartao)}</p>
                                        <p><strong>Data de Validade:</strong> {metodo.dataNascimento}</p>
                                    </div>
                                ))}

                            <button className="btn btn-success mt-3" onClick={finalizado}>Confirmar Pagamento</button>
                    </div>
            )}

                {novoMetodo && (
                    <form className="comprar-form card p-4" onSubmit={saveToJsonFile}>
                        <h3>Adicionar Novo Método</h3>
                        <label htmlFor="ApelidoCartao">Apelido do Cartão:</label>
                        <input
                            required
                            type="text"
                            id="ApelidoCartao"
                            name="ApelidoCartao"
                            value={Cartao.ApelidoCartao}
                            onChange={handleDetalhesCaratao}
                            placeholder="Ex.: Meu Visa"
                        />
                        <br />

                        <label htmlFor="numeroCartao">Número do Cartão:</label>
                        <input
                            required
                            type="text"
                            id="numeroCartao"
                            name="numeroCartao"
                            value={Cartao.numeroCartao}
                            onChange={handleDetalhesCaratao}
                            placeholder="Digite o número do cartão"
                        />
                        <br />

                        <label htmlFor="NomeCartao">Nome no Cartão:</label>
                        <input
                            required
                            type="text"
                            id="NomeCartao"
                            name="NomeCartao"
                            value={Cartao.NomeCartao}
                            onChange={handleDetalhesCaratao}
                            placeholder="Nome do titular"
                        />
                        <br />

                        <label htmlFor="dataNascimento">Data de Validade:</label>
                        <input
                            required
                            type="month"
                            id="dataNascimento"
                            name="dataNascimento"
                            value={Cartao.dataNascimento}
                            onChange={handleDetalhesCaratao}
                        />
                        <br />

                        <button type="submit" className="btn btn-primary mt-3" >
                            Confirmar compra
                        </button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Comprar;
