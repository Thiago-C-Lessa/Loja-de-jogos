import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./backend/ssl_Keys/localhost-key.pem'), // Caminho para sua chave privada
      cert: fs.readFileSync('./backend/ssl_Keys/localhost.pem'),    // Caminho para seu certificado
    },
    host: 'localhost', // Expõe o host local
    port: 5173,        // Porta padrão do Vite
  },
});
