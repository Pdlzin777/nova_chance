import { verificarToken } from "../utils/jwt.js";

export function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const partes = authHeader.split(" ");

  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({ error: "Formato do token inválido" });
  }

  const token = partes[1];
  const payload = verificarToken(token);

  if (!payload) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }

  req.user = payload;
  next();
}
