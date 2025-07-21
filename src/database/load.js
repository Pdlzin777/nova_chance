import Migration from './migration.js';
import Seed from './seeders.js';

async function load() {
  try {
    console.log('Iniciando migrações...');
    await Migration.up();
    console.log('Migrações concluídas.');

    console.log('Executando seed...');
    await Seed.up();
    console.log('Seed concluído.');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1);
  }
}

load();

