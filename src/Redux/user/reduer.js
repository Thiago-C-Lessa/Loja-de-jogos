// Valor inicial
const initialState = {
    currentUser: null, // Armazena o usuário logado
    isLoggedIn: false, // Define se o usuário está logado
  };
  
  // Função reducer para gerenciar as ações de login e logout
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'user/login': // Ação de login
        return {
          ...state, // Preserva o estado atual
          currentUser: action.payload, // Atualiza com os dados do usuário logado
          isLoggedIn: true, // Define que o usuário está logado
        };
  
      case 'user/logout': // Ação de logout
        return {
          ...state, // Preserva o estado atual
          currentUser: null, // Remove os dados do usuário
          isLoggedIn: false, // Define que o usuário não está mais logado
        };
  
      default: // Retorna o estado atual para qualquer outra ação
        return state;
    }
  };
  
  export default userReducer;
  