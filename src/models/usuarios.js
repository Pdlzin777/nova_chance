import Database from '../database/database.js';

async function create({ nome, email, senha }) {
  if (!nome || !email || !senha) {
    throw new Error('Todos os campos são obrigatórios');
  }

  const db = await Database.connect();

  await db.run(
    `INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)`,
    [nome, email, senha]
  );

  return { nome, email };
}

async function read() {
  const db = await Database.connect();
  return await db.all('SELECT * FROM Usuarios');
}

export default { create, read };
