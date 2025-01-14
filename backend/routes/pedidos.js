const express = require('express');
const router = express.Router();

const Pedidos = require('../models/pedidos');




router.get('/:id', async (req, res) => {
    try {
      const pedidos = await Pedidos.find({idUsuario: req.params.id}); 
      if (!pedidos.length) {
        return res.status(404).json({ message: 'pedidos não encontrado' }); // Se não encontrar, retorna 404
      }
      res.status(200).json(pedidos); // Retorna o pedido encontrado
    } catch (err) {
        res.status(400).json({ message: err.message, details: err });
    }
  });

router.post('/', async (req, res) => {
try {
    const pedidos = new Pedidos(req.body); // Cria um novo pedido com os dados do corpo da requisição
    await pedidos.save();
    res.status(201).json(pedidos);
} catch (err) {
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
   
}
});



module.exports = router;