import * as ts from 'typescript';
import { type NodeMatchOptions } from 'src/base/nodeFinders/nodeMatchOptions';
/**
 * Find first of node's Ast child matching the match options. \
 * The children list comes from getAstChildren \
 * (witch return the children from ts.forEachChild, not the node.getChildren)
 * @param parentNode
 * @param opt
 * @returns
 */
export declare function findAstChildNode<TType extends ts.Node = ts.Node>(parentNode: ts.Node, opt?: NodeMatchOptions): TType;
