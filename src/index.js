import express from 'express';

const app = express();

// Middleware para entender JSON
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota raiz
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rota para listar trabalhos
app.get('/demandas', (req, res) => {
  return res.json(Demandas);
});

// --------------------
// Login de Usuário
// --------------------

// GET para ver todos (teste)
app.get('/usuarios', (req, res) => {
  return res.json( Usuarios);
});


// POST para autenticar
app.post('/auth', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
  }

  const usuario = logins.find(user => user.email === email && user.senha === senha);

  if (usuario) {
    return res.status(200).json({ mensagem: "Login de usuário bem-sucedido" });
  } else {
    return res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
});

// --------------------
// Login de Empresa
// --------------------

// GET para ver todos (teste)
app.get('/logins_empresa', (req, res) => {
  return res.json(logins_empresas);
});

// POST para autenticar
app.post('/logins_empresa', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Conta e senha são obrigatórias." });
  }

  const empresa = logins_empresas.find(emp => emp.email === email && emp.senha === senha);

  if (empresa) {
    return res.status(200).json({ mensagem: "Login de empresa bem-sucedido" });
  } else {
    return res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
});
// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log('App running on port 3000');
});
