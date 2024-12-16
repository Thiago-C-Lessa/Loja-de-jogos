import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import Footer from './assets/footer.jsx';
import './Style/main.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Importando o PersistGate
import { store, persistor } from './Redux/store.js'; // Importando a store e o persistor

// provider disponibiliza o redux para todo app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>

    <Footer />
  </StrictMode>
);
