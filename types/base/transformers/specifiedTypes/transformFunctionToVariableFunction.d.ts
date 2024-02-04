import * as ts from 'typescript';
/**
 * NOTE: In Development \
 * (known issues: missing async after transformaion!) \
 * \
 * Transform a functionDeclaration and return a VariableStatement with one varibleDefinition that hold a function. \
 * NOTE: \
 * The transformed function is not part of a lexicalEnvironment \
 * (It does not have positions and therefor methods like 'getText()' will not work)
 *
 * To fix that need to transform the entire SourceFile (with a transformer), \
 * and use laxical environments, like context.startLexicalEnvironment()
 *
 * There are a couple of helper methods that do this like:
 *  - tranformSourceFileWithState
 *
 * @example
 * function foo(){}
 * var foo = () =>{}
 * @param functionDeclaration ts.FunctionDeclaration
 */
export declare function transformFunctionToVariableFunction(functionDeclaration: ts.FunctionDeclaration, sourceFile?: ts.SourceFile): ts.VariableStatement;
