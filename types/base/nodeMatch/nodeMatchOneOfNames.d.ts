import * as ts from 'typescript';
export declare function nodeMatchOneOfNames(node: ts.Node, ...names: (string | RegExp)[]): boolean;
