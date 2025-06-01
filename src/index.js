import express from 'express';
import { trabalhos } from './data/index.js';
import { logins } from './data/logins.js';
import { logins_empresas } from './data/logins_empresa.js';

const app = express();

// Permite que o servidor entenda JSON no corpo da requisição
app.use(express.json());

// Permite servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota raiz
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rota para listar trabalhos
app.get('/trabalhos', (req, res) => {
  return res.json(trabalhos);
});

// Rota GET para logins (opcional — útil para testes)
app.get('/logins', (req, res) => {
  return res.json(logins);
});

// Rota POST para login (validação de email e senha)
app.post('/logins', (req, res) => {
  const { email, senha } = req.body;

  const usuario = logins.find(user => user.email === email && user.senha === senha);

  if (usuario) {
    res.status(200).json({ mensagem: "Login bem-sucedido" });
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
});

app.get(express.json());



  app.get('/logins_empresa', (req, res) => {
  return res.json(logins_empresas);
});

// Rota POST para login (validação de email e senha)
app.post('/logins_empresa', (req, res) => {
  const { conta, senha } = req.body;

  const usuario = logins.find(user => user.conta === conta && user.senha === senha);

  if (usuario) {
    res.status(200).json({ mensagem: "Login bem-sucedido" });
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
});

app.get(express.json());

({


})

// Inicia o servidor
app.listen(3000, () => {
  console.log('App running on port 3000');
});
