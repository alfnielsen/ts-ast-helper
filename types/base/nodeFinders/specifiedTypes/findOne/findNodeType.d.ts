import * as ts from 'typescript';
import { type FindNodeOptions } from 'src/base/nodeFinders/findNode';
import type { NodeTypeMap } from 'src/base/nodeMatch/nodeMatchType';
export declare type FindNodeTypeOptions = Omit<FindNodeOptions, 'kind' | 'oneOfKinds' | 'type' | 'oneOfTypes'> & {};
export declare function findNodeType<TType extends ts.Node = ts.Node>(node: ts.Node, type: NodeTypeMap | keyof typeof NodeTypeMap, opt?: FindNodeTypeOptions): any;
