import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "chave-super-secreta"; // 👈 use variável no .env

export function gerarToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}