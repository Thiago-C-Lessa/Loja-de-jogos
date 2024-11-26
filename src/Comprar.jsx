import React, { useState, useEffect } from "react";
import NavbarInterna from './assets/navbarInterna';
import './Style/Compra.css';

function Comprar() {
    const [pagamentos, setPagamentos] = useState({ metodo: "" });
    const [total, setTotal] = useState(0); // Estado para armazenar o valor total
    const [visaDetails, setVisaDetails] = useState({
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        nome: "",
        sobrenome: "",
        cidade: "",
        endereco0: "",
        endereco1: "",
        CEP: "",
        telefone: "",
        pagar: "",
    });

    // Recupera o valor total do localStorage ao carregar o componente
    useEffect(() => {
        const valorTotal = localStorage.getItem('totalCarrinho');
        if (valorTotal) {
            setTotal(parseFloat(valorTotal));
        }
    }, []);

    // Lida com mudanças no select
    function handleInputChangePagamentos(e) {
        const { name, value } = e.target;
        setPagamentos({ ...pagamentos, [name]: value });
    }

    // Lida com mudanças nos campos do formulário Visa
    function handleVisaDetailsChange(e) {
        const { name, value } = e.target;
        setVisaDetails({ ...visaDetails, [name]: value });
    }

    // Salva os dados em um arquivo JSON e redireciona
    function saveToJsonFile(e) {
        e.preventDefault(); // Previne o envio padrão do formulário

        const fileData = JSON.stringify({ ...visaDetails, pagar: total.toFixed(2) }, null, 2);
        const blob = new Blob([fileData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "visa-details.json";
        link.click();

        // Limpa o URL após o download
        URL.revokeObjectURL(url);

        // Redireciona para a página inicial
        window.location.href = "/"; // Isso redireciona para a página inicial
    }

    return (
        <div>
            <NavbarInterna />
            <div className="comprar-container">
                        

                {/* Campo de seleção do método de pagamento */}
                <label htmlFor="metodo">Método de pagamento:</label>
                <select
                    id="metodo"
                    name="metodo"
                    value={pagamentos.metodo}
                    onChange={handleInputChangePagamentos}
                >
                    <option value="" disabled>Selecione um método</option>
                    <option value="Visa">Visa</option>
                    <option value="Pix">Pix</option>
                    <option value="Boleto">Boleto</option>
                </select>

                {/* Renderização condicional do formulário */}
                {pagamentos.metodo === "Visa" && (
                    <form className="comprar-form" onSubmit={saveToJsonFile}>
                        <h2>Detalhes do Cartão Visa</h2>
                        {/* Restante do formulário */}
                        <label htmlFor="cardName">Nome no Cartão:</label>
                        <input required
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={visaDetails.cardName}
                            onChange={handleVisaDetailsChange}
                            placeholder="Digite o nome no cartão"
                        />
                        <br />

                        <label htmlFor="cardNumber">Número do Cartão:</label>
                        <input required
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={visaDetails.cardNumber}
                            onChange={handleVisaDetailsChange}
                            placeholder="Digite o número do cartão"
                        />
                        <br />

                        <label htmlFor="expiryDate">Data de Validade:</label>
                        <input required
                            type="month"
                            id="expiryDate"
                            name="expiryDate"
                            value={visaDetails.expiryDate}
                            onChange={handleVisaDetailsChange}
                        />
                        <br />

                        <label htmlFor="cvv">CVV:</label>
                        <input required
                            type="password"
                            id="cvv"
                            name="cvv"
                            value={visaDetails.cvv}
                            onChange={handleVisaDetailsChange}
                            placeholder="CVV"
                        />
                        <br />

                        <div>
                            <h2>Dados da Cobrança</h2>
                            <label htmlFor="nome">Nome:</label>
                            <input required
                                type="text"
                                id="name"
                                name="nome"
                                value={visaDetails.nome}
                                onChange={handleVisaDetailsChange}
                                placeholder="Nome"
                            />
                            <br />

                            <label htmlFor="sobrenome">Sobrenome:</label>
                            <input required
                                type="text"
                                id="lastname"
                                name="sobrenome"
                                value={visaDetails.sobrenome}
                                onChange={handleVisaDetailsChange}
                                placeholder="Sobrenome"
                            />
                            <br />

                            <label htmlFor="cidade">Cidade:</label>
                            <input required
                                type="text"
                                id="cidade"
                                name="cidade"
                                value={visaDetails.cidade}
                                onChange={handleVisaDetailsChange}
                                placeholder="Cidade"
                            />
                            <br />
                            
                            <label htmlFor="endereco0">Endereço de cobrança:</label>
                            <input required
                                type="text"
                                id="endereco0"
                                name="endereco0"
                                value={visaDetails.endereco0}
                                onChange={handleVisaDetailsChange}
                                placeholder="Endereço de cobrança"
                            />
                            <br />
                                                
                            <label htmlFor="endereco1">Endereço, linha 2:</label>
                            <input
                                type="text"
                                id="endereco1"
                                name="endereco1"
                                value={visaDetails.endereco1}
                                onChange={handleVisaDetailsChange}
                                placeholder="Endereço, linha 2"
                            />
                            <br />
                                                    
                            <label htmlFor="CEP">CEP:</label>
                            <input required
                                type="number"
                                id="CEP"
                                name="CEP"
                                value={visaDetails.CEP}
                                onChange={handleVisaDetailsChange}
                                placeholder="CEP"
                            />
                            <br />
                                                            
                            <label htmlFor="telefone">Telefone:</label>
                            <input required
                                type="number"
                                id="telefone"
                                name="telefone"
                                value={visaDetails.telefone}
                                onChange={handleVisaDetailsChange}
                                placeholder="Telefone"
                            />
                            <br />                    
                        </div>
                        <br />

                        <h2>Valor Total: R$ {total.toFixed(2)}</h2>

                        <button type="submit">
                            Confirmar Pagamento
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Comprar;
