import * as ts from 'typescript';
import { type NodeMatchOptions } from './nodeMatchOptions';
/**
 * Match one of the ancestors of the node (parent, grandparent, etc.)
 * @param node
 * @param match
 * @returns
 */
export declare function nodeMatchAncestor(node: ts.Node, options: NodeMatchOptions): boolean;
