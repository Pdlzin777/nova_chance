import express from 'express';
import { trabalhos } from './data/index.js';
import { trabalhos } from './data/logins.js';
 
const app = express();

app.use(express.static('public'));
 
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/trabalhos', (req, res) => {
    return res.json(trabalhos)
  });

  app.listen(3000, () => {
  console.log('App running on port 3000');
});

  app.post('/logins', (req, res) => {
    return res.json(logins)
  });
 
app.listen(3000, () => {
  console.log('App running on port 3000');
});
 