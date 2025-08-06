import prisma from '../database/database.js'; // Importa a instância do Prisma

// Criação de nova demanda
async function create({ cargo, valor, descricao, formacao_id, data_criacao, data_conclusao, status, usuario_id }) {
  if (!cargo || !valor || !formacao_id || !usuario_id) {
    throw new Error('Campos obrigatórios: cargo, valor, formacao_id e usuario_id');
  }

  const created = await prisma.demanda.create({
    data: {
      cargo,
      valor,
      descricao: descricao || '',
      formacao_id,
      data_criacao: data_criacao ? new Date(data_criacao) : null,
      data_conclusao: data_conclusao ? new Date(data_conclusao) : null,
      status: status || 'Pendente',
      usuario_id,
    },
  });

  return created;
}

// Leitura de demandas com filtro por campo específico
async function read(field, valor) {
  const where = {};

  if (field && valor) {
    where[field] = {
      contains: valor,
      mode: 'insensitive',
    };
  }

  return await prisma.demanda.findMany({ where });
}

// Leitura de uma demanda por ID
async function readById(id) {
  const demanda = await prisma.demanda.findUnique({
    where: { id: Number(id) },
  });

  if (!demanda) {
    throw new Error('Demanda não encontrada');
  }

  return demanda;
}

// Atualização de demanda existente
async function update({ id, cargo, valor, descricao, formacao_id, data_criacao, data_conclusao, status, usuario_id }) {
  const existing = await prisma.demanda.findUnique({ where: { id } });

  if (!existing) {
    throw new Error('Demanda não encontrada');
  }

  const updated = await prisma.demanda.update({
    where: { id },
    data: {
      cargo,
      valor,
      descricao: descricao || '',
      formacao_id,
      data_criacao: data_criacao ? new Date(data_criacao) : null,
      data_conclusao: data_conclusao ? new Date(data_conclusao) : null,
      status: status || 'Pendente',
      usuario_id,
    },
  });

  return updated;
}

// Remoção de demanda
async function remove(id) {
  await readById(id); // Garante que a demanda existe antes de deletar
  await prisma.demanda.delete({ where: { id } });
  return true;
}

export default { create, read, readById, update, remove };
