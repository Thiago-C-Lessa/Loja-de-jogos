const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users');


const PagamentoSchema = new Schema({
    
    ApelidoCartao: { type: String, required: true },             
    NomeCartao: { type: String, required: true },          
    numeroCartao: { type: Number, required: true },   
    dataNascimento: { type: String, required: true },      
    idUsuario: { 
            type: mongoose.Schema.Types.ObjectId,  // Referência para o _id do usuário
            ref: 'User',  // Nome do modelo de usuário, garantindo a associação correta
            required: true 
        } 
    });

   

const Pagamentos = mongoose.model('Pagamentos',PagamentoSchema);
module.exports = Pagamentos;