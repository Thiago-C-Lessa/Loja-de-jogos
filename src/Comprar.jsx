import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import NavbarInterna from './assets/navbarInterna';
import './Style/Comprar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector } from "react-redux";

function Comprar() {
    const { currentUser  } = useSelector((state) => state.userReducer);
    const ID = currentUser ._id;

    const [enderecos, setEnderecos] = useState([]);
    const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
    const [formEnderecoVisivel, setFormEnderecoVisivel] = useState(false);
    const [novoEndereco, setNovoEndereco] = useState({
        rua: "",
        numero: "",
        cidade: "",
        estado: "",
        cep: "",
        idUsuario: ID,
    });
    const [pagamentos, setPagamentos] = useState([]);
    const [metodoSelecionado, setMetodoSelecionado] = useState("");
    const [formPagamentoVisivel, setFormPagamentoVisivel] = useState(false);
    const [novoPagamento, setNovoPagamento] = useState({
        ApelidoCartao: "",
        numeroCartao: "",
        NomeCartao: "",
        dataNascimento: "",
        idUsuario: ID,
    });
    const [itensCarrinho, setItensCarrinho] = useState([]);
    const [total, setTotal] = useState(0);
    const [carrinhoId, setCarrinhoId] = useState(null);

    const navigate = useNavigate();

    const API_URL_endereco = "https://localhost:5000/enderecos"; 
    const API_URL_pagamento = "https://localhost:5000/pagamentos";
    const API_URL_pedidos = "https://localhost:5000/pedidos";
    const API_URL_jogos = "https://localhost:5000/jogos";
    const API_URL_carrinhos = "https://localhost:5000/carrinhos";

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [responseEndereco, responsePagamento, responseCarrinho] = await Promise.all([
                    axios.get(`${API_URL_endereco}/${ID}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }),
                    axios.get(`${API_URL_pagamento}/${ID}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }),
                    axios.get(`${API_URL_carrinhos}/${ID}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }),
                ]);
                setCarrinhoId(responseCarrinho.data._id);
                setPagamentos(responsePagamento.data);
                setEnderecos(responseEndereco.data);

                const itens = responseCarrinho.data.jogo;
                const detalhesJogos = await Promise.all(
                    itens.map(async (item) => {
                        const responseJogo = await axios.get(`${API_URL_jogos}/${item.jogoid}`);
                        const { _id, ...jogoDetalhes } = responseJogo.data;
                        return {
                            ...item,
                            ...jogoDetalhes,
                            plataforma: item.plataformaSelecionada || "",
                        };
                    })
                );

                setItensCarrinho(detalhesJogos);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                toast.error("Erro ao carregar dados do usuário.");
            }
        };
        carregarDados();
    }, [ID]);

    useEffect(() => {
        const totalCompra = itensCarrinho.reduce((acc, item) => acc + item.preco * (item.quantidade || 1) / 10, 0);
        setTotal(totalCompra.toFixed(2));
    }, [itensCarrinho]);

    const handleEnderecoChange = (e) => {
        const selectedValue = e.target.value;
        setEnderecoSelecionado(selectedValue);
        if (selectedValue === "add-new") {
            setFormEnderecoVisivel(true);
        } else {
            setFormEnderecoVisivel(false);
        }
    };

    const handleMetodoChange = (e) => {
        const selectedValue = e.target.value;
        setMetodoSelecionado(selectedValue);
        if (selectedValue === "add-new") {
            setFormPagamentoVisivel(true);
        } else {
            setFormPagamentoVisivel(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoEndereco((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputPagamentoChange = (e) => {
        const { name, value } = e.target;
        setNovoPagamento((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitEndereco = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL_endereco, novoEndereco, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setEnderecos((prev) => [...prev, response.data]);
            setNovoEndereco({ rua: "", numero: "", cidade: "", estado: "", cep: "", idUsuario: ID });
            setFormEnderecoVisivel(false);
            toast.success("Endereço adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar endereço:", error);
            toast.error("Erro ao adicionar endereço.");
        }
    };

    const handleSubmitPagamento = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL_pagamento, novoPagamento, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setPagamentos((prev) => [...prev, response.data]);
            setNovoPagamento({ ApelidoCartao: "", numeroCartao: "", NomeCartao: "", dataNascimento: "", idUsuario: ID });
            setFormPagamentoVisivel(false);
            toast.success("Método de pagamento adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar método de pagamento:", error);
            toast.error("Erro ao adicionar método de pagamento.");
        }
    };

    const FinalizarCompra = async () => {
        const atualizarJogos = itensCarrinho.map(item => ({
            id: item.jogoid,
            numeroVendas: ((item.numeroVendas) || 0) + item.quantidade,
            ...(item.plataforma === "PS5" && { quantidade_ps5: item.quantidade_ps5 - item.quantidade }),
            ...(item.plataforma === "Xbox" && { quantidade_xbox: item.quantidade_xbox - item.quantidade }),
            ...(item.plataforma === "PC" && { quantidade_pc: item.quantidade_pc - item.quantidade }),
        }));

        const pedido = {
            idUsuario: ID,
            jogosComprados: itensCarrinho.map(item => ({
                jogo: String(item.nome),
                plataformaSelecionada: String(item.plataforma),
                quantidade: Number(item.quantidade),
            })),
            total: total,
            enderecoId: enderecoSelecionado,
            metodoPagamentoId: metodoSelecionado,
            data: new Date().toISOString(),
        };

        try {
            await axios.post(API_URL_pedidos, pedido, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            for (const jogo of atualizarJogos) {
                await axios.put(`${API_URL_jogos}/${jogo.id}`, jogo, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            }

            await axios.delete(`${API_URL_carrinhos}/deletarCarrinho/${carrinhoId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            toast.success("Compra realizada com sucesso!", {
                position: "top-center",
                autoClose: 2500,
                theme: "dark",
            });
        } catch (error) {
            console.error("Erro ao salvar o pedido:", error);
            toast.error("Erro ao finalizar a compra.");
        } finally {
            setTimeout(() => navigate("/"), 2500);
        }
    };

    return (
        <div>
            <NavbarInterna />
            <div className="container d-flex flex-column align-items-center mt-4">
                <h2 style={{ color: "white" }}>Endereço do Usuário</h2>
                <select
                    className="form-select mb-4"
                    value={enderecoSelecionado}
                    onChange={handleEnderecoChange}
                    style={{ width: '100%' }}
                >
                    <option value="">Escolha um endereço</option>
                    {enderecos.map((endereco) => (
                        <option key={endereco._id} value={endereco._id}>
                            {endereco.rua}, {endereco.numero}
                        </option>
                    ))}
                    <option value="add-new">Adicionar novo endereço</option>
                </select>

                {formEnderecoVisivel && (
                    <form onSubmit={handleSubmitEndereco} className="card p-4">
                        <h3 style={{ textAlign: "center" }}>Adicionar Novo Endereço</h3>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "black" }}>Rua</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rua"
                                value={novoEndereco.rua}
                                onChange={handleInputChange}
                                placeholder="Ex.: Avenida Brasil"
                                required
                                style={{ color: "black" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "black" }}>Número</label>
                            <input
                                type="text"
                                className="form-control"
                                name="numero"
                                value={novoEndereco.numero}
                                onChange={handleInputChange}
                                placeholder="Ex.: 123"
                                required
                                style={{ color: "black" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "black" }}>Cidade</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cidade"
                                value={novoEndereco.cidade}
                                onChange={handleInputChange}
                                placeholder="Ex.: São Paulo"
                                required
                                style={{ color: "black" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "black" }}>Estado</label>
                            <input
                                type="text"
                                className="form-control"
                                name="estado"
                                value={novoEndereco.estado}
                                onChange={handleInputChange}
                                placeholder="Ex.: SP"
                                required
                                style={{ color: "black" }}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "black" }}>CEP</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cep"
                                value={novoEndereco.cep}
                                onChange={handleInputChange}
                                placeholder="Ex.: 01234-567"
                                required
                                style={{ color: "black" }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Adicionar Endereço
                        </button>
                    </form>
                )}

                {enderecoSelecionado && enderecoSelecionado !== "add-new" && (
                    <div className="card p-4 mt-4">
                        <h3 style={{ textAlign: "center" }}>Métodos de Pagamento</h3>
                        <select
                            className="form-select mb-4"
                            value={metodoSelecionado}
                            onChange={handleMetodoChange}
                            style={{ width: '100%' }}
                        >
                            <option value="">Escolha um método</option>
                            {pagamentos.map((metodo) => (
                                <option key={metodo._id} value={metodo._id}>
                                    {metodo.ApelidoCartao}
                                </option>
                            ))}
                            <option value="add-new">Adicionar novo método</option>
                        </select>

                        {formPagamentoVisivel && (
                            <form onSubmit={handleSubmitPagamento} className="card p-4">
                                <h3 style={{ textAlign: "center" }}>Adicionar Novo Método de Pagamento</h3>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: "black" }}>Apelido do Cartão</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ApelidoCartao"
                                        value={novoPagamento.ApelidoCartao}
                                        onChange={handleInputPagamentoChange}
                                        required
                                        style={{ color: "black" }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: "black" }}>Número do Cartão</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="numeroCartao"
                                        value={novoPagamento.numeroCartao}
                                        onChange={handleInputPagamentoChange}
                                        required
                                        style={{ color: "black" }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: "black" }}>Nome no Cartão</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="NomeCartao"
                                        value={novoPagamento.NomeCartao}
                                        onChange={handleInputPagamentoChange}
                                        required
                                        style={{ color: "black" }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: "black" }}>Data de Validade</label>
                                    <input
                                        type="month"
                                        className="form-control"
                                        name="dataNascimento"
                                        value={novoPagamento.dataNascimento}
                                        onChange={handleInputPagamentoChange}
                                        required
                                        style={{ color: "black" }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Adicionar Método de Pagamento
                                </button>
                            </form>
                        )}

                        {metodoSelecionado && metodoSelecionado !== "add-new" && (
                            <div className="card p-4">
                                <h3 style={{ textAlign: "center" }}>Método Selecionado:</h3>
                                {pagamentos
                                    .filter((metodo) => metodo._id === metodoSelecionado)
                                    .map((metodo) => (
                                        <div key={metodo._id}>
                                            <p><strong>Nome no Cartão:</strong> {metodo.NomeCartao}</p>
                                            <p><strong>Número do Cartão:</strong> {metodo.numeroCartao}</p>
                                            <p><strong>Validade:</strong> {metodo.dataNascimento}</p>
                                        </div>
                                    ))}
                                <button
                                    className="btn btn-success mt-3"
                                    onClick={FinalizarCompra}
                                >
                                    Confirmar Compra
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <h5 id="total">VALOR TOTAL DA COMPRA: R$ {total}</h5>

                <ToastContainer />
            </div>
        </div>
    );
}

export default Comprar;