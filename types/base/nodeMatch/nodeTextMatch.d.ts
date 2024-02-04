import * as ts from 'typescript';
/**
 * Test if the node's entire text match the input \
 * If match is a RegExp it must also match the entire content. \
 * @see nodeTextContainsText for partly match
 * @param node ts.Node
 * @param input string | RegExp
 * @returns
 */
export declare function nodeTextMatch(node: ts.Node, input: string | RegExp): boolean;
