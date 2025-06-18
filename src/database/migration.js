import Database from './database.js';
 
async function up() {
  const db = await Database.connect();
 
  const contasSql = `
    CREATE TABLE contas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(50) NOT NULL,
      senha INTEGER NOT NULL
    )
  `;
 
  await db.run(contasSql);
}
 
export default { up };
 