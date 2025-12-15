import { Router } from "express";
import prisma from "../prisma/client.js";
import jwt from "jsonwebtoken";
import { sendTransactionalEmail } from "../services/mailService.js";

const router = Router();

/* =========================
   CADASTRO DE USUÁRIO
========================= */
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const user = await prisma.user.create({
      data: { nome, email, senha }
    });

    await sendTransactionalEmail(
      email,
      "Cadastro realizado com sucesso",
      `Olá ${nome}, seu cadastro no Nova Chance foi realizado com sucesso.`
    );

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

/* =========================
   RECUPERAÇÃO DE SENHA
========================= */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    await sendTransactionalEmail(
      email,
      "Recuperação de senha",
      `Utilize este token para redefinir sua senha: ${token}`
    );

    return res.json({ message: "E-mail de recuperação enviado" });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
});

export default router;
