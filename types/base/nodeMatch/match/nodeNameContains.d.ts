import * as ts from 'typescript';
/**
 * Test if the node have a name and if the name contians the input. \
 * IF the input is a RegExp, it test if any part of the text matches the RegExp.
 * @param node ts.Node
 * @param input string | RegExp
 * @returns
 */
export declare function nodeNameContains(node: ts.Node, input: string | RegExp): boolean;
