// Function expected arguments and return
const birthdayGreeter = (name: string, age: number): string => {
    return `Happy birthday ${name}, you are now ${age} years old!`
  }

const birthdayHero: string = "Jane User"
const age: number = 22

console.log(birthdayGreeter(birthdayHero, 22))

// Tupple
// Tupple is an array with predefined types and also the number of items it will have
// Declare a tuple type
let john: [string, number];
john = ['Johnny', 16];

console.log(birthdayGreeter(...john))

enum Color {
  Red,
  Green,
  Blue,
}
let green: Color = Color.Green;
let colorGreen: string = Color[1]
console.log(`Ugly color? ${green}`)
console.log(`wich is ${colorGreen}`)

