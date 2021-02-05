const multiplicator = (a: number, b: number, printText: string) => {
    console.log(printText,  a * b);
  }

//   multiplicator('how about a string?', 4, 'Multiplied a string and 4, the result is:');
  multiplicator(10, 4, 'Multiplied two numbers, the result is:');

//   We can create a type using the TypeScript native keyword type. Let's describe our type Operation:
type Operation = 'multiply' | 'add' | 'divide'
