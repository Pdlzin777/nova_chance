import { resolve } from 'node:path';
import { Database } from 'sqlite-async';

const dbFile = resolve('src', 'database', 'db.sqlite');

async function connect() {
  const db = await Database.open(dbFile);
  // console.log(`Conectado ao banco de dados em: ${dbFile}`);
  return db;
}

export default { connect };
