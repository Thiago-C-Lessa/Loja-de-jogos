const express = require('express');
const router = express.Router();

const Enderecos = require('../models/enderecos');

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action, data) => {
    const now = new Date();
    const log = `[${now.toISOString()}] Ação: ${action} | Dados: ${JSON.stringify(data)}\n`;
    console.log(log);
};


router.get('/:id', async (req, res) => {
    try {
      const enderecos = await Enderecos.find({idUsuario: req.params.id}); // Busca pelo ID do usuario
      if (!enderecos.length) {
        return res.status(404).json({ message: 'Endereco não encontrado' }); // Se não encontrar, retorna 404
      }
      res.status(200).json(enderecos); // Retorna o Pagamento encontrado
    } catch (err) {
        res.status(400).json({ message: err.message, details: err });
    }
  });

router.post('/', async (req, res) => {
try {
    const enderecos = new Enderecos(req.body); // Cria um novo endereco com os dados do corpo da requisição
    await enderecos.save(); // Salva  no banco de dados
    res.status(201).json(enderecos); // Retorna o pagamento salvo com status 201 (Criado)
} catch (err) {
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
   
}
});

router.delete('/:id', async(req , res) => {
  try{
    const id = req.params.id;
    const enderecos = await Enderecos.findByIdAndDelete(id)
    res.sendStatus(204);
  }catch(err){
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // Atualiza o endereco com os dados do corpo da requisição
    const enderecos = await Enderecos.findByIdAndUpdate(id,req.body,
      { new: true } // Retorna o documento atualizado
    );
    res.status(200).json(enderecos); // Retorna o pagamento atualizado
  } catch (err) {
    res.status(400).json({ message: err.message }); // Retorna o erro em caso de falha
  }
});



module.exports = router;