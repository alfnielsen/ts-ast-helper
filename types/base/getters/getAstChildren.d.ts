import * as ts from 'typescript';
/**
 * Get the node's children in the AST three. \
 * This returns the children list found from forEachChild loop. \
 * NOTE: node.getChildren() do not give the children found from forEachChild (or visitors)
 * @param node
 * @returns
 */
export declare const getAstChildren: (node: ts.Node) => ts.Node[];
