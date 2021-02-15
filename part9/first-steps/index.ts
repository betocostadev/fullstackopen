import express from 'express';
import { calculator } from './calc-exp'

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/calculate?', (req, res) => {
  if (req.query) {
    if (req.query.value1 && req.query.value2 && req.query.op) {
      const a: number = Number(req.query.value1)
      const b: number = Number(req.query.value2)
      const op = req.query.op === 'multiply'
        ? 'multiply'
        : req.query.op === 'divide'
        ? 'divide'
        : 'add'
      const result = calculator(a, b, op)
      return res.json(result)
    }
    else {
      return res.sendStatus(400).json({
        error: 'malformatted parameters'
      })
    }
  } else {
    return res.sendStatus(400).json({
      error: 'malformatted parameters'
    })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
