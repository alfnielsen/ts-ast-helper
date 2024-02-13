import * as ts from 'typescript';
import { type NodeMatchOptions } from './../nodeMatch/match/nodeMatchOptions';
export type FindNodeOptions = NodeMatchOptions;
export declare function findNodes<TType extends ts.Node = ts.Node>(rootNode: ts.Node, opt?: FindNodeOptions): TType[];
