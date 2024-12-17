import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usando localStorage como armazenamento
import userReducer from './user/reduer';  

// Configuração do redux-persist
const persistConfig = {
  key: 'root',        // Chave que será usada no armazenamento
  storage,            // O armazenamento a ser usado, localStorage por padrão
  whitelist: ['userReducer'], // Só persiste o estado de userReducer
};

const rootReducer = combineReducers({
  userReducer, // Redefine o reducer de usuário
});

// Wrap o rootReducer com persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
