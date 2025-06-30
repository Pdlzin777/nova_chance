import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Demanda from '../models/demandas.js';
import demandas from '../models/demandas.js';
 
async function up() {
  const file = resolve('src', 'database', 'seeders.json');
 
  const seed = JSON.parse(readFileSync(file));
 
  for (const Demandas of seed.Demandas) {
    await Demanda.create(Demandas);
  }
}
 
export default { up };
 
 