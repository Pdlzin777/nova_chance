import multer from "multer";

export const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Arquivo inválido"));
    }
    cb(null, true);
  },
  storage: multer.diskStorage({
    destination: "uploads/",
    filename(req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    }
  })
});
