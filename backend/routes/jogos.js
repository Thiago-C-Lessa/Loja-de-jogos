const express = require('express');
const router = express.Router();

//importa o modelo do mongo
const Jogo = require('../models/jogos');

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action, data) => {
    const now = new Date();
    const log = `[${now.toISOString()}] Ação: ${action} | Dados: ${JSON.stringify(data)}\n`;
    console.log(log);
};


// CREATE: Adicionar um novo jogo
router.post('/', async (req, res) => {
    try {
      logAction("CREATE", req)
      const jogo = new Jogo(req.body); // Cria um novo jogo com os dados do corpo da requisição
      await jogo.save(); // Salva o jogo no banco de dados
      res.status(201).json(jogo); // Retorna o jogo salvo com status 201 (Criado)
    } catch (err) {
      res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
    }
  });
  
  // READ: Obter todos os jogos
  router.get('/', async (req, res) => {
    try {
      const jogos = await Jogo.find(); // Busca todos os jogos no banco de dados
      logAction('GET todos os jogos',{jogos})
      res.status(200).json(jogos); // Retorna os jogos com status 200 (OK)
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // READ: Obter um jogo pelo ID
  router.get('/:id', async (req, res) => {
    try {
      logAction("GETBYID",req)
      const jogo = await Jogo.findById(req.params.id); // Busca o jogo pelo ID
      if (!jogo) {
        return res.status(404).json({ message: 'Jogo não encontrado' }); // Se não encontrar, retorna 404
      }
      res.status(200).json(jogo); // Retorna o jogo encontrado
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // UPDATE: Atualizar um jogo
  router.put('/:id', async (req, res) => {
    try {
      logAction("PUT",req)
      const jogo = await Jogo.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Atualiza o jogo
      if (!jogo) {
        return res.status(404).json({ message: 'Jogo não encontrado' }); // Se não encontrar o jogo, retorna 404
      }
      res.status(200).json(jogo); // Retorna o jogo atualizado
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE: Excluir um jogo
  router.delete('/:id', async (req, res) => {
    try {
      logAction("DELETE",req)
      const jogo = await Jogo.findByIdAndDelete(req.params.id); // Exclui o jogo pelo ID
      if (!jogo) {
        return res.status(404).json({ message: 'Jogo não encontrado' });
      }
      res.status(200).json({ message: 'Jogo excluído com sucesso' }); // Retorna mensagem de sucesso
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
module.exports = router;