import * as ts from 'typescript'

export type StatementIterateFunctionOptions = {
  remove: () => void
  addBefore: (...statement: ts.Statement[]) => void
  add: (...statement: ts.Statement[]) => void
  replace: (...statement: ts.Statement[]) => void
  unshift: (...statement: ts.Statement[]) => void
  insertAt: (index: number, ...statement: ts.Statement[]) => void
  newStatementList: ReadonlyArray<ts.Statement>
}

export type StatementIterateFunction = (
  statement: ts.Statement,
  options: StatementIterateFunctionOptions,
) => void

/**
 * Re-create/Replace a list of statements (Return a new list)
 *
 * @param statements
 * @param replacePredicate  statement => (new) statement | statements
 * @returns
 */
export function transformStatements(
  statements: ts.Statement[] | ts.NodeArray<ts.Statement> = [],
  replacePredicate: StatementIterateFunction,
) {
  const newStatementList: ts.Statement[] = []
  let newIndex = 0
  for (let index = 0; index < statements.length; index += 1, newIndex += 1) {
    let statement = statements[index]
    newStatementList.push(statement)
    const options: StatementIterateFunctionOptions = {
      newStatementList: newStatementList as ReadonlyArray<ts.Statement>,
      remove() {
        newStatementList.splice(index, 1)
        newIndex -= 1
      },
      addBefore(...statement: ts.Statement[]) {
        newStatementList.splice(index, 0, ...statement)
        newIndex += statement.length
      },
      add(...statement: ts.Statement[]) {
        newStatementList.push(...statement)
        newIndex += statement.length
      },
      replace(...statement: ts.Statement[]) {
        newStatementList.splice(index, 0, ...statement)
        newIndex += statement.length - 1
      },
      unshift(...statement: ts.Statement[]) {
        newStatementList.unshift(...statement)
        newIndex += statement.length
      },
      insertAt(index: number, ...statement: ts.Statement[]) {
        if (index < 0) {
          throw new Error('Index must be greater than 0')
        }
        if (index > newStatementList.length) {
          throw new Error(
            'Index must be lower than the length of the statements',
          )
        }
        newStatementList.splice(index, 0, ...statement)
        newIndex += statement.length
      },
    }
    replacePredicate(statement, options)
  }
  return newStatementList
}
