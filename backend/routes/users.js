const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const argon2 = require("argon2");

const User = require('../models/users');

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action) => {
    const now = new Date();
    const log = `[${now.toISOString()}] Ação: ${action} \n`;
    console.log(log);
};

    //POST
    router.post("/", async (req, res) => {
        try {
            // Cria um novo usuário com os dados do corpo da requisição
            const {
                nome,
                dataNascimento,
                cpf,
                email,
                senha,
                tipoAdm,
            } = req.body;

            const hashedPassword = await argon2.hash(senha);
            const users = new User({
                nome,
                dataNascimento,
                cpf,
                email,
                senha: hashedPassword,  // Armazena a senha como hash
                tipoAdm: "false",
            });
    
            await users.save(); // Salva o usuário no banco de dados
    
            logAction("createUser");
            res.status(201).json(users); // Retorna o usuário salvo com status 201 (Criado)
        } catch (err) {
            console.error("Erro ao criar usuário:", err.message, err);
            res.status(400).json({ message: err.message, details: err });
        }
    });
    
    

      //GETBYID
router.get('/getById', async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findOne({ id }); // Busca o usuario pelo ID
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

//login
router.post('/login', async(req,res)=>{
    const { email, senha } = req.body;
    try {
      const user = await User.findOne({ email });
      logAction("LOGIN");

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
  
      // Supondo que `user.senha` seja o hash armazenado
      const hashedPassword = await argon2.hash(senha);
      const senhaValida = await argon2.verify(user.senha, senha);
      if (!senhaValida) {
        return res.status(401).json({ message: "Senha incorreta." });
    }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
});

//GET BY EMAIL
router.get("/getByEmail/:email", async (req, res) => {
    const { email } = req.body;
    try {
        // Buscar o usuário pelo email
        const usuario = await User.findOne({ email });
        logAction("getByEmail")

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        // Retorna os dados do usuário encontrado
        res.status(200).json({ mensagem: 'Usuário encontrado.', usuario });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro ao buscar usuário.', erro });
    }
});
  
module.exports = router;