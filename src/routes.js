import express from 'express';
import Nova_Chance from './models/Nova_Chance.js';
 
class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
 
const router = express.Router();
 
router.post('/Nova_Chance', async (req, res) => {
  try {
    const Nova_Chance = req.body;
 
    const createdNova_Chance = await Nova_Chance.create(Nova_Chance);
 
    return res.json(createdNova_Chance);
  } catch (error) {
    throw new HTTPError('Unable to create Nova_chance', 400);
  }
});
 
router.get('/Nova_Chance', async (req, res) => {
  try {
    const { cargo } = req.query;
 
    const Nova_Chance = await Nova_Chance.read('name', cargo);
 
    res.json(Nova_Chance);
  } catch (error) {
    throw new HTTPError('Unable to read Nova_Chance', 400);
  }
});
 
router.get('/Nova_Chance/:id', async (req, res) => {
  try {
    const id = req.params.id;
 
    const Nova_Chance = await Nova_Chance.readById(id);
 
    res.json(Nova_Chance);
  } catch (error) {
    throw new HTTPError('Unable to find Nova_Chance', 400);
  }
});
 
router.put('/Nova_Chance/:id', async (req, res) => {
  try {
    const Nova_Chance = req.body;
 
    const id = req.params.id;
 
    const updatedNova_Chance = await Nova_Chance.update({ ...Nova_Chance, id });
 
    return res.json(updatedNova_Chance);
  } catch (error) {
    throw new HTTPError('Unable to update Nova_Chance', 400);
  }
});
 
router.delete('/Nova_Chance/:id', async (req, res) => {
  const id = req.params.id;
 
  if (await Nova_Chance.remove(id)) {
    res.sendStatus(204);
  } else {
    throw new HTTPError('Unable to remove Nova_Chance', 400);
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
 