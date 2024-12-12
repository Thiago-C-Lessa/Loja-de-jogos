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

    const [enderecos, setEnderecos] = useState([]); // Lista de endereços do usuário
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(""); // Endereço selecionado
    const [novoEndereco, setNovoEndereco] = useState(false); // Controle para exibir formulário de novo endereço
    const [novoEnderecoData, setNovoEnderecoData] = useState({ rua: "", numero: "", cidade: "", estado: "" }); // Novo endereço

    const navigate = useNavigate();api/

    function notify() {
        toast.success("Pagamento concluído!", {
            position: "top-center",
            autoClose: 2500,
            theme: "dark",
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch de pagamentos
                const responsePagamento = await fetch("../Json/pagamento.json");
                const dataPagamento = await responsePagamento.json();
                const metodosFiltrados = dataPagamento.filter((item) => parseInt(item.id) === parseInt(id));
                setPagamentos(metodosFiltrados);

                // Fetch de endereços
                const responseEndereco = await fetch("../Json/endereco.json");
                const dataEndereco = await responseEndereco.json();
                
                const enderecosFiltrados = dataEndereco.filter((item) => parseInt(item.id) === parseInt(id));
                setEnderecos(enderecosFiltrados);
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
                alert("Erro ao carregar dados do usuário.");
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

    function handleEnderecoChange(e) {
        const endereco = e.target.value;
        setEnderecoSelecionado(endereco);

        // Exibe o formulário se "Novo endereço" for selecionado
        setNovoEndereco(endereco === "NovoEndereco");
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

    async function saveEndereco(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/endereco', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...novoEnderecoData, id: parseInt(id) }), // Inclui o ID do usuário
            });

            if (response.ok) {
                setNovoEndereco(false);
                setNovoEnderecoData({ rua: "", numero: "", cidade: "", estado: "" }); // Limpa o formulário
                const data = await response.json(); // Atualiza a lista de endereços
                setEnderecos([...enderecos, data]);
                toast.success("Endereço adicionado com sucesso!", {
                    position: "top-center",
                    autoClose: 2500,
                    theme: "dark",
                });
            } else {
                throw new Error("Erro ao salvar o novo endereço.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar o novo endereço.");
        }
    }
    

    function finalizado() {
        notify()
        setTimeout(() => {
            navigate("/")
        }, 3000);
    }

    return (
        <div>
            <NavbarInterna />
            <div className="container d-flex flex-column align-items-center mt-4">

            <h2 style={{ color: "white" }}>Selecionar Endereço</h2>
                <select className="form-select mb-4" value={enderecoSelecionado} onChange={handleEnderecoChange}>
                    <option value="">Escolha um endereço</option>
                    {enderecos.map((endereco, index) => (
                        <option key={index} value={endereco.id}>
                            {endereco.rua}
                        </option>
                    ))}
                </select>


                {enderecoSelecionado && enderecoSelecionado !== "NovoEndereco" && (
                    <div className="card p-4">
                        <h3 style={{ textAlign: "center" }}>Endereço Selecionado:</h3>
                        <br />
                        {/* Exibindo informações do endereço */}
                        {enderecos
                            .filter((endereco) => endereco.id === enderecoSelecionado)
                            .map((endereco) => (
                                <div key={endereco.id}>
                                    <p><strong>Rua:</strong> {endereco.rua}</p>
                                    <p><strong>Número:</strong> {endereco.numero}</p>
                                    <p><strong>Cidade:</strong> {endereco.cidade}</p>
                                    <p><strong>Estado:</strong> {endereco.estado}</p>
                                    <p><strong>CEP:</strong> {endereco.cep}</p>
                                </div>
                            ))}
                    </div>
                )}

                <h2 style={{ color: "white" }}>Selecionar Método de Pagamento</h2>
                <select className="form-select mb-4" value={metodoSelecionado} onChange={handleMetodoChange}>
                    <option value="">Escolha um método</option>
                    {pagamentos.map((metodo, index) => (
                        <option key={index} value={metodo.idPagamento}>
                            {metodo.ApelidoCartao}
                        </option>
                    ))}
                    <option value="NovoPagamento">Adicionar Novo Método</option>
                </select>

                {metodoSelecionado && metodoSelecionado !== "NovoPagamento" && (
                    <div className="card p-4">
                        <h3 style={{ textAlign: "center" }}>Método Selecionado: <br/>
                            {pagamentos.find((m) => m.idPagamento === metodoSelecionado).ApelidoCartao} <br/>
                        </h3>
                        <br/>
                        {/* Exibindo informações do cartão */}
                        {pagamentos
                        .filter((metodo) => metodo.idPagamento === metodoSelecionado)
                            .map((metodo) => (
                                <div key={metodo.idPagamento}>
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



                <ToastContainer />
            </div>
        </div>
    );
}

export default Comprar;
