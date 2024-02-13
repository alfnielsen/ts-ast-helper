import * as ts from 'typescript';
import { type NodeMatchOptions } from './../nodeMatch/match/nodeMatchOptions';
/**
 * Find all of node's Ast children matching the match options. \
 * The children list comes from getAstChildren \
 * (witch return the children from ts.forEachChild, not the node.getChildren)
 * @param parentNode
 * @param opt
 * @returns
 */
export declare function findAstChildNodes<TType extends ts.Node = ts.Node>(parentNode: ts.Node, opt?: NodeMatchOptions): TType[];
