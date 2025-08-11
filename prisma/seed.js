const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Usuários
  const usuarios = await prisma.usuario.createMany({
    data: [
      { nome: "Pedro Lucas", email: "pedro@example.com", senha: "123456" },
      { nome: "Maria Souza", email: "maria@example.com", senha: "123456" },
      { nome: "João Silva", email: "joao@example.com", senha: "123456" }
    ],
    skipDuplicates: true
  });

  // Formações
  const formacoes = await prisma.formacao.createMany({
    data: [
      { nome: "Desenvolvedor Web" },
      { nome: "Designer Gráfico" },
      { nome: "Garçom" }
    ],
    skipDuplicates: true
  });

  // UsuáriosFormações
  await prisma.usuariosFormacoes.createMany({
    data: [
      { usuario_id: 1, formacao_id: 1 },
      { usuario_id: 2, formacao_id: 2 },
      { usuario_id: 3, formacao_id: 3 }
    ],
    skipDuplicates: true
  });

  // Demandas
  await prisma.demanda.createMany({
    data: [
      { cargo: "Garçom", valor: "100", descricao: "Trabalho em evento", formacao_id: 3, usuario_id: 1, status: "Pendente" },
      { cargo: "Designer Gráfico", valor: "500", descricao: "Criação de logotipo", formacao_id: 2, usuario_id: 2, status: "Concluído" },
      { cargo: "Programador", valor: "1000", descricao: "Sistema web", formacao_id: 1, usuario_id: 3, status: "Em andamento" }
    ],
    skipDuplicates: true
  });

  // Avaliações
  await prisma.avaliacao.createMany({
    data: [
      { demanda_id: 1, usuario_avaliador_id: 2, usuario_avaliado_id: 1, pontuacao: 5, comentario: "Excelente trabalho!" },
      { demanda_id: 2, usuario_avaliador_id: 3, usuario_avaliado_id: 2, pontuacao: 4, comentario: "Bom serviço" }
    ],
    skipDuplicates: true
  });

  console.log("✅ Seed concluído!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
