import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();

/* ===========================
   CONFIGURAÇÃO DO MULTER
=========================== */

// Onde e como o arquivo será salvo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

// Validação do tipo de arquivo
function fileFilter(req, file, cb) {
  const tiposPermitidos = [
    "image/png",
    "image/jpeg",
    "application/pdf",
  ];

  if (!tiposPermitidos.includes(file.mimetype)) {
    return cb(
      new Error("Tipo de arquivo não permitido. Envie PNG, JPG ou PDF."),
      false
    );
  }

  cb(null, true);
}

// Instância do multer
const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter,
});

/* ===========================
   CONTEXTO 1 – UPLOAD SIMPLES
=========================== */
// Exemplo: upload de currículo, documento, imagem única

router.post("/upload", upload.single("arquivo"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Nenhum arquivo foi enviado",
      });
    }

    return res.json({
      mensagem: "Upload realizado com sucesso",
      arquivo: req.file.filename,
      tipo: req.file.mimetype,
      tamanho: req.file.size,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Erro no upload do arquivo",
    });
  }
});

/* ===========================
   CONTEXTO 2 – UPLOAD DE LOGO
=========================== */
// Exemplo: upload da logo da empresa (imagem)

router.post("/upload/logo", upload.single("logo"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "Logo não enviada",
      });
    }

    return res.json({
      mensagem: "Logo enviada com sucesso",
      logo: req.file.filename,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Erro ao enviar logo",
    });
  }
});

/* ===========================
   TRATAMENTO DE ERROS DO MULTER
=========================== */
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      error: err.message,
    });
  }

  next();
});

export default router;
