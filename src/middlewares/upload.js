import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

function fileFilter(req, file, cb) {
  const tiposPermitidos = ["image/png", "image/jpeg", "application/pdf"];

  if (!tiposPermitidos.includes(file.mimetype)) {
    return cb(new Error("Tipo de arquivo não permitido"), false);
  }

  cb(null, true);
}

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter,
});
