import Database from '../database/database.js';

async function create({ usuario_id, formacao_id }) {
  if (!usuario_id || !formacao_id) {
    throw new Error('usuario_id e formacao_id são obrigatórios');
  }

  const db = await Database.connect();

  await db.run(
    `INSERT INTO UsuariosFormacoes (usuario_id, formacao_id) VALUES (?, ?)`,
    [usuario_id, formacao_id]
  );

  return { usuario_id, formacao_id };
}

async function read() {
  const db = await Database.connect();
  return await db.all('SELECT * FROM UsuariosFormacoes');
}

export default { create, read };
