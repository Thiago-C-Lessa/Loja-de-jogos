import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usando localStorage como armazenamento
import { combineReducers } from 'redux';
import userReducer from './user/reduer';  // Certifique-se de que o caminho está correto

// Configuração do redux-persist
const persistConfig = {
  key: 'root',        // Chave que será usada no armazenamento
  storage,            // O armazenamento a ser usado, localStorage por padrão
  whitelist: ['userReducer'], // Só persiste o estado de userReducer
};

// Combinando os reducers
const rootReducer = combineReducers({
  userReducer, // Redefine o reducer de usuário
});

// Wrap o rootReducer com persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Criação da store com o persistedReducer
const store = createStore(persistedReducer);

// Criação do persistor
const persistor = persistStore(store);

// Exportando tanto a store quanto o persistor
export { store, persistor };
