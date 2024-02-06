import * as ts from 'typescript';
import { type NodeMatchOptions } from './nodeMatchOptions';
export declare function findNode<TType extends ts.Node = ts.Node>(rootNode: ts.Node, opt?: NodeMatchOptions): TType;
