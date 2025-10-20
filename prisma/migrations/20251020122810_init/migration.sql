-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_avaliacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "demanda_id" INTEGER NOT NULL,
    "usuario_avaliador_id" INTEGER NOT NULL,
    "usuario_avaliado_id" INTEGER NOT NULL,
    "pontuacao" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    CONSTRAINT "avaliacao_demanda_id_fkey" FOREIGN KEY ("demanda_id") REFERENCES "demanda" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "avaliacao_usuario_avaliado_id_fkey" FOREIGN KEY ("usuario_avaliado_id") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_avaliacao" ("comentario", "demanda_id", "id", "pontuacao", "usuario_avaliado_id", "usuario_avaliador_id") SELECT "comentario", "demanda_id", "id", "pontuacao", "usuario_avaliado_id", "usuario_avaliador_id" FROM "avaliacao";
DROP TABLE "avaliacao";
ALTER TABLE "new_avaliacao" RENAME TO "avaliacao";
CREATE TABLE "new_demanda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cargo" TEXT NOT NULL,
    "valor" INTEGER NOT NULL DEFAULT 0,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'aberta',
    "usuario_id" INTEGER NOT NULL,
    "formacao_id" INTEGER NOT NULL,
    CONSTRAINT "demanda_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "demanda_formacao_id_fkey" FOREIGN KEY ("formacao_id") REFERENCES "formacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_demanda" ("cargo", "descricao", "formacao_id", "id", "status", "usuario_id", "valor") SELECT "cargo", "descricao", "formacao_id", "id", "status", "usuario_id", "valor" FROM "demanda";
DROP TABLE "demanda";
ALTER TABLE "new_demanda" RENAME TO "demanda";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
