import * as ts from 'typescript';
import { type NodeMatchOptions } from './../nodeMatch/match/nodeMatchOptions';
export declare function findNode<TType extends ts.Node = ts.Node>(rootNode: ts.Node, opt?: NodeMatchOptions): TType;
