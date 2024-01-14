/**
 * Description of Test1
 * @name Test1
 */
export class Test1 {
  foos: string[] = []
  /**
   * this is a test method
   * @name testMethod1
   */
  public testMethod1() {
    console.log('testMethod1')
  }
  /**
   * @name testMethod2
   */
  public testMethod2(n: string) {
    console.log('testMethod2' + n)
  }
}

export const test1Var = 'test1Var'

type F1OptionItem = {
  name: string
  age: number
}

type F1Options = {
  s: string
  n: number
  o?: string
  item?: F1OptionItem
}

function F1(opt?: F1Options) {
  const { n, s, item, o } = opt ?? {}
  let counter = 0
  function rec(start = 0) {
    if (s === 'test') {
      counter += 100
    } else {
      counter++
    }
    if (n && n > 5) {
      counter += 15
    }
    if (item) {
      if (item.name === 'bos') {
        counter += 50
      }
      if (item.age > 40) {
        counter += 10
      }
    }
  }
  rec
  return counter
}
