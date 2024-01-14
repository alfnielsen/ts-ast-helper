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
