import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

// ======================
// Middlewares globais
// ======================
server.use(morgan("tiny"));
server.use(cors());
server.use(express.json());

// ======================
// Arquivos estáticos
// ======================
server.use(express.static(path.join(__dirname, "../public")));
server.use("/html", express.static(path.join(__dirname, "../public/html")));

// ======================
// Rotas da API
// ======================
server.use("/api", router);

// ======================
// Página inicial
// ======================
server.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../public/html/pagina_de_criar_conta.html")
  );
});

// ======================
// Inicialização
// ======================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
