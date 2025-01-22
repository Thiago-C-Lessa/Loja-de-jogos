import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importando useNavigate para navegação
import NavbarInterna from './assets/navbarInterna';
import './Style/Comprar.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector } from "react-redux";

function Comprar() {
    const { currentUser } = useSelector((state) => state.userReducer); // Usuário atual
    const ID = currentUser._id;

    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')); // Obtém os itens do carrinho armazenados
        if (carrinho) {
            setItensCarrinho(carrinho);
        }
    }, []);

    const [pagamentos, setPagamentos] = useState([]);
    const [enderecos, setEnderecos] = useState([]);
    const [metodoSelecionado, setMetodoSelecionado] = useState("");
    const [enderecoSelecionado, setEnderecoSelecionado] = useState("");
    const [itensCarrinho, setItensCarrinho] = useState([]);
    const [total, setTotal] = useState(0); // Valor total da compra

    const navigate = useNavigate(); // Hook para navegação

    const API_URL_pagamento = "http://localhost:5000/pagamentos"
    const API_URL_endereco = "http://localhost:5000/enderecos"
    const API_URL_pedidos = "http://localhost:5000/pedidos"
    const API_URL_jogos = "http://localhost:5000/jogos"

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [responsePagamento, responseEndereco] = await Promise.all([
                    axios.get(
                        `${API_URL_pagamento}/${ID}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    ),
                    axios.get(
                        `${API_URL_endereco}/${ID}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    ),
                ]);
                setPagamentos(responsePagamento.data);
                setEnderecos(responseEndereco.data);
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
                toast.error("Erro ao carregar dados do usuário.");
            }
        };
        carregarDados();
    }, [ID]);

    // Função para calcular o total da compra
    useEffect(() => {
        const totalCompra = itensCarrinho.reduce((total, item) => {
            return total + ((item.preco * item.quantidade) / 10);
        }, 0);
        setTotal(totalCompra.toFixed(2));  // Aplica .toFixed(2) após o cálculo do total
    }, [itensCarrinho]);

    const handleMetodoChange = (e) => setMetodoSelecionado(e.target.value);
    const handleEnderecoChange = (e) => {
        const selectedValue = e.target.value;
        setEnderecoSelecionado(selectedValue);

        // Se a opção "Adicionar novo endereço" for selecionada, navegue para /GerirEndereco
        if (selectedValue === "add-new") {
            navigate("/GerirEndereco"); // Navegação para a tela de gerenciamento de endereços
        }
    };

    const handleMetodoPagamentoChange = (e) => {
        const selectedValue = e.target.value;
        setMetodoSelecionado(selectedValue);

        // Se a opção "Adicionar novo método" for selecionada, navegue para /Pagamentos
        if (selectedValue === "add-new") {
            navigate("/Pagamentos"); // Navegação para a tela de gerenciamento de métodos de pagamento
        }
    };

    const FinalizarCompra = async () => {
        // Mapeando os jogos comprados para atualização
        const atualizarJogos = itensCarrinho.map(item => ({
            id: item._id, // ID do jogo
            numeroVendas: ((item.numeroVendas) || 0) + item.quantidade, // Incrementa pelas vendas realizadas
            ...(item.plataforma === "PS5" && { quantidade_ps5: item.quantidade_ps5 - item.quantidade }),
            ...(item.plataforma === "Xbox" && { quantidade_xbox: item.quantidade_xbox - item.quantidade }),
            ...(item.plataforma === "PC" && { quantidade_pc: item.quantidade_pc - item.quantidade }),
        }));
    
        const pedido = {
            idUsuario: ID,
            jogosComprados: itensCarrinho.map(item => ({
                jogo: item.nome,
                plataformaSelecionada: item.plataforma,
                quantidade: item.quantidade,
            })),
            total: total,
            enderecoId: enderecoSelecionado,
            metodoPagamentoId: metodoSelecionado,
            data: new Date().toISOString(),
        };
    
        try {
            // Envia o pedido para o servidor
            await axios.post(API_URL_pedidos, pedido, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
    
            // Atualiza as informações dos jogos comprados no servidor
            for (const jogo of atualizarJogos) {
                await axios.put(`${API_URL_jogos}/${jogo.id}`, jogo, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
            }
    
            // Limpa o carrinho e notifica o usuário
            localStorage.removeItem('carrinho');
            toast.success("Compra realizada com sucesso!", {
                position: "top-center",
                autoClose: 2500,
                theme: "dark",
            });
        } catch (error) {
            console.error("Erro ao salvar o pedido:", error);
            toast.error("Erro ao finalizar a compra.");
            console.log(atualizarJogos);
        } finally {
            setTimeout(() => navigate("/"), 2500); // Redireciona após 2.5s
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
                    style={{ width: '100%' }} // Tamanho igual
                >
                    <option value="">Escolha um endereço</option>
                    {enderecos.map((endereco) => (
                        <option key={endereco._id} value={endereco._id}>
                            {endereco.rua}, {endereco.numero}
                        </option>
                    ))}
                    <option value="add-new">Adicionar novo endereço</option>
                </select>

                {enderecoSelecionado && (
                    <div className="card p-4">
                        <h3 style={{ textAlign: "center" }}>Endereço Selecionado:</h3>
                        {enderecos
                            .filter((endereco) => endereco._id === enderecoSelecionado) // Comparação com string
                            .map((endereco) => (
                                <div key={endereco._id}>
                                    <p><strong>Rua:</strong> {endereco.rua}</p>
                                    <p><strong>Número:</strong> {endereco.numero}</p>
                                    <p><strong>Cidade:</strong> {endereco.cidade}</p>
                                    <p><strong>Estado:</strong> {endereco.estado}</p>
                                </div>
                            ))}
                    </div>
                )}

                {enderecoSelecionado && (
                    <div style={{ padding: "3rem" }}>
                        <h2 style={{ color: "white" }}>Métodos de Pagamento</h2>
                        <select
                            className="form-select mb-4"
                            value={metodoSelecionado}
                            onChange={handleMetodoPagamentoChange}
                            style={{ width: '100%' }} // Tamanho igual
                        >
                            <option value="">Escolha um método</option>
                            {pagamentos.map((metodo) => (
                                <option key={metodo._id} value={metodo._id}>
                                    {metodo.ApelidoCartao}
                                </option>
                            ))}
                            <option value="add-new">Adicionar novo método</option>
                        </select>

                        {metodoSelecionado && (
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

                <h5 id="total">VALOR TOTAL DA COMPRA:  R$ {total}</h5>

                <ToastContainer />
            </div>
        </div>
    );
}

export default Comprar;