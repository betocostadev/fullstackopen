/* const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
  }

  multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:'); */

import express from 'express';
import { calcBmi } from './bmi';

const app = express();

app.get('/hello', (_req, res) => {
  res.send(`<h1>Hello Full Stack!</h1>`);
});

app.get('/bmi?', (req, res) => {

  if (req.query && req.query.height && req.query.weight) {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    return res.json(calcBmi(height, weight));
  } else {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
