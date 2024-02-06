import * as ts from 'typescript';
import { type NodeMatchOptions } from './nodeMatchOptions';
export type FindNodeOptions = NodeMatchOptions;
export declare function findNodes<TType extends ts.Node = ts.Node>(rootNode: ts.Node, opt?: FindNodeOptions): TType[];
