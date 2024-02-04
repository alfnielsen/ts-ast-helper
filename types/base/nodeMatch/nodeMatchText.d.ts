import * as ts from 'typescript';
/**
 * Match the entire text of the name \
 * If match is a RegExp it must also match the entire content. \
 * @see nodeTextContains for partly match
 * @param node ts.Node
 * @param match string | RegExp
 * @returns
 */
export declare function nodeMatchText(node: ts.Node, match: string | RegExp): boolean;
