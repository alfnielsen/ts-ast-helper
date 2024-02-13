import * as ts from 'typescript';
/**
 * Return all ModifierLike (Both Modifier and Decorator - this include both export and async) \
 * @param node
 * @returns
 */
export declare const getModifierLikes: (node: ts.Node) => ts.ModifierLike[];
