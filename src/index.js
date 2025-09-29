import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const prisma = new PrismaClient();

// ======================
// Middlewares
// ======================
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

// Serve arquivos estáticos da pasta 'public'
server.use(express.static(path.join(__dirname, 'public')));

// ======================
// 🔐 Middleware de autenticação
// ======================
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // formato: Bearer token

  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  jwt.verify(token, process.env.JWT_SECRET || "chave_super_secreta", (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido ou expirado" });

    req.user = user; // payload do token
    next();
  });
}

// ======================
// 🔑 Rota de Login
// ======================
server.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const empresa = await prisma.empresa.findUnique({ where: { email } });
    if (!empresa) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, empresa.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: empresa.id, email: empresa.email },
      process.env.JWT_SECRET || "chave_super_secreta",
      { expiresIn: "2h" }
    );

    return res.json({ token });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// ======================
// 🔒 Rota protegida de exemplo
// ======================
server.get("/perfil", autenticarToken, async (req, res) => {
  try {
    const empresa = await prisma.empresa.findUnique({
      where: { id: req.user.id },
      select: { id: true, nome: true, email: true, cnpj: true, telefone: true, redeSocial: true }
    });

    res.json(empresa);
  } catch (err) {
    console.error("Erro ao buscar perfil:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// ======================
// 🚪 Rota raiz
// ======================
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '../../public/html/pagina_de_criar_conta.html'));
});

// ======================
// Start do servidor
// ======================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
