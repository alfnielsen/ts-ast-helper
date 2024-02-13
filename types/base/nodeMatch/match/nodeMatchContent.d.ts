import * as ts from 'typescript';
/**
 * Test if the string or RegExp are contained in the node text.
 * If match is a RegExp it must also match the entire content. \
 * @see nodeTextMatch for full match
 * @param node ts.Node
 * @param match string | RegExp
 * @returns
 */
export declare function nodeMatchContent(node: ts.Node, match: string | RegExp): boolean;
