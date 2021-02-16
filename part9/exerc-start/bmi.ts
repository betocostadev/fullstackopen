interface bmiResults {
  height: number;
  weight: number;
  bmi: string;
}

const calcBmi = (height: number, weight: number) : bmiResults => {
  if (isNaN(height) || isNaN(Number(weight))) {
    throw new Error('Provided values were not numbers!');
  }

  const bmi: number = weight / ((height / 100) * (height / 100));
  let result: string;

  if (bmi <= 15.00) {
    result = 'Very severely underweight';
  } else if (bmi > 15.01 && bmi <= 16.00) {
    result = 'Severely underweight';
  } else if (bmi >= 16.01 && bmi <= 18.50) {
    result = 'Underweight';
  } else if (bmi >= 18.51 && bmi <= 25.00) {
    result = 'Normal (healthy weight)';
  } else if (bmi >= 25.01 && bmi <= 30.00) {
    result = 'Overweight';
  } else if (bmi >= 30.01 && bmi <= 35.00) {
    result = 'Obese Class I (Moderately obese)';
  } else if (bmi >= 35.01 && bmi <= 40.00) {
    result = 'Obese Class II (Severely obese)';
  } else {
    result = 'Obese Class III (Very severely obese)';
  }

  return {
    height: weight,
    weight: weight,
    bmi: result
  };
};

export { calcBmi };
