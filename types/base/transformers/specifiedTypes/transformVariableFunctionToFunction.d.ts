import * as ts from 'typescript';
/**
 * Transform a VariableStatement with one varibleDefinition that hold a function, \
 * and return a functionDeclaration version. \
 * NOTE: \
 * The transformed function is not part of a lexicalEnvironment \
 * (It does not have positions and therefor methods like 'getText()' will not work) \
 *
 * To fix that need to transform the entire SourceFile (with a transformer), \
 * and use laxical environments, like context.startLexicalEnvironment()
 *
 * There are a couple of helper methods that do this like: \
 *  - tranformSourceFileWithState
 *
 * @example
 * var foo = () =>{}
 * function foo(){}
 * @param varStatment ts.VariableStatement
 */
export declare function transformVariableFunctionToFunction(varStatment: ts.VariableStatement, sourceFile?: ts.SourceFile): ts.FunctionDeclaration;
