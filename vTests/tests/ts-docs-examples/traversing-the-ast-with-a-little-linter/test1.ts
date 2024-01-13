export function test1(number: number): string {
  return 'test1' + number
}

export function test2(number: number): string {
  if (number == 1) {
    return 'test1 is 1!'
  }
  return 'test1' + number
}

let test1Var = 'test1Var'
let test2Var = 45

export { test1Var, test2Var }
