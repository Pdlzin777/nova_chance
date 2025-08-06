import prisma from '../database/database.js';

async function create({
  demanda_id,
  usuario_avaliador_id,
  usuario_avaliado_id,
  pontuacao,
  comentario,
  data_avaliacao
}) {
  if (
    !demanda_id ||
    !usuario_avaliador_id ||
    !usuario_avaliado_id ||
    pontuacao === undefined
  ) {
    throw new Error('Campos obrigatórios estão ausentes');
  }

  const created = await prisma.avaliacao.create({
    data: {
      demanda_id,
      usuario_avaliador_id,
      usuario_avaliado_id,
      pontuacao,
      comentario: comentario || '',
      data_avaliacao: data_avaliacao ? new Date(data_avaliacao) : null
    },
  });

  return created;
}

async function read() {
  return await prisma.avaliacao.findMany();
}

export default { create, read };
