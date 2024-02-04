import * as ts from 'typescript';
import { type NodeMatchOptions } from 'src/base/nodeFinders/nodeMatchOptions';
export declare type FindNodeOptions = NodeMatchOptions;
export declare function findNodes<TType extends ts.Node = ts.Node>(rootNode: ts.Node, opt?: NodeMatchOptions): any;
