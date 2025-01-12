const express = require('express');
const router = express.Router();


const User = require('../models/users');

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action, data) => {
    const now = new Date();
    const log = `[${now.toISOString()}] Ação: ${action} | Dados: ${JSON.stringify(data)}\n`;
    console.log(log);
};


router.post('/', async (req, res) => {
    try {
      const users = new User(req.body); // Cria um novo usuario com os dados do corpo da requisição
      await users.save(); // Salva o usuario no banco de dados
      res.status(201).json(users); // Retorna o usuario salvo com status 201 (Criado)
    } catch (err) {
        console.error("Erro ao criar usuário:", err.message, err);
        res.status(400).json({ message: err.message, details: err });
      }});

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Busca o usuario pelo ID
        if (!user) {
        return res.status(404).json({ message: 'usuario não encontrado' }); // Se não encontrar, retorna 404
        }
        res.status(200).json(user); // Retorna o usuario encontrado
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    });


router.get('/',(req, res)=>{
    logAction('GET Todos os usuários', {});
    res.send('usuarios ;/');
});
  
module.exports = router;