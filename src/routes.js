import { Router } from 'express';
import demandas from './models/demandas.js'; // seu model
class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = Router();

// Rota raiz (apenas para teste)
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// POST - Criar demanda
router.post('/demandas', async (req, res, next) => {
  try {
    const dados = req.body;
    const novaDemanda = await demandas.create(dados); // corrigido: Demandas -> demandas
    res.status(201).json(novaDemanda);
  } catch (error) {
    next(new HTTPError('Erro ao criar demanda', 400));
  }
});

// GET - Listar todas ou filtrar por cargo
router.get('/demandas', async (req, res, next) => {
  try {
    const { cargo } = req.query;
    const resultado = cargo ? await demandas.read('cargo', cargo) : await demandas.read();
    res.json(resultado);
  } catch (error) {
    next(new HTTPError('Erro ao buscar demandas', 400));
  }
});

// GET - Buscar por ID
router.get('/demandas/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const demanda = await demandas.readById(id);
    if (!demanda) throw new HTTPError('Demanda não encontrada', 404);
    res.json(demanda);
  } catch (error) {
    next(error instanceof HTTPError ? error : new HTTPError('Erro ao buscar demanda', 400));
  }
});

// PUT - Atualizar por ID
router.put('/demandas/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const dados = req.body;
    const atualizado = await demandas.update({ ...dados, id });
    res.json(atualizado);
  } catch (error) {
    next(new HTTPError('Erro ao atualizar demanda', 400));
  }
});

// DELETE - Remover por ID
router.delete('/demandas/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const sucesso = await demandas.remove(id);
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
