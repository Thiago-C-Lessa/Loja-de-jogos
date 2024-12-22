const express = require('express');
const cors = require('cors');
const PORT = 5000;
const mongoose = require('mongoose');

const __MONGO_URL__ = 'mongodb://localhost:27017/LojaJogos'

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
app.listen(PORT,()=>{
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
        http://localhost:${PORT}/

        Endpoints:
        http://localhost:${PORT}/jogos
        http://localhost:${PORT}/enderecos
        http://localhost:${PORT}/usuarios
        http://localhost:${PORT}/pagamentos
        http://localhost:${PORT}/avaliacoes
        http://localhost:${PORT}/pedidos`)
});

