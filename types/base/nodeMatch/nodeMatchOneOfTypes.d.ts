import * as ts from 'typescript';
import { type NodeTypeMap } from './nodeMatchType';
export declare function nodeMatchOneOfTypes(node: ts.Node, ...types: (NodeTypeMap | keyof typeof NodeTypeMap)[]): boolean;
