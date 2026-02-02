import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/upload/foto", upload.single("foto"), (req, res) => {
  res.json({ file: req.file.filename });
});

router.post("/upload/documento", upload.single("doc"), (req, res) => {
  res.json({ file: req.file.filename });
});

export default router;
