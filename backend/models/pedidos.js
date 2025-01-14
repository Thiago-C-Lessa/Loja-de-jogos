const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const PedidosSchema = new Schema({
    
    
        
        idUsuario: { type: String, required: true }, 
        jogosComprados: [
            {
          
            jogo: { type: String, required: true }, 
            plataformaSelecionada: { type: String, required: true }, 
            quantidade: { type: Number, required: true }
            }
        ],
        total: { type: Number, required: true },
        enderecoId: { type: String, required: true },
        metodoPagamentoId: { type: String, required: true }, 
        data: { type: String, required: true }
    });

   

const Pedidos = mongoose.model('Pedidos',PedidosSchema);
module.exports = Pedidos;