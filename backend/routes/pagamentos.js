const express = require('express');
const router = express.Router();

const Pagamentos = require('../models/pagamentos');

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action, data) => {
    const now = new Date();
    const log = `[${now.toISOString()}] Ação: ${action} | Dados: ${JSON.stringify(data)}\n`;
    console.log(log);
};

router.get('/:id', async (req, res) => {
    try {
      const pagamentos = await Pagamentos.find({idUsuario: req.params.id}); // Busca pelo ID do usuario
      if (!pagamentos.length) {
        return res.status(404).json({ message: 'Pagamento não encontrado' }); // Se não encontrar, retorna 404
      }
      res.status(200).json(pagamentos); // Retorna o Pagamento encontrado
    } catch (err) {
        res.status(400).json({ message: err.message, details: err });
    }
  });

router.post('/', async (req, res) => {
try {
    const pagamentos = new Pagamentos(req.body); // Cria um novo pagamento com os dados do corpo da requisição
    await pagamentos.save(); // Salva o pagamento no banco de dados
    res.status(201).json(pagamentos); // Retorna o pagamento salvo com status 201 (Criado)
} catch (err) {
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
   
}
});

router.delete('/:id', async(req , res) => {
  try{
    const id = req.params.id;
    const pagamentos = await Pagamentos.findByIdAndDelete(id)
    res.sendStatus(204);
  }catch(err){
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // Atualiza o pagamento com os dados do corpo da requisição
    const pagamentos = await Pagamentos.findByIdAndUpdate(id,req.body,
      { new: true } // Retorna o documento atualizado
    );
    res.status(200).json(pagamentos); // Retorna o pagamento atualizado
  } catch (err) {
    res.status(400).json({ message: err.message }); // Retorna o erro em caso de falha
  }
});

router.get('/',(req, res)=>{
  logAction('GET Todos os Pagamentos', {});
  res.send('Pagamentos!!');
});




module.exports = router;