const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jogoSchema = new Schema({
  
  nome: { type: String, required: true },             // Nome do jogo
  imagem: { type: String, required: true },           // URL ou caminho da imagem
  preco: { type: Number, required: true, min: 0 },    // Preço (em centavos ou reais, dependendo do formato usado)
  descricao: { type: String, required: true },        // Descrição do jogo
  genero: { type: String, required: true },           // Gênero do jogo
  quantidade_ps5: { type: Number, default: 0 },       // Estoque para PS5
  quantidade_pc: { type: Number, default: 0 },        // Estoque para PC
  quantidade_xbox: { type: Number, default: 0 }
}, {
  timestamps: true, // Adiciona campos createdAt e updatedAt automaticamente
});

const Jogo = mongoose.model('Jogo', jogoSchema);
module.exports = Jogo;