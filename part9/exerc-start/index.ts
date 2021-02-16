/* const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
  }

  multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:'); */

import express from 'express';
import { calcBmi } from './bmi';
import { exCalculator } from './webExercises';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send(`<h1>Hello Full Stack!</h1>`);
});

app.get('/bmi?', (req, res) => {

  if (req.query && req.query.height && req.query.weight) {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    return res.json(calcBmi(height, weight));
  } else {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }
});

interface exData {
  daily_exercises: Array<number>
  target: number
}

app.post('/api/exercises', (req, res) => {

  const body: exData = req.body as exData;

  if (!body || body && !body.daily_exercises || body && !body.target) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  } else if (body && body.daily_exercises && body.target) {
    if (isNaN(body.target)) {
      return res.status(400).json({
        error: 'malformatted parameters'
      });
    }
    if ((body.daily_exercises.filter((e: number) => isNaN(e)).length)) {
      return res.status(400).json({
        error: 'malformatted parameters'
      });
    }
  }

  const exercises = {
    daily_exercises: body.daily_exercises,
    target: body.target,
  };

  return res.json(exCalculator(exercises));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
