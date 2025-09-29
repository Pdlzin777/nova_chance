import { verificarToken } from "../utils/jwt.js";

export function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer token"
  const payload = verificarToken(token);

  if (!payload) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }

  req.user = payload;
  next();
}
