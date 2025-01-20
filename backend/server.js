const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt =  require('jsonwebtoken');
require('dotenv').config();

const _PORT_ = process.env._PORT_;
const __MONGO_URL__ = process.env.__MONGO_URL__;

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


const app = express();


//usa cors para evitar bo da entradas diferentes
app.use(cors({
    //origin: 'http://localhost:5173',
    origin: '*', // Permite todas as origens. Substitua '*' por uma origem específica para mais segurança.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
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




//INICIA faz com que o express fique na porta especificada
app.listen(_PORT_,()=>{
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
        http://localhost:${_PORT_}/

        Endpoints:
        http://localhost:${_PORT_}/jogos
        http://localhost:${_PORT_}/enderecos
        http://localhost:${_PORT_}/usuarios
        http://localhost:${_PORT_}/pagamentos
        http://localhost:${_PORT_}/avaliacoes
        http://localhost:${_PORT_}/pedidos`)
});

