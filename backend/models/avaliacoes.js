const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const AvaliacoesSchema = new Schema({
    
    
    
    texto: { type: String, required: true },
    estrelas: { type: Number, required: true },
    jogoId: { type: String, required: true },
    usuario: { type: String, required: true },
    idUsuario: {type: String, required: true }

    });

   

const Avaliacoes = mongoose.model('avaliacoes',AvaliacoesSchema);
module.exports = Avaliacoes;