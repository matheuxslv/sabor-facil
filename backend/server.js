const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORTA = 3000;
const CATEGORIAS = ['doce', 'salgado', 'bebida'];

app.use(cors());
app.use(express.json());

// passa a linha do banco para o formato que o front usa
function formatarReceita(linha) {
  return {
    id: linha.id,
    nome: linha.nome,
    categoria: linha.categoria,
    ingredientes: JSON.parse(linha.ingredientes),
    modoPreparo: linha.modo_preparo,
    tempoPreparo: linha.tempo_preparo,
    porcoes: linha.porcoes,
    autor: linha.autor,
    status: linha.status,
    criadoEm: linha.criado_em
  };
}

function validarReceita(dados) {
  const erros = [];

  if (typeof dados.nome !== 'string' || dados.nome.trim().length < 3 || dados.nome.trim().length > 80) {
    erros.push('O nome deve ter entre 3 e 80 caracteres.');
  }
  if (!CATEGORIAS.includes(dados.categoria)) {
    erros.push('Categoria inválida. Use doce, salgado ou bebida.');
  }
  if (!Array.isArray(dados.ingredientes) || dados.ingredientes.filter((i) => typeof i === 'string' && i.trim()).length < 2) {
    erros.push('Informe pelo menos 2 ingredientes.');
  }
  if (typeof dados.modoPreparo !== 'string' || dados.modoPreparo.trim().length < 20) {
    erros.push('O modo de preparo deve ter pelo menos 20 caracteres.');
  }
  if (!Number.isInteger(dados.tempoPreparo) || dados.tempoPreparo < 1 || dados.tempoPreparo > 600) {
    erros.push('O tempo de preparo deve ser um número inteiro entre 1 e 600 minutos.');
  }
  if (!Number.isInteger(dados.porcoes) || dados.porcoes < 1 || dados.porcoes > 50) {
    erros.push('As porções devem ser um número inteiro entre 1 e 50.');
  }
  if (dados.autor !== undefined && dados.autor !== null && (typeof dados.autor !== 'string' || dados.autor.length > 50)) {
    erros.push('O nome do autor deve ter no máximo 50 caracteres.');
  }

  return erros;
}

function lerId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ mensagem: 'Id inválido.' });
    return null;
  }
  return id;
}

// GET /api/receitas?status=aprovada&categoria=doce&nome=bolo
app.get('/api/receitas', (req, res) => {
  const status = req.query.status === 'pendente' ? 'pendente' : 'aprovada';
  let sql = 'SELECT * FROM receitas WHERE status = ?';
  const params = [status];

  if (req.query.categoria) {
    sql += ' AND categoria = ?';
    params.push(String(req.query.categoria));
  }
  if (req.query.nome) {
    sql += ' AND nome LIKE ?';
    params.push('%' + String(req.query.nome).trim() + '%');
  }

  sql += status === 'pendente' ? ' ORDER BY criado_em' : ' ORDER BY nome';

  const linhas = db.prepare(sql).all(...params);
  res.json(linhas.map(formatarReceita));
});

// GET /api/receitas/:id
app.get('/api/receitas/:id', (req, res) => {
  const id = lerId(req, res);
  if (id === null) return;

  const linha = db.prepare('SELECT * FROM receitas WHERE id = ?').get(id);
  if (!linha) {
    return res.status(404).json({ mensagem: 'Receita não encontrada.' });
  }
  res.json(formatarReceita(linha));
});

// POST /api/receitas - toda receita nova entra como pendente
app.post('/api/receitas', (req, res) => {
  const dados = req.body || {};
  const erros = validarReceita(dados);

  if (erros.length > 0) {
    return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
  }

  const ingredientes = dados.ingredientes.map((i) => i.trim()).filter((i) => i !== '');

  const resultado = db.prepare(`
    INSERT INTO receitas (nome, categoria, ingredientes, modo_preparo, tempo_preparo, porcoes, autor, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pendente')
  `).run(
    dados.nome.trim(),
    dados.categoria,
    JSON.stringify(ingredientes),
    dados.modoPreparo.trim(),
    dados.tempoPreparo,
    dados.porcoes,
    dados.autor ? dados.autor.trim() : null
  );

  const nova = db.prepare('SELECT * FROM receitas WHERE id = ?').get(Number(resultado.lastInsertRowid));
  res.status(201).json(formatarReceita(nova));
});

// PATCH /api/receitas/:id/aprovar
app.patch('/api/receitas/:id/aprovar', (req, res) => {
  const id = lerId(req, res);
  if (id === null) return;

  const resultado = db
    .prepare("UPDATE receitas SET status = 'aprovada' WHERE id = ? AND status = 'pendente'")
    .run(id);

  if (resultado.changes === 0) {
    return res.status(404).json({ mensagem: 'Receita pendente não encontrada.' });
  }

  const linha = db.prepare('SELECT * FROM receitas WHERE id = ?').get(id);
  res.json(formatarReceita(linha));
});

// DELETE /api/receitas/:id - usado para recusar a receita
app.delete('/api/receitas/:id', (req, res) => {
  const id = lerId(req, res);
  if (id === null) return;

  const resultado = db.prepare('DELETE FROM receitas WHERE id = ?').run(id);
  if (resultado.changes === 0) {
    return res.status(404).json({ mensagem: 'Receita não encontrada.' });
  }
  res.status(204).end();
});

app.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});
