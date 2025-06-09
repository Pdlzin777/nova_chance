import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import nova_chance from '../models/nova_chance.js';
 
async function up() {
  const file = resolve('src', 'database', 'seeders.json');
 
  const seed = JSON.parse(readFileSync(file));
 
  for (const trabalhos of seed.nova_chance.js) {
    await nova_chance.create(nova_chance);
  }
}
 
export default { up };
 
 