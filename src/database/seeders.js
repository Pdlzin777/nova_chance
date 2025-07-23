import { resolve } from 'path';
import { readFileSync } from 'fs';
import Database from './database.js';

const file = resolve('src', 'database', 'seeders.json');
const seed = JSON.parse(readFileSync(file));

async function up() {
  const db = await Database.connect();

  console.log('Seeding: Usuarios...');
  for (const usuario of seed.usuarios) {
    await db.run(
      `INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)`,
      [usuario.nome, usuario.email, usuario.senha]
    );
  }

  console.log('Seeding: Formacoes...');
  for (const formacao of seed.formacoes) {
    await db.run(`INSERT INTO Formacoes (nome) VALUES (?)`, [formacao.nome]);
  }

  console.log('Seeding: UsuariosFormacoes...');
  for (const uf of seed.usuarios_formacoes) {
    await db.run(
      `INSERT INTO UsuariosFormacoes (usuario_id, formacao_id) VALUES (?, ?)`,
      [uf.usuario_id, uf.formacao_id]
    );
  }

  console.log('Seeding: Demandas...');
  for (const d of seed.demandas) {
    await db.run(
      `INSERT INTO Demandas 
        (cargo, valor, descricao, formacao_id, data_criacao, data_conclusao, status, usuario_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        d.cargo,
        d.valor,
        d.descricao,
        d.formacao_id,
        d.data_criacao || null,
        d.data_conclusao || null,
        d.status || 'pendente',
        d.usuario_id
      ]
    );
  }

  console.log('Seeding: Avaliacoes...');
  for (const a of seed.avaliacoes) {
    await db.run(
      `INSERT INTO Avaliacoes 
        (demanda_id, usuario_avaliador_id, usuario_avaliado_id, pontuacao, comentario, data_avaliacao)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        a.demanda_id,
        a.usuario_avaliador_id,
        a.usuario_avaliado_id,
        a.pontuacao,
        a.comentario,
        a.data_avaliacao
      ]
    );
  }

  console.log(' Seed concluído com sucesso.');
}

export default { up };
