const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./users');

const CarrinhosSchema = new Schema({
    
        idUsuario: { 
            type: mongoose.Schema.Types.ObjectId,  // Referência para o _id do usuário
            ref: 'User',  // Nome do modelo de usuário, garantindo a associação correta
            required: true 
        }, 
            jogo: [
                {
                    jogoid: { 
                            type: mongoose.Schema.Types.ObjectId,  // Referência para o _id do usuário
                            ref: 'jogos',  // Nome do modelo de usuário, garantindo a associação correta
                            required: true 
                        },
                plataformaSelecionada: { type: String, default: null }, 
                quantidade: { type: Number, default: 0 }
                }
            ],
        });

   

const Carrinhos = mongoose.model('Carrinhos',CarrinhosSchema);
module.exports = Carrinhos;