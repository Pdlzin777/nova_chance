import Database from './database.js';

async function up() {
  const db = await Database.connect();

  const usuariossql = `
    CREATE TABLE IF NOT EXISTS Usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL,
      data_cadastro DATE DEFAULT CURRENT_DATE
    );
  `;

  const formacoessql = `
    CREATE TABLE IF NOT EXISTS Formacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome VARCHAR(255) NOT NULL
    );
  `;

  const usuariosformacoessql = `
    CREATE TABLE IF NOT EXISTS UsuariosFormacoes (
      usuario_id INTEGER NOT NULL,
      formacao_id INTEGER NOT NULL,
      PRIMARY KEY (usuario_id, formacao_id),
      FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
      FOREIGN KEY (formacao_id) REFERENCES Formacoes(id)
    );
  `;

  const demandassql = `
    CREATE TABLE IF NOT EXISTS demandas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cargo VARCHAR(100) NOT NULL,
      valor VARCHAR(100) NOT NULL,
      descricao TEXT,
      formacao_id INTEGER NOT NULL,
      data_criacao DATE DEFAULT CURRENT_DATE,
      data_conclusao DATE,
      status VARCHAR(50) DEFAULT 'Pendente',
      usuario_id INTEGER NOT NULL,
      FOREIGN KEY (formacao_id) REFERENCES Formacoes(id),
      FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
    );
  `;

  const avaliacoessql = `
    CREATE TABLE IF NOT EXISTS Avaliacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      demanda_id INTEGER NOT NULL,
      usuario_avaliador_id INTEGER NOT NULL,
      usuario_avaliado_id INTEGER NOT NULL,
      pontuacao INTEGER CHECK (pontuacao BETWEEN 1 AND 5),
      comentario TEXT,
      data_avaliacao DATE DEFAULT CURRENT_DATE,
      FOREIGN KEY (demanda_id) REFERENCES Demandas(id),
      FOREIGN KEY (usuario_avaliador_id) REFERENCES Usuarios(id),
      FOREIGN KEY (usuario_avaliado_id) REFERENCES Usuarios(id)
    );
  `;

  await db.run(usuariossql);
  await db.run(formacoessql);
  await db.run(usuariosformacoessql);
  await db.run(demandassql);
  await db.run(avaliacoessql);

  console.log("Tabelas criadas com sucesso.");
}

export default { up };
