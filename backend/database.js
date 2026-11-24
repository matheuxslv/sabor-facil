// banco SQLite usando o módulo que já vem no Node (node:sqlite)
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const receitasIniciais = require('./dados-iniciais');

const db = new DatabaseSync(path.join(__dirname, 'receitas.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS receitas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    categoria TEXT NOT NULL CHECK (categoria IN ('doce', 'salgado', 'bebida')),
    ingredientes TEXT NOT NULL,
    modo_preparo TEXT NOT NULL,
    tempo_preparo INTEGER NOT NULL,
    porcoes INTEGER NOT NULL,
    autor TEXT,
    status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovada')),
    criado_em TEXT DEFAULT (datetime('now', 'localtime'))
  )
`);

// se a tabela estiver vazia, coloca algumas receitas de exemplo
const { total } = db.prepare('SELECT COUNT(*) AS total FROM receitas').get();

if (total === 0) {
  const inserir = db.prepare(`
    INSERT INTO receitas (nome, categoria, ingredientes, modo_preparo, tempo_preparo, porcoes, autor, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const r of receitasIniciais) {
    inserir.run(
      r.nome,
      r.categoria,
      JSON.stringify(r.ingredientes),
      r.modoPreparo,
      r.tempoPreparo,
      r.porcoes,
      r.autor,
      r.status
    );
  }

  console.log('Banco criado com as receitas de exemplo.');
}

module.exports = db;
