# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Uso: Server + Frontend

1. Execute `npm install` na pasta **Loja-de-jogos** para instalar as dependências.

2. Abra um terminal na pasta **backend** e execute:  
  
   "json-server --watch db.json --port 5000 cors"
   quando o back estiver em funcionamento sem o server json: "npm run dev"

3. Volte ao terminal que abriu na pasta **Loja-de-jogos** e execute:

   "npm run dev"
