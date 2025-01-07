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
    const ID = currentUser.id;

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

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const [responsePagamento, responseEndereco] = await Promise.all([
                    axios.get("http://localhost:5000/pagamentos"),
                    axios.get("http://localhost:5000/enderecos"),
                ]);
                setPagamentos(responsePagamento.data.filter(item => item.idUsuario === ID));
                setEnderecos(responseEndereco.data.filter(item => item.idUsuario === ID));
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
            jogoId: item.id,
            plataformaSelecionada: item.plataforma,
            quantidade: item.quantidade,
            
        }));

        const pedido = {
            usuarioId: ID,
            jogosComprados: jogosComprados,
            total: total,
            enderecoId: enderecoSelecionado,
            metodoPagamentoId: metodoSelecionado,
            data: new Date().toISOString(),
        };

        try {
            await axios.post("http://localhost:5000/pedidos", pedido);
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
                        <option key={endereco.id} value={endereco.id}>
                            {endereco.rua}, {endereco.numero}
                        </option>
                    ))}
                </select>

                {enderecoSelecionado && (
                    <div className="card p-4">
                        <h3 style={{ textAlign: "center" }}>Endereço Selecionado:</h3>
                        {enderecos
                            .filter((endereco) => endereco.id === enderecoSelecionado) // Comparação com string
                            .map((endereco) => (
                                <div key={endereco.id}>
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
                                <option key={metodo.id} value={metodo.id}>
                                    {metodo.ApelidoCartao}
                                </option>
                            ))}
                        </select>

                        {metodoSelecionado && (
                            <div className="card p-4">
                                <h3 style={{ textAlign: "center" }}>Método Selecionado:</h3>
                                {pagamentos
                                    .filter((metodo) => metodo.id === metodoSelecionado)
                                    .map((metodo) => (
                                        <div key={metodo.id}>
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
