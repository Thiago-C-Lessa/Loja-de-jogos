import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    const navigate = useNavigate();

    const API_URL_pagamento = "http://localhost:5000/pagamentos"
    const API_URL_endereco = "http://localhost:5000/enderecos"
    const API_URL_pedidos = "http://localhost:5000/pedidos"

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
    const handleEnderecoChange = (e) => setEnderecoSelecionado(e.target.value);

    const FinalizarCompra = async () => {
        // Jogo e plataforma selecionados serão extraídos do carrinho
        const jogosComprados = itensCarrinho.map(item => ({
            jogo: item.nome,
            plataformaSelecionada: item.plataforma,
            quantidade: item.quantidade,
            
        }));

        const pedido = {
            idUsuario: ID,
            jogosComprados: jogosComprados,
            total: total,
            enderecoId: enderecoSelecionado,
            metodoPagamentoId: metodoSelecionado,
            data: new Date().toISOString(),
        };

        try {
            await axios.post(API_URL_pedidos, pedido,
                {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            localStorage.removeItem('carrinho');
            toast.success("Compra realizada com sucesso!", {
                position: "top-center",
                autoClose: 2500,
                theme: "dark",
            });
            
        } catch (error) {
            console.error("Erro ao salvar o pedido:", error);
            toast.error("Erro ao finalizar a compra.");
        }finally{setTimeout(() => navigate("/"), 2500); // Redireciona após 2.5s
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
                            onChange={handleMetodoChange}
                            style={{ width: '100%' }} // Tamanho igual
                        >
                            <option value="">Escolha um método</option>
                            {pagamentos.map((metodo) => (
                                <option key={metodo._id} value={metodo._id}>
                                    {metodo.ApelidoCartao}
                                </option>
                            ))}
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
