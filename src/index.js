import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes.js';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import { gerarToken } from "./utils/jwt.js";

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
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// rota de login
server.post("/logins", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // procura empresa no banco
    const empresa = await prisma.empresa.findUnique({ where: { email } });
    if (!empresa) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // compara a senha
    const senhaValida = await bcrypt.compare(senha, empresa.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    // gera token JWT
    const token = jwt.sign(
      { id: empresa.id, email: empresa.email }, // payload
      process.env.JWT_SECRET || "chave_super_secreta", // chave
      { expiresIn: "2h" } // expira em 2h
    );

    return res.json({ token });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Start do servidor
server.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
