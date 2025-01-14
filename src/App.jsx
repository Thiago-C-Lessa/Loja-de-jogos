import React from "react";
import Adm from "./Routes/Adm";
import Usuario from "./Routes/Usuario";  // Importando a rota do usuário comum
import { useSelector } from "react-redux";

function App() {
  let { currentUser } = useSelector((state) => state.userReducer); // Usuário atual

  // Determinando se o usuário é administrador ou normal
  const Tipo = currentUser?.TipoAdm === true; // Verifica se é "true" (como string)

  return (
    <>
      {Tipo ? <Adm /> : <Usuario />}  {/* Renderiza a rota conforme o tipo do usuário */}
    </>
  );
}

export default App;
