--Tabela de Usuários
CREATE TABLE Usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATE DEFAULT CURRENT_DATE
);

-- Tabela de Formações
CREATE TABLE Formacoes (
    formacao_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Tabela de Usuários e Formações (Relacionamento Muitos para Muitos)
CREATE TABLE UsuariosFormacoes (
    usuario_id INT NOT NULL,
    formacao_id INT NOT NULL,
    PRIMARY KEY (usuario_id, formacao_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (formacao_id) REFERENCES Formacoes(formacao_id)
);

-- Tabela de Demandas
CREATE TABLE Demandas (
    demanda_id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    formacao_id INT NOT NULL,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_conclusao DATE,
    status VARCHAR(50) DEFAULT 'Pendente',
    usuario_id INT NOT NULL,
    FOREIGN KEY (formacao_id) REFERENCES Formacoes(formacao_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id)
);

-- Tabela de Avaliações
CREATE TABLE Avaliacoes (
    avaliacao_id SERIAL PRIMARY KEY,
    demanda_id INT NOT NULL,
    usuario_avaliador_id INT NOT NULL,
    usuario_avaliado_id INT NOT NULL,
    pontuacao INT CHECK (pontuacao BETWEEN 1 AND 5),
    comentario TEXT,
    data_avaliacao DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (demanda_id) REFERENCES Demandas(demanda_id),
    FOREIGN KEY (usuario_avaliador_id) REFERENCES Usuarios(usuario_id),
    FOREIGN KEY (usuario_avaliado_id) REFERENCES Usuarios(usuario_id)
);

-- Exemplo de Filtro para Consultar Demandas com Base na Formação e Status
-- Exemplo de consulta:
-- SELECT * FROM Demandas
-- WHERE formacao_id = ? AND status = 'Concluída';
