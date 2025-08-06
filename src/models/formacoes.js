import prisma from '../database/database.js';

async function create({ nome }) {
  if (!nome) {
    throw new Error('Nome da formação é obrigatório');
  }

  const createdFormacao = await prisma.formacoes.create({
    data: { nome },
  });

  return createdFormacao;
}

async function read(where) {
  // Se quiser permitir filtragem por nome opcional
  if (where?.nome) {
    where.nome = {
      contains: where.nome,
    };
  }

  const formacoes = await prisma.formacoes.findMany({ where });

  if (formacoes.length === 1 && where) {
    return formacoes[0];
  }

  return formacoes;
}

export default { create, read };

