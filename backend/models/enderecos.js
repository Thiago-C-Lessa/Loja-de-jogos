const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users');

const EnderecosSchema = new Schema({
    
    
    rua:  { type: String, required: true },
    numero: { type: Number, required: true },
    cidade:  { type: String, required: true },
    estado:  { type: String, required: true },
    cep: { type: Number, required: true },
        idUsuario: { 
        type: mongoose.Schema.Types.ObjectId,  // Referência para o _id do usuário
        ref: 'User',  // Nome do modelo de usuário, garantindo a associação correta
        required: true 
    }
      
    });

   

const Enderecos = mongoose.model('Enderecos',EnderecosSchema);
module.exports = Enderecos;