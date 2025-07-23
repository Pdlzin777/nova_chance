import Database from '../database/database.js';

async function create({ cargo, valor, descricao, formacao_id, data_criacao, data_conclusao, status, usuario_id }) {
  if (!cargo || !valor || !formacao_id || !usuario_id) {
    throw new Error('Campos obrigatórios: cargo, valor, formacao_id e usuario_id');
  }

  const db = await Database.connect();

  await db.run(
    `INSERT INTO Demandas 
    (cargo, valor, descricao, formacao_id, data_criacao, data_conclusao, status, usuario_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      cargo,
      valor,
      descricao || '',
      formacao_id,
      data_criacao || null,
      data_conclusao || null,
      status || 'Pendente',
      usuario_id
    ]
  );

  return { cargo, valor, descricao, formacao_id, data_criacao, data_conclusao, status, usuario_id };
}

async function read(field, valor) {
  const db = await Database.connect();

  if (field && valor) {
    const query = `SELECT * FROM Demandas WHERE LOWER(${field}) LIKE ?`;
    return await db.all(query, [`%${valor.toLowerCase()}%`]);
  }

  return await db.all('SELECT * FROM Demandas');
}

async function readById(id) {
  const db = await Database.connect();
  const item = await db.get('SELECT * FROM Demandas WHERE id = ?', [id]);

  if (!item) {
    throw new Error('Demanda não encontrada');
  }

  return item;
}

async function update({ id, cargo, valor, descricao, formacao_id, data_criacao, data_conclusao, status, usuario_id }) {
  const db = await Database.connect();

  const existing = await db.get('SELECT * FROM Demandas WHERE id = ?', [id]);
  if (!existing) {
    throw new Error('Demanda não encontrada');
  }

  await db.run(
    `UPDATE Demandas SET 
      cargo = ?, valor = ?, descricao = ?, formacao_id = ?, 
      data_criacao = ?, data_conclusao = ?, status = ?, usuario_id = ?
    WHERE id = ?`,
    [
      cargo,
      valor,
      descricao || '',
      formacao_id,
      data_criacao || null,
      data_conclusao || null,
      status || 'Pendente',
      usuario_id,
      id
    ]
  );

  return { id, cargo, valor, descricao, formacao_id, data_criacao, data_conclusao, status, usuario_id };
}

async function remove(id) {
  const db = await Database.connect();
  const result = await db.run('DELETE FROM Demandas WHERE id = ?', [id]);
  return result.changes > 0;
}

export default { create, read, readById, update, remove };
