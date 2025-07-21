import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import demanda from '../models/demandas.js';

 
async function up() {
  const file = resolve('src', 'database', 'seeders.json');
 
  const seed = JSON.parse(readFileSync(file));
 
  for (const demandas of seed.demandas) {
    await demanda.create(demandas);
  }
}
 
export default { up };
 
 