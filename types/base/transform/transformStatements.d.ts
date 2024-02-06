import * as ts from 'typescript';
export type StatementIterateFunctionOptions = {
    remove: () => void;
    addBefore: (...statement: ts.Statement[]) => void;
    add: (...statement: ts.Statement[]) => void;
    replace: (...statement: ts.Statement[]) => void;
    unshift: (...statement: ts.Statement[]) => void;
    insertAt: (index: number, ...statement: ts.Statement[]) => void;
    newStatementList: ReadonlyArray<ts.Statement>;
};
export type StatementIterateFunction = (statement: ts.Statement, options: StatementIterateFunctionOptions) => void;
/**
 * Re-create/Replace a list of statements (Return a new list)
 *
 * @param statements
 * @param replacePredicate  statement => (new) statement | statements
 * @returns
 */
export declare function transformStatements(statements: ts.Statement[] | ts.NodeArray<ts.Statement>, replacePredicate: StatementIterateFunction): ts.Statement[];
