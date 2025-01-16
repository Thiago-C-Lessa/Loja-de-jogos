const express = require('express');
const router = express.Router();


const User = require('../models/users');

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action) => {
    const now = new Date();
    const log = `[${now.toISOString()}] Ação: ${action} \n`;
    console.log(log);
};

    //POST
router.post('/', async (req, res) => {
    try {
      const users = new User(req.body); // Cria um novo usuario com os dados do corpo da requisição
      await users.save(); // Salva o usuario no banco de dados
      logAction("createUser")
      res.status(201).json(users); // Retorna o usuario salvo com status 201 (Criado)
    } catch (err) {
        console.error("Erro ao criar usuário:", err.message, err);
        res.status(400).json({ message: err.message, details: err });
      }});

      //GETBYID
router.get('/getById', async (req, res) => {
    try {
        const user = await User.findById(req.params._id); // Busca o usuario pelo ID
        if (!user) {
        return res.status(404).json({ message: 'usuario não encontrado' }); // Se não encontrar, retorna 404
        }
        logAction("getUserById")
        res.status(200).json(user); // Retorna o usuario encontrado
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//GETTODOSUSUARIOS
router.get('/', async (req, res) => {
    try {
        // Busca todos os usuários no banco de dados
        const users = await User.find();
        // Verifica se há usuários e retorna a resposta
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
        }
        logAction('GET Todos os usuários');
        res.status(200).json(users);
    } catch (err) {
        console.error("Erro ao buscar usuários:", err.message, err);
        res.status(500).json({ message: 'Erro ao buscar usuários.', details: err.message });
    }
});

router.get('/login', async(req,res)=>{

});
  
module.exports = router;