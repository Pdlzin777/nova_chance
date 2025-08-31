import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Rota GET - Listar demandas
app.get("/demandas", async (req, res) => {
  try {
    const demandas = await prisma.demandas.findMany();
    res.json(demandas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar demandas" });
  }
});

// Rota POST - Criar demanda
app.post("/demandas", async (req, res) => {
  try {
    const { cargo, valor, descricao, formacao_id, usuario_id, data_criacao, status, data_conclusao } = req.body;

    const nova = await prisma.demandas.create({
      data: {
        cargo,
        valor: Number(valor),
        descricao,
        formacao_id,
        usuario_id,
        data_criacao: new Date(data_criacao),
        status,
        data_conclusao: data_conclusao ? new Date(data_conclusao) : null
      }
    });

    res.json(nova);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar demanda" });
  }
});

// Subir servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
