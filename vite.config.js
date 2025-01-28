import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  server:{
    https:{
      key: './ssl_Keys/localhost-key.pem',
      cert:'./ssl_Keys/localhost.pem'

    },
  },
  plugins: [react()],
})
