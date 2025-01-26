const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt =  require('jsonwebtoken');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const _PORT_ = process.env._PORT_;
const __MONGO_URL__ = process.env.__MONGO_URL__;

//ssl keys
const privateKey = fs.readFileSync('./ssl_Keys/localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('./ssl_Keys/localhost.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

//faz as conecções do mongoose
const connction = mongoose.connect(__MONGO_URL__)

// Faz a conexão com o MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(__MONGO_URL__);
        console.log('\n        Conectado ao MongoDB database.');

    } catch (error) {
        console.error(`Ocorreu um erro na conexão com o MongoDB: ${error.message}`);
    }
};

// Inicia a conexão com o MongoDB
connectDB();

// começa com o express:
//importa as rotas
const jogosRouter = require('./routes/jogos');
const userRouter = require('./routes/users');
const avaliacoesRouter = require('./routes/avaliacoes');
const pedidosRouter = require('./routes/pedidos');
const enderecosRouter = require('./routes/enderecos');
const pagamentosRouter = require('./routes/pagamentos');
const carrinhosRouter = require('./routes/carrinhos');


const app = express();


//usa cors para evitar bo da entradas diferentes
app.use(cors({
    //origin: 'http://localhost:5173',
    origin: '*', // Permite qualquer origem (não recomendado em produção)
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

//usa json para processar os req e res
app.use(express.json());


//abre as rotas
app.use('/jogos',jogosRouter);
app.use('/enderecos',enderecosRouter);
app.use('/usuarios',userRouter);
app.use('/pagamentos',pagamentosRouter);
app.use('/avaliacoes',avaliacoesRouter);
app.use('/pedidos',pedidosRouter);
app.use('/carrinhos',carrinhosRouter);




//INICIA faz com que o express fique na porta especificada
// Inicia o servidor HTTPS
https.createServer(credentials, app).listen(_PORT_, () => {
    console.log(`
        ⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
        ⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
        ⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
        ⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
        ⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
        ⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
        ⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
        ⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
        ⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
        ⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
        ⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
        ⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
        ⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
        ⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣ 


        Index:
        https://localhost:${_PORT_}/

        Endpoints:
        https://localhost:${_PORT_}/jogos
        https://localhost:${_PORT_}/enderecos
        https://localhost:${_PORT_}/usuarios
        https://localhost:${_PORT_}/pagamentos
        https://localhost:${_PORT_}/avaliacoes
        https://localhost:${_PORT_}/pedidos
        https://localhost:${_PORT_}/carrinhos`);
});