import * as ts from 'typescript';
/**
 * Return ts modifers (this dont include decorators like 'async', consider using getModiferLikes)
 * @see getModiferLikes
 * @param node
 * @returns
 */
export declare const getModifiers: (node: ts.Node) => ts.Modifier[];
