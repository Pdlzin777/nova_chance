import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes.js';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express(); // ✅ Definindo o server
const prisma = new PrismaClient();

// Middlewares
server.use(morgan('tiny'));

server.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
  })
);

server.use(express.json());

server.use(express.static('public'));

// Rotas
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/criar_conta_como_empresa.html'));
});

server.use('/api', router);

server.post('/empresas', async (req, res) => {
  try {
    const { nome, cnpj, telefone, email, redeSocial, senha } = req.body;

    const novaEmpresa = await prisma.empresa.create({
      data: { nome, cnpj, telefone, email, redeSocial, senha },
    });

    res.json(novaEmpresa);
  } catch (err) {
    console.error('Erro ao cadastrar empresa:', err);
    res.status(500).json({ error: 'Erro ao cadastrar empresa' });
  }
});

server.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    res.json({ message: "Login bem-sucedido" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

server.post("/loginempresa", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const empresa = await prisma.empresa.findUnique({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    res.json({ message: "Login bem-sucedido" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});


// Start do servidor
server.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
