const express = require('express');
const router = express.Router();
const argon2 = require("argon2");
const jwt = require('jsonwebtoken');

const User = require('../models/users');

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action) => 
{
    const now = new Date();
    const log = `[${now.toISOString()}] Ação: ${action} \n`;
    console.log(log);
};

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

            users.senha = null;
    
            logAction("createUser");
            const token = jwt.sign(
                { id: users._id, email: users.email, tipoAdm: users.tipoAdm},
                process.env.__TOKEN_JWT__
            );
            // Retorna o usuário salvo com status 201 (Criado)
            res.status(200).json({ 
              message: "Usuaário cridado com sucesso.",
              user: users,
              token: token
            });
        } catch (err) {
            console.error("Erro ao criar usuário:", err.message, err);
            res.status(400).json({ message: err.message, details: err });
        }
    });
    
    

//GETBYID
router.get('/getById/:id',autenticaToken, async (req, res) => {
    try {
        const user = await User.findById( req.params.id ); // Busca o usuario pelo ID
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
/*
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
*/
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
      const senhaValida = await argon2.verify(user.senha, senha);
      if (!senhaValida) {
        return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, tipoAdm: user.tipoAdm},
        process.env.__TOKEN_JWT__
    );

    user.senha = null;

    res.status(200).json({ 
      message: "Login realizado.",
      user: user,
      token: token
    });
  
      //res.status(200).json(user);
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

    router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id);
            const user = await User.findByIdAndDelete(id); // Exclui o jogo pelo ID
            if (!user) {
            return res.status(404).json({ message: 'usuario nao encontrado' });
          }
          logAction("deleteJogo",{user})
          res.status(200).json({ message: 'usuario excluido com sucesso' }); // Retorna mensagem de sucesso

        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      });

    
      router.put('/:id', autenticaToken, async (req, res) => {
        try {
          const id = req.params.id;
          const dados = req.body;
            
          console.log(dados,'senha',id)
          // Buscar o usuário pelo ID
          const user = await User.findById(id);
      
          if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
          }
      
          // Verificar se a senha atual está correta
          const senhaAtual = dados.senha;  // A senha atual enviada no corpo da requisição
          const senhaValida = await argon2.verify(user.senha, senhaAtual);
          if (!senhaValida) {
            return res.status(401).json({ message: "Senha incorreta." });
          }
      
          // Atualizar a senha apenas se a nova senha foi fornecida
          if (dados.novasenha) {
            const hashedPassword = await argon2.hash(dados.novasenha);
            user.senha = hashedPassword;  // Atualiza a senha do usuário
          }
      
          // Atualizar outros dados do usuário (exceto a senha)
          user.nome = dados.nome || user.nome;
          user.email = dados.email || user.email;
          user.dataNascimento = dados.dataNascimento || user.dataNascimento;
      
          // Salvar as alterações no banco de dados
          await user.save();
      
          res.status(200).json({ message: "Usuário atualizado com sucesso.", user });
        } catch (err) {
          console.error("Erro ao atualizar o usuário:", err);
          res.status(400).json({ message: err.message });
        }
      });
      



  
module.exports = router;