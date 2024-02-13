import * as ts from 'typescript';
import type { NodeTypeMap } from './../../../nodeMatch/match/nodeMatchType';
import { type FindNodeTypeOptions } from './../../findOne/findNodeType';
export declare function findNodeTypeInCode<TType extends ts.Node = ts.Node>(code: string, type: NodeTypeMap | keyof typeof NodeTypeMap, opt?: FindNodeTypeOptions): TType;
