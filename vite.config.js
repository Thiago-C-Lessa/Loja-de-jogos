import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./backend/ssl_Keys/localhost-key.pem'),
      cert: fs.readFileSync('./backend/ssl_Keys/localhost.pem'),
    },
    host: 'localhost',
    port: 5173, 
  },
});
