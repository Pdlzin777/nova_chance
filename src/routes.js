import express from 'express';
import demandas from './models/demandas.js';
 
class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
 
const router = express.Router();
 
router.post('/demandas', async (req, res) => {
  try {
    const demandas = req.body;
 
    const createddemandas = await demandas.create(demandas);
 
    return res.json(createddemandas);
  } catch (error) {
    throw new HTTPError('Unable to create demandas', 400);
  }
});
 
router.get('/demandas', async (req, res) => {
  try {
    const { cargo } = req.query;
 
    const demandas = await demandas.read('name', cargo);
 
    res.json(demandas);
  } catch (error) {
    throw new HTTPError('Unable to read demandas', 400);
  }
});
 
router.get('/demandas/:id', async (req, res) => {
  try {
    const id = req.params.id;
 
    const demandas = await demandas.readById(id);
 
    res.json(demandas);
  } catch (error) {
    throw new HTTPError('Unable to find demandas', 400);
  }
});
 
router.put('/demandas/:id', async (req, res) => {
  try {
    const demandas = req.body;
 
    const id = req.params.id;
 
    const updateddemandas = await demandas.update({ ...demandas, id });
 
    return res.json(updateddemandas);
  } catch (error) {
    throw new HTTPError('Unable to update demandas', 400);
  }
});
 
router.delete('/demandas/:id', async (req, res) => {
  const id = req.params.id;
 
  if (await demandas.remove(id)) {
    res.sendStatus(204);
  } else {
    throw new HTTPError('Unable to remove demandas', 400);
  }
});
 
// 404 handler
router.use((req, res, next) => {
  res.status(404).json({ message: 'Content not found!' });
});
 
// Error handler
router.use((err, req, res, next) => {
  // console.error(err.stack);
  if (err instanceof HTTPError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something broke!' });
  }
});

 
export default router;
 