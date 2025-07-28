generator client {
  provider = "prisma-client-js"
}
 
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

PRAGMA foreign_keys=off;
DROP TABLE "Investment";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "formacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "usuariosformacoes" (
    "usuario_id" INTEGER NOT NULL,
    "formacao_id" INTEGER NOT NULL,

    PRIMARY KEY ("usuario_id", "formacao_id"),
    CONSTRAINT "usuariosformacoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "usuariosformacoes_formacao_id_fkey" FOREIGN KEY ("formacao_id") REFERENCES "formacoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "demandas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cargo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "descricao" TEXT,
    "formacao_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "status" TEXT,
    CONSTRAINT "demandas_formacao_id_fkey" FOREIGN KEY ("formacao_id") REFERENCES "formacoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "demandas_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "avaliacoes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "demanda_id" INTEGER NOT NULL,
    "usuario_avaliador_id" INTEGER NOT NULL,
    "usuario_avaliado_id" INTEGER NOT NULL,
    "pontuacao" INTEGER,
    "comentario" TEXT,
    CONSTRAINT "avaliacoes_demanda_id_fkey" FOREIGN KEY ("demanda_id") REFERENCES "demandas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "avaliacoes_usuario_avaliador_id_fkey" FOREIGN KEY ("usuario_avaliador_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "avaliacoes_usuario_avaliado_id_fkey" FOREIGN KEY ("usuario_avaliado_id") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
