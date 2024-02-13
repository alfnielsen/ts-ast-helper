import * as ts from 'typescript';
/**
 * Create a program and get the type checker from it. \
 * @param node
 * @returns
 */
export declare function getProgramChecker(node: ts.Node | ts.SourceFile, sourceFile?: ts.SourceFile): {
    checker: ts.TypeChecker;
    program: ts.Program;
    sourceFile: ts.SourceFile;
};
