import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { autenticar } from "./middleware/auth.js";
import { demandaSchema } from "./validators/demandaValidator.js";

const router = Router();
const prisma = new PrismaClient();

// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const empresa = await prisma.empresa.findUnique({
      where: { email },
    });

    if (!empresa) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, empresa.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: empresa.id, email: empresa.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// ======================
// PERFIL (PROTEGIDO)
// ======================
router.get("/perfil", autenticar, async (req, res) => {
  try {
    const empresa = await prisma.empresa.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nome: true,
        email: true,
        cnpj: true,
        telefone: true,
        redeSocial: true,
      },
    });

    if (!empresa) {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }

    res.json(empresa);
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// ======================
// DEMANDAS
// ======================

// LISTAR (PROTEGIDO)
router.get("/demandas", autenticar, async (req, res) => {
  try {
    const demandas = await prisma.demanda.findMany();
    res.json(demandas);
  } catch (error) {
    console.error("Erro ao listar demandas:", error);
    res.status(500).json({ error: "Erro ao listar demandas" });
  }
});

// CRIAR (PROTEGIDO + VALIDAÇÃO)
router.post("/demandas", autenticar, async (req, res) => {
  try {
    const dadosValidados = demandaSchema.parse(req.body);

    const nova = await prisma.demanda.create({
      data: {
        ...dadosValidados,
        empresaId: req.user.id, // 🔐 vínculo com a empresa logada
      },
    });

    res.status(201).json(nova);
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Erro de validação",
        detalhes: error.errors.map((e) => e.message),
      });
    }

    console.error("Erro ao criar demanda:", error);
    res.status(500).json({ error: "Erro ao criar demanda" });
  }
});

// ATUALIZAR (PROTEGIDO)
router.put("/demandas/:id", autenticar, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const atualizada = await prisma.demanda.update({
      where: { id },
      data: req.body,
    });

    res.json(atualizada);
  } catch (error) {
    console.error("Erro ao atualizar demanda:", error);
    res.status(500).json({ error: "Erro ao atualizar demanda" });
  }
});

// DELETAR (PROTEGIDO)
router.delete("/demandas/:id", autenticar, async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.demanda.delete({
      where: { id },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao excluir demanda:", error);
    res.status(500).json({ error: "Erro ao excluir demanda" });
  }
});

export default router;
