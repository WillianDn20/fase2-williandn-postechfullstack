const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes'); //Importa o arquivo de rotas

app.use(express.json());

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'Pong! Servidor online.' });
});

//Avisa ao Express que qualquer requisição que comece com /posts deve usar o postRoutes
app.use('/posts', postRoutes);

module.exports = app;