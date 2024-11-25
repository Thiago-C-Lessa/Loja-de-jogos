const express = require('express');
const fs = require('fs');
const cors = require('cors'); 
const path = require('path');
const app = express();
const port = 5000;

//Evita erro de cors
app.use(cors());

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Função de log simples
const logRequest = (method, url) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${method} request to ${url}`);
}

// (path.join(__dirname, '..', 'public', 'Json', 'jogos.json') equivale a/Loja-de-jogos/public/Json/jogos.json
// path.join() usa o caminho dinamicamente  

// Rota para listar jogos
app.get('/api/jogos', (req, res) => {
    logRequest(req.method, req.url);

    fs.readFile(path.join(__dirname, '..', 'public', 'Json', 'jogos.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de jogos:', err);
            return res.status(500).send('Erro ao carregar jogos');
        }

        console.log('Jogos carregados com sucesso.');
        res.json(JSON.parse(data));
    });
});


// Rota para criar um novo jogo
app.post('/api/jogos', (req, res) => {
    logRequest(req.method, req.url);

    const newGame = req.body;
    fs.readFile(path.join(__dirname, '..', 'public', 'Json', 'jogos.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de jogos:', err);
            return res.status(500).send('Erro ao salvar o novo jogo');
        }

        const games = JSON.parse(data);

        // Encontrar o maior id existente
        const maxId = games.reduce((max, game) => (game.id > max ? game.id : max), 0);
       // maxId = String(Number(maxId) + 1);// transforma em número e Incrementar o id
        newGame.id = String(Number(maxId) + 1); // transforma de volta em string
        games.push(newGame);

        fs.writeFile(path.join(__dirname, '..', 'public', 'Json', 'jogos.json'), JSON.stringify(games, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar o jogo:', err);
                return res.status(500).send('Erro ao salvar o novo jogo');
            }

            console.log(`Novo jogo "${newGame.nome}" criado com sucesso com id ${newGame.id}.`);
            res.status(201).send('Jogo criado');
        });
    });
});

// Rota para atualizar um jogo
app.put('/api/jogos/:id', (req, res) => {
    logRequest(req.method, req.url);

    const { id } = req.params;
    const updatedGame = req.body;

    fs.readFile(path.join(__dirname, '..', 'public', 'Json', 'jogos.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de jogos:', err);
            return res.status(500).send('Erro ao atualizar o jogo');
        }

        const games = JSON.parse(data);
        const index = games.findIndex(game => game.id === id);

        if (index === -1) {
            console.error(`Jogo com id ${id} não encontrado.`);
            return res.status(404).send('Jogo não encontrado');
        }

        games[index] = { ...games[index], ...updatedGame };

        fs.writeFile(path.join(__dirname, '..', 'public', 'Json', 'jogos.json'), JSON.stringify(games, null, 2), (err) => {
            if (err) {
                console.error('Erro ao salvar a atualização:', err);
                return res.status(500).send('Erro ao atualizar o jogo');
            }

            console.log(`Jogo com id ${id} atualizado com sucesso.`);
            res.send('Jogo atualizado');
        });
    });
});

// Rota para deletar um jogo
app.delete('/api/jogos/:id', (req, res) => {
    logRequest(req.method, req.url);

    const { id } = req.params;

    fs.readFile(path.join(__dirname, '..', 'public', 'Json', 'jogos.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de jogos:', err);
            return res.status(500).send('Erro ao deletar o jogo');
        }

        const games = JSON.parse(data);
        const index = games.findIndex(game => game.id === id);


        if (index === -1) {
            console.error(`Jogo com id ${id} não encontrado.`);
            return res.status(404).send('Jogo não encontrado');
        }

        games.splice(index, 1);

        fs.writeFile(path.join(__dirname, '..', 'public', 'Json', 'jogos.json'), JSON.stringify(games, null, 2), (err) => {
            if (err) {
                console.error('Erro ao deletar o jogo:', err);
                return res.status(500).send('Erro ao deletar o jogo');
            }

            console.log(`Jogo com id ${id} deletado com sucesso.`);
            res.send('Jogo deletado');
        });
    });
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`\n\nServidor rodando em http://localhost:${port}`);
});
