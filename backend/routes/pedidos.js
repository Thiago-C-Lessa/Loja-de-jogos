const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Pedidos = require('../models/pedidos');

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


router.get('/:id', autenticaToken, async (req, res) => {
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

router.post('/', autenticaToken, async (req, res) => {
try {
    const pedidos = new Pedidos(req.body); // Cria um novo pedido com os dados do corpo da requisição
    await pedidos.save();
    res.status(201).json(pedidos);
} catch (err) {
    res.status(400).json({ message: err.message }); // Em caso de erro, retorna o erro
   
}
});



module.exports = router;