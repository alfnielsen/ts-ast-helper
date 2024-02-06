import * as ts from 'typescript';
import type { NodeTypeMap } from './../../../nodeMatch/nodeMatchType';
import type { FindNodeTypeOptions } from './../findOne/findNodeType';
export declare function findNodeTypes<TType extends ts.Node = ts.Node>(node: ts.Node, type: NodeTypeMap | keyof typeof NodeTypeMap, opt?: FindNodeTypeOptions): TType[];
