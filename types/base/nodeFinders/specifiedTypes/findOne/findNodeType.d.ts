import * as ts from 'typescript';
import type { NodeTypeMap } from './../../../nodeMatch/nodeMatchType';
import type { FindNodeOptions } from './../../findNodes';
export type FindNodeTypeOptions = Omit<FindNodeOptions, 'kind' | 'oneOfKinds' | 'type' | 'oneOfTypes'> & {};
export declare function findNodeType<TType extends ts.Node = ts.Node>(node: ts.Node, type: NodeTypeMap | keyof typeof NodeTypeMap, opt?: FindNodeTypeOptions): TType;
