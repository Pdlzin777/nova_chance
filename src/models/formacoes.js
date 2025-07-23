import Database from '../database/database.js';

async function create({ nome }) {
  if (!nome) {
    throw new Error('Nome da formação é obrigatório');
  }

  const db = await Database.connect();

  await db.run(`INSERT INTO Formacoes (nome) VALUES (?)`, [nome]);

  return { nome };
}

async function read() {
  const db = await Database.connect();
  return await db.all('SELECT * FROM Formacoes');
}

export default { create, read };
