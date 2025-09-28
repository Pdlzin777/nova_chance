const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Usuários
  await prisma.usuario.createMany({
    data: [
      { nome: "Pedro Lucas", email: "pedro@example.com", senha: "123456" },
      { nome: "Maria Souza", email: "maria@example.com", senha: "123456" },
      { nome: "João Silva", email: "joao@example.com", senha: "123456" }
    ]
  });

   await prisma.empresa.createMany({
    data: [
      { nome: "Soservi", email: "Soservi@example.com", senha: "123456",cnpj:"1111111111",telefone:"83900002345",redeSocial:"@soservi"},
      { nome: "Carajas", email: "Carajas@example.com", senha: "123456",cnpj:"22222222222",telefone:"83911112222",redeSocial:"@carajas" },
      { nome: "Kairos Segurança", email: "Kairos@example.com", senha: "123456",cnpj:"3333333333",telefone:"83999998888",redeSocial:"@kairos"}
    ]
  });

  // Formações
  await prisma.formacao.createMany({
    data: [
      { nome: "Desenvolvedor Web" },
      { nome: "Designer Gráfico" },
      { nome: "Garçom" }
    ]
  });

  // UsuáriosFormações
  await prisma.usuariosformacoes.createMany({
    data: [
      { usuario_id: 1, formacao_id: 1 },
      { usuario_id: 2, formacao_id: 2 },
      { usuario_id: 3, formacao_id: 3 }
    ]
  });

  // Demandas
  await prisma.demanda.createMany({
    data: [
      { cargo: "Garçom", valor: 100, descricao: "Trabalho em evento", formacao_id: 3, usuario_id: 1, status: "Pendente" },
      { cargo: "Designer Gráfico", valor: 500, descricao: "Criação de logotipo", formacao_id: 2, usuario_id: 2, status: "Concluído" },
      { cargo: "Programador", valor: 1000, descricao: "Sistema web", formacao_id: 1, usuario_id: 3, status: "Em andamento" }
    ]
  });

  // Avaliações
  await prisma.avaliacao.createMany({
    data: [
      { demanda_id: 1, usuario_avaliador_id: 2, usuario_avaliado_id: 1, pontuacao: 5, comentario: "Excelente trabalho!" },
      { demanda_id: 2, usuario_avaliador_id: 3, usuario_avaliado_id: 2, pontuacao: 4, comentario: "Bom serviço" }
    ]
  });

  console.log("✅ Seed concluído!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
