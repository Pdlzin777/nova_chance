import prisma from '../database/database.js';

async function create({ nome, email, senha }) {
  if (!nome || !email || !senha) {
    throw new Error('Todos os campos são obrigatórios');
  }

  const createdUsuario = await prisma.usuarios.create({
    data: { nome, email, senha },
  });

  return { nome: createdUsuario.nome, email: createdUsuario.email };
}

async function read(where) {
  // Permitir filtragem opcional por nome ou email
  if (where?.nome) {
    where.nome = {
      contains: where.nome,
    };
  }

  if (where?.email) {
    where.email = {
      contains: where.email,
    };
  }

  const usuarios = await prisma.usuarios.findMany({ where });

  if (usuarios.length === 1 && where) {
    return usuarios[0];
  }

  return usuarios;
}

export default { create, read };
