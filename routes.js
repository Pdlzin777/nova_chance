import express from 'express';
import Demandas from './src/models/demandas.js'; // nome do model, conforme pasta "models"

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

// Rota raiz
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST - Criar demanda
router.post('/demandas', async (req, res, next) => {
  try {
    const dados = req.body;
    const novaDemanda = await Demandas.create(dados);
    res.status(201).json(novaDemanda);
  } catch (error) {
    next(new HTTPError('Erro ao criar demanda', 400));
  }
});

// GET - Listar todas ou filtrar por cargo
router.get('/demandas', async (req, res, next) => {
  try {
    const { cargo } = req.query;
    const resultado = await Demandas.read('cargo', cargo);
    res.json(resultado);
  } catch (error) {
    next(new HTTPError('Erro ao buscar demandas', 400));
  }
});

// GET - Buscar por ID
router.get('/demandas/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const demanda = await Demandas.readById(id);
    res.json(demanda);
  } catch (error) {
    next(new HTTPError('Demanda não encontrada', 404));
  }
});

// PUT - Atualizar por ID
router.put('/demandas/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    const atualizado = await Demandas.update({ ...dados, id });
    res.json(atualizado);
  } catch (error) {
    next(new HTTPError('Erro ao atualizar demanda', 400));
  }
});

// DELETE - Remover por ID
router.delete('/demandas/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const sucesso = await Demandas.remove(id);
    if (sucesso) {
      res.sendStatus(204);
    } else {
      next(new HTTPError('Demanda não encontrada', 404));
    }
  } catch (error) {
    next(error);
  }
});

// 404 para rotas não encontradas
router.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada.' });
});

// Middleware de erro
router.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    return res.status(err.code).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

export default router;
