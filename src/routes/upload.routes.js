import { Router } from "express";
import prisma from "../prisma/client.js";
import { upload } from "../middlewares/upload.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

/* =========================
   UPLOAD SIMPLES
========================= */
router.post("/upload", upload.single("arquivo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Arquivo não enviado" });
  }

  return res.json({
    message: "Upload realizado com sucesso",
    arquivo: req.file.filename
  });
});

/* =========================
   UPLOAD DE CURRÍCULO (JWT)
========================= */
router.post(
  "/upload/curriculo",
  authenticate,
  upload.single("curriculo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Currículo não enviado" });
      }

      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          curriculo: req.file.filename
        }
      });

      return res.json({
        message: "Currículo enviado com sucesso"
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro no upload" });
    }
  }
);

export default router;
