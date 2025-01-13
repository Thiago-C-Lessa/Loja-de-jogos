const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const EnderecosSchema = new Schema({
    
    
    rua:  { type: String, required: true },
    numero: { type: Number, required: true },
    cidade:  { type: String, required: true },
    estado:  { type: String, required: true },
    cep: { type: Number, required: true },
    idUsuario: { type: String, required: true }
      
    });

   

const Enderecos = mongoose.model('Enderecos',EnderecosSchema);
module.exports = Enderecos;