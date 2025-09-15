const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes); // todas as rotas

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
