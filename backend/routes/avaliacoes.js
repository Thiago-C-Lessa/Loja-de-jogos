const express = require('express');
const router = express.Router();

const Avaliacoes = require('../models/avaliacoes');

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action) => 
  {
      const now = new Date();
      const log = `[${now.toISOString()}] Ação: ${action} \n`;
      console.log(log);
  };

router.get('/:id', async (req, res) => {
    try {
      const avaliacoes = await Avaliacoes.find({ jogoId: req.params.id }); // Busca pelo ID do jogo
      logAction("GET avaliacoes id")
      if (!avaliacoes.length) {
        return res.status(404).json({ message: 'avaliacão não encontrado' }); // Se não encontrar, retorna 404
      }
      res.status(200).json(avaliacoes); // Retorna a avaliacao encontrado
    } catch (err) {
        res.status(400).json({ message: err.message, details: err });
    }
  });

router.post('/', async (req, res) => {
try {
    const avaliacoes = new Avaliacoes(req.body); // Cria uma nova avaliacão com os dados do corpo da requisição
    await avaliacoes.save(); // Salva  no banco de dados
    res.status(201).json(avaliacoes); // Retorna a avaliacao salvo com status 201 (Criado)
} catch (err) {
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
   
}
});

router.delete('/:id', async(req , res) => {
  try{
    const id = req.params.id;
    const avaliacoes = await Avaliacoes.findByIdAndDelete(id)
    res.sendStatus(204);
  }catch(err){
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // Atualiza  com os dados do corpo da requisição
    const avaliacoes = await Avaliacoes.findByIdAndUpdate(id,req.body,
      { new: true } // Retorna o documento atualizado
    );
    res.status(200).json(avaliacoes); // Retorna a avaliacao atualizado
  } catch (err) {
    res.status(400).json({ message: err.message }); // Retorna o erro em caso de falha
  }
});






module.exports = router;