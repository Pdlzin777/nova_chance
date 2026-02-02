import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { enviarEmail } from "../utils/email.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/empresas", async (req, res) => {
  try {
    const empresa = await prisma.empresa.create({
      data: req.body,
    });

    await enviarEmail({
      para: empresa.email,
      assunto: "Cadastro realizado com sucesso",
      html: `<h2>Olá, ${empresa.nome}</h2>
             <p>Sua empresa foi cadastrada com sucesso no sistema.</p>`,
    });

    res.status(201).json(empresa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao cadastrar empresa" });
  }
});

export default router;
