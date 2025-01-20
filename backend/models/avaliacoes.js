const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users');


const AvaliacoesSchema = new Schema({
    
    idUsuario: { 
        type: mongoose.Schema.Types.ObjectId,  // Referência para o _id do usuário
        ref: 'User',  // Nome do modelo de usuário, garantindo a associação correta
        required: true 
    },
    texto: { type: String, required: true },
    estrelas: { type: Number, required: true },
    jogoId: { type: String, required: true },
    usuario: { type: String, required: true },
    });

   

const Avaliacoes = mongoose.model('avaliacoes',AvaliacoesSchema);
module.exports = Avaliacoes;