interface RunValues {
  height: number;
  weight: number;
}

const parseArgs = (args: Array<string>): RunValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length >= 5) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

type Result = string;

const bmiCalc = (weight: number, height: number) : Result => {
  if (isNaN(Number(weight)) || isNaN(height)) {
    throw new Error('Provided values were not numbers!');
  }

  const bmi: number = weight / ((height / 100) * (height / 100));
  let result: string;
  const message: string = `Based on the weight ${weight}kg and height ${height}cm.`;

  if (bmi <= 15.00) {
    result = 'Very severely underweight'
  } else if (bmi > 15.01 && bmi <= 16.00) {
    result = 'Severely underweight'
  } else if (bmi >= 16.01 && bmi <= 18.50) {
    result = 'Underweight'
  } else if (bmi >= 18.51 && bmi <= 25.00) {
    result = 'Normal (healthy weight)'
  } else if (bmi >= 25.01 && bmi <= 30.00) {
    result = 'Overweight'
  } else if (bmi >= 30.01 && bmi <= 35.00) {
    result = 'Obese Class I (Moderately obese)'
  } else if (bmi >= 35.01 && bmi <= 40.00) {
    result = 'Obese Class II (Severely obese)'
  } else {
    result = 'Obese Class III (Very severely obese)'
  }

  return `${message} You are ${result}`
}

console.log('=========== BODY MASS CALCULATOR ==============');

try {
  const { height, weight } = parseArgs(process.argv);
  console.log(bmiCalc(height, weight));
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}

const runBmiTests = () : void => {
  try {
    console.log(bmiCalc(40, 166));
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }
  try {
    console.log(bmiCalc(42, 166));
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }
  try {
    console.log(bmiCalc(50, 166));
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }
  try {
    console.log(bmiCalc(55, 166));
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }
  try {
    console.log(bmiCalc(72, 166));
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }
  try {
    console.log(bmiCalc(84, 166));
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }
  try {
    console.log(bmiCalc(98, 166));
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }
  try {
    console.log(bmiCalc(158, 166));
  } catch (e) {
    console.log('Something went wrong, error message: ', e.message);
  }
}

// runBmiTests()
