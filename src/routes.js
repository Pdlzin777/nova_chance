import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

// ======================
// Middleware de autenticação
// ======================
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  jwt.verify(token, process.env.JWT_SECRET || "chave_super_secreta", (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido ou expirado" });
    req.user = user;
    next();
  });
}

// ======================
// Rota de login
// ======================
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const empresa = await prisma.empresa.findUnique({ where: { email } });

    if (!empresa) return res.status(401).json({ error: "Email ou senha inválidos" });

    const senhaValida = await bcrypt.compare(senha, empresa.senha);
    if (!senhaValida) return res.status(401).json({ error: "Email ou senha inválidos" });

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
// Rota de perfil (protegida por JWT)
// ======================
router.get("/perfil", autenticarToken, async (req, res) => {
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
// Rotas de demandas (CRUD básico)
// ======================
router.get("/demandas", async (req, res) => {
  try {
    const demandas = await prisma.demanda.findMany();
    res.json(demandas);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar demandas" });
  }
});

router.post("/demandas", autenticarToken, async (req, res) => {
  try {
    const nova = await prisma.demanda.create({ data: req.body });
    res.status(201).json(nova);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar demanda" });
  }
});

router.put("/demandas/:id", autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const atualizada = await prisma.demanda.update({
      where: { id: Number(id) },
      data: req.body
    });
    res.json(atualizada);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar demanda" });
  }
});

router.delete("/demandas/:id", autenticarToken, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.demanda.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir demanda" });
  }
  });

  import { demandaSchema } from "./validators/demandaValidator.js";

// rota POST /demandas
router.post("/demandas", autenticarToken, async (req, res) => {
  try {
    const dadosValidados = demandaSchema.parse(req.body); // ✅ Validação com Zod
    const nova = await prisma.demanda.create({ data: dadosValidados });
    res.status(201).json(nova);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        error: "Erro de validação",
        detalhes: err.errors.map(e => e.message)
      });
    }
    res.status(500).json({ error: "Erro ao criar demanda" });
  }
});



export default router;
