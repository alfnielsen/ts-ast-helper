import * as ts from 'typescript';
import type { NodeTypeMap } from 'src/base/nodeMatch/nodeMatchType';
import type { FindNodeTypeOptions } from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeType';
export declare function findNodeTypes<TType extends ts.Node = ts.Node>(node: ts.Node, type: NodeTypeMap | keyof typeof NodeTypeMap, opt?: FindNodeTypeOptions): any;
