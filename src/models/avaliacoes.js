import Database from '../database/database.js';

async function create({
  demanda_id,
  usuario_avaliador_id,
  usuario_avaliado_id,
  pontuacao,
  comentario,
  data_avaliacao
}) {
  if (!demanda_id || !usuario_avaliador_id || !usuario_avaliado_id || pontuacao === undefined) {
    throw new Error('Campos obrigatórios estão ausentes');
  }

  const db = await Database.connect();

  await db.run(
    `INSERT INTO Avaliacoes 
      (demanda_id, usuario_avaliador_id, usuario_avaliado_id, pontuacao, comentario, data_avaliacao)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      demanda_id,
      usuario_avaliador_id,
      usuario_avaliado_id,
      pontuacao,
      comentario || '',
      data_avaliacao || null
    ]
  );

  return {
    demanda_id,
    usuario_avaliador_id,
    usuario_avaliado_id,
    pontuacao,
    comentario,
    data_avaliacao
  };
}

async function read() {
  const db = await Database.connect();
  return await db.all('SELECT * FROM Avaliacoes');
}

export default { create, read };
