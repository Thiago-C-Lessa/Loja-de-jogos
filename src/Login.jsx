import React, { useState } from 'react';
import NavbarInterna from './assets/navbarInterna';
import userReducer from './Redux/user/reduer';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
// importa o navgate para voltar para a página anterio assim caso o login aconteça no processo de compra
// ele volta para o processo
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Estado para armazenar os dados do formulário de login
  const [formData, setFormData] = useState({
    login: '',
    senha: ''
  });

  const [erros, setError]= useState();

  // Função para lidar com as alterações nos campos de input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // Aqui você pode processar os dados, como fazer login, validando o login e a senha
    try {
      const response = await axios.get("http://localhost:5000/usuarios");
      const resposta = response.data
      //verifica se o usuário existe
      const user = resposta.find(
        (u) => u.email === formData.login && u.senha === formData.senha
      );
      if(user){
        //login deu bom
        // Atualiza o Redux com o usuário logado
        dispatch({
          type:'user/login',
          payload: user
        } );
        setError(null);
      } else {
        // Usuário ou senha inválidos
        setError("Login ou senha inválidos.");
      }
    }
    catch(error){
      console.log(error)
    }
    

    console.log(formData);
    navigate(-1);// volta a página anterior
  };


  //usa o REDUX
  const {currentUser} = useSelector(rootReducer => rootReducer.userReducer)
  console.log({currentUser})

  return (
    <div id='containerLogin'>{/* div que contem a navbar inter e o login */}
      <NavbarInterna/>

    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: '24rem' }}>
      <h2 className="text-center mb-4" style={{ color: "black" }}>Entrar</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginInput" className="form-label" style={{color:"black"}}>Login</label>
            <input
              type="text"
              className="form-control"
              id="loginInput"
              name="login"
              value={formData.login}
              onChange={handleChange}
              placeholder="Digite seu login"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label"style={{color:"black"}}>Senha</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>

        <div className="text-center mt-3">
          <span>Não possui uma conta? <a href="/Cadastro">Cadastre-se</a></span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;

