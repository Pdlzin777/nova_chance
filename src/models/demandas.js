import Database from '../database/database.js';

async function create({ cargo, valor }) {
  if (!cargo || !valor) {
    throw new Error('Cargo e valor são obrigatórios');
  }

  const db = await Database.connect();
 

  await db.run(
    'INSERT INTO demandas ( cargo, valor) VALUES (?, ?)',
    [ cargo, valor]
  );

  return {  cargo, valor };
}

async function read(field, valor) {
  const db = await Database.connect();

  if (field && valor) {
    const query = `SELECT * FROM demandas WHERE LOWER(${field}) LIKE ?`;
    const results = await db.all(query, [`%${valor.toLowerCase()}%`]);
    return results;
  }

  return await db.all('SELECT * FROM demandas');
}

async function readById(id) {
  const db = await Database.connect();
  const item = await db.get('SELECT * FROM Nova_Chance WHERE id = ?', [id]);

  if (!item) {
    throw new Error('Nova_Chance não encontrada');
  }

  return item;
}

async function update({ id, cargo, valor }) {
  const db = await Database.connect();

  const existing = await db.get('SELECT * FROM Nova_Chance WHERE id = ?', [id]);
  if (!existing) {
    throw new Error('Nova_Chance não encontrada');
  }

  await db.run(
    'UPDATE Nova_Chance SET cargo = ?, valor = ? WHERE id = ?',
    [cargo, valor, id]
  );

  return { id, cargo, valor };
}

async function remove(id) {
  const db = await Database.connect();
  const result = await db.run('DELETE FROM Nova_Chance WHERE id = ?', [id]);
  return result.changes > 0;
}

export default { create, read, readById, update, remove };
