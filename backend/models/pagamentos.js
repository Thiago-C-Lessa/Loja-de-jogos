const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const PagamentoSchema = new Schema({
    
    ApelidoCartao: { type: String, required: true },             
    NomeCartao: { type: String, required: true },          
    numeroCartao: { type: Number, required: true },   
    dataNascimento: { type: String, required: true },      
    idUsuario: { type: String , required: true }, 
    });

   

const Pagamentos = mongoose.model('Pagamentos',PagamentoSchema);
module.exports = Pagamentos;