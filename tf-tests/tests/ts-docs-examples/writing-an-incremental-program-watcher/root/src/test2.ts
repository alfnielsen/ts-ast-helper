// ignore file:
export function test1(number: number): string {
  return 'test1' + number
}

export function test2(number: number): string {
  if (number == 1) {
    return 'test2 is 1!'
  }
  return 'test2' + number
}

let test1Var = 'test1Var'
// @ts-ignore
let test2Var = 
// @ts-ignore
let test3Var = 22

export { test1Var, test2Var }
