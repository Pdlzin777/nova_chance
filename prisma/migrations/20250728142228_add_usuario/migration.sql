generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Usuario {
  id       Int     @id @default(autoincrement())
  nome     String
  email    String  @unique
  senha    String
  formacoes UsuariosFormacoes[]
  demandas Demandas[]
  avaliacoesFeitas Avaliacoes[] @relation("Avaliador")
  avaliacoesRecebidas Avaliacoes[] @relation("Avaliado")
}

model Formacoes {
  id    Int    @id @default(autoincrement())
  nome  String
  usuarios UsuariosFormacoes[]
  demandas Demandas[]
}

model UsuariosFormacoes {
  usuario_id Int
  formacao_id Int
  usuario Usuario @relation(fields: [usuario_id], references: [id])
  formacao Formacoes @relation(fields: [formacao_id], references: [id])

  @@id([usuario_id, formacao_id])
}

model Demandas {
  id          Int     @id @default(autoincrement())
  cargo       String
  valor       String
  descricao   String?
  formacao_id Int
  usuario_id  Int
  status      String?
  formacao    Formacoes @relation(fields: [formacao_id], references: [id])
  usuario     Usuario   @relation(fields: [usuario_id], references: [id])
  avaliacoes  Avaliacoes[]
}

model Avaliacoes {
  id                   Int     @id @default(autoincrement())
  demanda_id           Int
  usuario_avaliador_id Int
  usuario_avaliado_id  Int
  pontuacao            Int?
  comentario           String?
  demanda              Demandas @relation(fields: [demanda_id], references: [id])
  avaliador            Usuario  @relation("Avaliador", fields: [usuario_avaliador_id], references: [id])
  avaliado             Usuario  @relation("Avaliado", fields: [usuario_avaliado_id], references: [id])
}
