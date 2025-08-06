import prisma from '../database/database.js';

async function create({ usuario_id, formacao_id }) {
  if (!usuario_id || !formacao_id) {
    throw new Error('usuario_id e formacao_id são obrigatórios');
  }

  const created = await prisma.usuariosFormacoes.create({
    data: {
      usuario_id,
      formacao_id,
    },
  });

  return created;
}

async function read(where) {
  // Permitir filtragem por campos se necessário
  const registros = await prisma.usuariosFormacoes.findMany({ where });

  if (registros.length === 1 && where) {
    return registros[0];
  }

  return registros;
}

export default { create, read };

