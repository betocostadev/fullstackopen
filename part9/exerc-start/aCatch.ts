let x: any = '';
let choices: Array<any> = ['x', '', ' ', '   ', false, NaN, true, 0, !x]
let total = 0
while (`${x}` == '' + x) {
  if (`${x}` !== '' + x) console.log('SUCCESS!')
  x = choices[total]
  total++
  console.log(x, 'fail!')
  if (total >= choices.length) {
    break
  }
}
