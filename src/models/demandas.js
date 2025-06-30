import Database from '../database/database.js';

async function create({ cargo, valor }) {
  if (!cargo || !valor) {
    throw new Error('Cargo e valor são obrigatórios');
  }

  const db = await Database.connect();
 

  await db.run(
    'INSERT INTO Demandas ( cargo , valor) VALUES (?, ?)',
    [ cargo, valor]
  );

  return {  cargo, valor };
}

async function read(field, valor) {
  const db = await Database.connect();

  if (field && valor) {
    const query = `SELECT * FROM Demandas WHERE LOWER(${field}) LIKE ?`;
    const results = await db.all(query, [`%${valor.toLowerCase()}%`]);
    return results;
  }

  return await db.all('SELECT * FROM Demandas');
}

async function readById(cargo) {
  const db = await Database.connect();
  const item = await db.get('SELECT * FROM Demandas WHERE cargo = ?', [cargo]);

  if (!item) {
    throw new Error('Demandas não encontrada');
  }

  return item;
}

async function update({ cargo, valor }) {
  const db = await Database.connect();

  const existing = await db.get('SELECT * FROM Demandas WHERE cargo = ?', [cargo]);
  if (!existing) {
    throw new Error('Demandas não encontrada');
  }

  await db.run(
    'UPDATE Demandas SET cargo = ?, valor = ? ',
    [cargo, valor]
  );

  return { cargo, valor };
}

async function remove(cargo) {
  const db = await Database.connect();
  const result = await db.run('DELETE FROM Demandas WHERE cargo = ?', [cargo]);
  return result.changes > 0;
}

export default { create, read, readById, update, remove };
