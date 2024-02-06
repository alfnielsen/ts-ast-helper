import * as ts from 'typescript';
import { type VisitorPredicateParamters } from './visitor';
export type FindNodeVisitorPredicateParamters = VisitorPredicateParamters;
export type NodeTestPedicate = (node: ts.Node, parameters: FindNodeVisitorPredicateParamters) => undefined | boolean;
export declare function findNodeVisitor<TNode extends ts.Node = ts.Node>(root: ts.Node, nodeTest: NodeTestPedicate): TNode | undefined;
