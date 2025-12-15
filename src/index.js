import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(authRoutes);
app.use(uploadRoutes);

app.get("/", (req, res) => {
  res.send("API Nova Chance funcionando");
});

app.listen(3333, () => {
  console.log("Servidor rodando na porta 3333");
});
