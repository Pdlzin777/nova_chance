let logins = [];

async function load() {
  const response = await fetch('/logins');
  logins = await response.json();
  renderizarlogins();
}


// Rota para adicionar login
app.post('/logins', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
  }

  // Armazena o login (sem segurança, apenas exemplo)
  logins.push({ email, senha });

  return res.status(201).json({ mensagem: 'Login registrado com sucesso.' });
});

// Rota para listar todos os logins (teste)
app.get('/logins', (req, res) => {
  return res.json(logins);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  load();
});

    

