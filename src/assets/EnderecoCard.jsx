import React, { useEffect, useState} from "react";
import axios from "axios";



function EnderecoCard(ID) {
    const [end, setEnd] = useState([]);
//pega enderecos
    useEffect(()=>{
        axios
        .get("http://localhost:5000/enderecos")
        .then((response)=>{
            setEnd(response.data);
        })
        .catch((error)=>{
            console.log("erro ao carregar enderecos:",error)
        });

    },[]);
// filtra enderecos
    const enderecosfiltrados = end.filter((endereco) => endereco.usuarioId === ID.id);

// Se não houver endereços filtrados
    if (enderecosfiltrados.length === 0) {
        return         <li
        className="list-group-item"
        style={{
            backgroundColor: "hsl(235, 60%, 20%)",
            color: "white",
            borderColor: "black",
        }}
    >
        Endereço não disponível.
    </li>
    }

        return enderecosfiltrados.map((endereco) => (
            <div key={endereco.id}>
                <li
                    className="list-group-item"
                    style={{
                        backgroundColor: "hsl(235, 60%, 20%)",
                        color: "white",
                        borderColor: "black",
                    }}
                >
                    Estado: {endereco.estado}
                </li>
                <li
                    className="list-group-item"
                    style={{
                        backgroundColor: "hsl(235, 60%, 22%)",
                        color: "white",
                        borderColor: "black",
                    }}
                >
                    Cidade: {endereco.cidade}
                </li>
                <li
                    className="list-group-item"
                    style={{
                        backgroundColor: "hsl(235, 60%, 20%)",
                        color: "white",
                        borderColor: "black",
                    }}
                >
                    Rua: {endereco.rua}
                </li>
                <li
                    className="list-group-item"
                    style={{
                        backgroundColor: "hsl(235, 60%, 22%)",
                        color: "white",
                        borderColor: "black",
                    }}
                >
                    Número: {endereco.numero}
                </li>
                <li
                    className="list-group-item"
                    style={{
                        backgroundColor: "hsl(235, 60%, 20%)",
                        color: "white",
                        borderColor: "black",
                    }}
                >
                    CEP: {endereco.cep}
                </li>
            </div>
        )  
        );

 
}

export default EnderecoCard;
