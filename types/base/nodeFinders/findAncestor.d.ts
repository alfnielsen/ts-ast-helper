import { type NodeMatchOptions } from './../nodeMatch/match/nodeMatchOptions';
import * as ts from 'typescript';
export declare function findAncestor<TNode extends ts.Node = ts.Node>(node: ts.Node, options: NodeMatchOptions): TNode | undefined;
