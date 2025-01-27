const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//importa o modelo do mongo
const Jogo = require('../models/jogos');

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

  const verificaAdmin = (req, res, next) =>{
    if(!req.user.tipoAdm || req.user.tipoAdm !== "true"){
        return res.status(403).json({message: "Acesso negado! Apenas usuários admnistradores podem acessar esta rota."})
    }
    next();
}

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action, data) => {
    const now = new Date();
    const log = `[${now.toISOString()}] Ação: ${action} | Dados: ${JSON.stringify(data)}\n`;
    console.log(log);
};

//para fazer um log no terminal quando uma requisição for feita só que sem texto
const logActionNoText = (action) => {
  const now = new Date();
  const log = `[${now.toISOString()}] Ação: ${action}\n`;
  console.log(log);
};

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/imagem/')); // Certifique-se de que o caminho está correto
  },
  filename: (req, file, cb) => {
    // Gerar um nome de arquivo único (você pode adicionar um timestamp ou algum identificador único se necessário)
    //const uniqueSuffix = Date.now() + path.extname(file.originalname);  Adiciona um timestamp ao nome
    cb(null, file.originalname);  // Garante que o nome do arquivo seja único
  }
});

const upload = multer({ storage: storage });


// CREATE: Adicionar um novo jogo
router.post('/', verificaAdmin, autenticaToken, async (req, res) => {
    try {
      const jogo = new Jogo(req.body); // Cria um novo jogo com os dados do corpo da requisição
      await jogo.save(); // Salva o jogo no banco de dados
      logAction("postJogo",{jogo})
      res.status(201).json(jogo); // Retorna o jogo salvo com status 201 (Criado)
    } catch (err) {
      res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
    }
  });
  
  // READ: Obter todos os jogos
  router.get('/', async (req, res) => {
    try {
      const jogos = await Jogo.find(); // Busca todos os jogos no banco de dados
      logActionNoText('GET todos os jogos')
      res.status(200).json(jogos); // Retorna os jogos com status 200 (OK)
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // READ: Obter um jogo pelo ID
  router.get('/:id', async (req, res) => {
    try {
      const jogo = await Jogo.findById(req.params.id); // Busca o jogo pelo ID
      if (!jogo) {
        return res.status(404).json({ message: 'Jogo não encontrado' }); // Se não encontrar, retorna 404
      }
      logAction("getByIdJogo",{jogo})
      res.status(200).json(jogo); // Retorna o jogo encontrado
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // UPDATE: Atualizar um jogo
  router.put('/:id', verificaAdmin, autenticaToken, async (req, res) => {
    try {
      const jogo = await Jogo.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Atualiza o jogo
      if (!jogo) {
        return res.status(404).json({ message: 'Jogo não encontrado' }); // Se não encontrar o jogo, retorna 404
      }
      logAction("putJogo",{jogo})
      res.status(200).json(jogo); // Retorna o jogo atualizado
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE: Excluir um jogo
  router.delete('/:id', verificaAdmin, autenticaToken, async (req, res) => {
    try {
      const jogo = await Jogo.findByIdAndDelete(req.params.id); // Exclui o jogo pelo ID
      if (!jogo) {
        return res.status(404).json({ message: 'Jogo não encontrado' });
      }
      logAction("deleteJogo",{jogo})
      if (verificaAdmin){
        res.status(200).json({ message: 'Jogo excluído com sucesso' }); // Retorna mensagem de sucesso
      } else{
        res.status(200).json({ message: 'O usuário precisa ser administrador.' }); // Retorna mensagem de sucesso
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//post img
router.post('/uploadImagem', upload.single('file'), (req, res) => {
  logActionNoText("upload imagem");
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  res.status(200).send(`Arquivo ${req.file.filename} foi salvo com sucesso!`);
});
  
module.exports = router;