const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
  }

//   multiplicator('how about a string?', 4, 'Multiplied a string and 4, the result is:');
  multiplicator(10, 4, 'Multiplied two numbers, the result is:');

//   We can create a type using the TypeScript native keyword type. Let's describe our type Operation:
type Operation = 'multiply' | 'add' | 'divide';

// Here we define the Result that will be used as the return of the calculator function
// In this case we are accepting strings or numbers, since the last part of calculator can return a string
// type Result = string | number

// const calculator = (a: number, b: number, op : Operation): Result => {
//   if (op === 'multiply') {
//     return a * b;
//   } else if (op === 'add') {
//     return a + b;
//   } else if (op === 'divide') {
//     if (b === 0) return 'this cannot be done';
//     return a / b;
//   }
// }

// Making sure the calculator would work if the could receive external input
type Result = number;

const calculator = (a: number, b: number, op : Operation) : Result => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if( b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
}

console.log('calculator result 1:')
try {
  console.log(calculator(1, 0, 'divide'));
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}

console.log('calculator result 2:')
try {
  console.log(calculator(2000, 7, 'multiply'));
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}

console.log(process.argv)



