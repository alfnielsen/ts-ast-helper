import * as ts from 'typescript';
/**
 * This function do NOT return the original program checker., if a program is not provided. \
 * @param node
 * @returns
 */
export declare function getChecker(node: ts.Node, program?: ts.Program, sourceFile?: ts.SourceFile): ts.TypeChecker;
