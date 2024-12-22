const express = require('express');
const router = express.Router();

//para fazer um log no terminal quando uma requisição for feita
const logAction = (action, data) => {
    const now = new Date();
    const log = `[${now.toISOString()}] Ação: ${action} | Dados: ${JSON.stringify(data)}\n`;
    console.log(log);
};



router.get('/',(req,res)=>{
    logAction('GET Todos os pedidos', {});
    res.send('pedidos');
});

module.exports = router;