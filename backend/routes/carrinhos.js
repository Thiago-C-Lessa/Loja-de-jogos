const express = require('express');
const router = express.Router();

const Carrinhos = require('../models/carrinhos');
const jwt = require('jsonwebtoken');


const autenticaToken = (req, res, next)=>
  {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
          return res.status(403).json({ message: "Token de autenticação não fornecido." });
      }
      jwt.verify(token, process.env.__TOKEN_JWT__, (err,user)=>{
          if(err)
          {
              return res.sendStatus(403)
          } 
          req.user = user;
          next();
      })
  }



  router.get('/:id', autenticaToken, async (req, res) => {
    try {
      const carrinho = await Carrinhos.findOne({ idUsuario: req.params.id });
      if (!carrinho) {
        return res.status(404).json({ message: "Carrinho não encontrado" });
      }
      res.status(200).json(carrinho);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  

router.post('/', autenticaToken, async (req, res) => {
try {
    const carrinho = new Carrinhos(req.body); // Cria um novo com os dados do corpo da requisição
    await carrinho.save(); 
    res.status(201).json(carrinho); // Retorna o carrinho salvo com status 201 (Criado)
} catch (err) {
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
   
}
});

router.delete('/:id', autenticaToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { jogoId } = req.body;

    const carrinho = await Carrinhos.findById(id);
    const itemIndex = carrinho.jogo.findIndex(item => item._id.toString() === jogoId); 
    carrinho.jogo.splice(itemIndex, 1);
    
    // Salvando o carrinho com o jogo removido
    await carrinho.save();
    
    res.sendStatus(204); // Sucesso, sem conteúdo para retornar
  } catch (err) {
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
  }
});

router.delete('/deletarCarrinho/:id', autenticaToken, async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do carrinho a ser deletado
    const carrinho = await Carrinhos.findByIdAndDelete(id); // Deleta o carrinho no banco de dados

    if (!carrinho) {
      return res.status(404).json({ message: "Carrinho não encontrado" });
    }

    res.status(204).send(); // Retorna status 204 em caso de sucesso
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar o carrinho", error: err.message });
  }
});



router.put('/:id', autenticaToken, async (req, res) => {
  try {
    const { id } = req.params; // ID do carrinho
    const novoJogo = req.body.jogo; 
    const carrinhoAtualizado = await Carrinhos.findByIdAndUpdate(
      id,
      { $push: { jogo: { $each: novoJogo } } },
      { new: true } 
    );

    res.status(200).json(carrinhoAtualizado);
  } catch (err) {
    console.error("Erro ao atualizar o carrinho:", err);
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar a plataforma de um jogo no carrinho
router.put('/atualizar-plataforma/:id', autenticaToken, async (req, res) => {
  try {
    const { id } = req.params; // ID do carrinho
    const { jogoId, novaPlataforma} = req.body; // JogoID e a nova plataforma
    

    // Buscar o carrinho pelo ID
    const carrinho = await Carrinhos.findById(id); // Encontrar o carrinho no banco de dados     
    const itemIndex = carrinho.jogo.findIndex(item => item._id.toString() === jogoId);    
    // Atualizar a plataforma do item
    carrinho.jogo[itemIndex].plataformaSelecionada = novaPlataforma;
    
    // Salvar as mudanças no carrinho
    await carrinho.save();

    // Retornar o carrinho atualizado
    res.status(200).json(carrinho);
  } catch (err) {
    console.error("Erro ao atualizar a plataforma:", err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/atualizar-quantidade/:id', autenticaToken, async (req, res) => {
  try {
    const { id } = req.params; // ID do carrinho
    const { jogoId, novaQuantidade } = req.body; // JogoID e a nova plataforma
    
    console.log(id,jogoId)
    // Buscar o carrinho pelo ID
    const carrinho = await Carrinhos.findById(id); // Encontrar o carrinho no banco de dados

    // Encontrar o item do jogo no carrinho
    const itemIndex = carrinho.jogo.findIndex(item => item._id.toString() === jogoId); 
    
    // Atualizar a plataforma do item
    carrinho.jogo[itemIndex].quantidade = novaQuantidade;
    
    // Salvar as mudanças no carrinho
    await carrinho.save();

    // Retornar o carrinho atualizado
    res.status(200).json(carrinho);
  } catch (err) {
    console.error("Erro ao atualizar a quantidade:", err);
    res.status(400).json({ message: err.message });
  }
});










module.exports = router;