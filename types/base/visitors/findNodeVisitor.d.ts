import * as ts from 'typescript';
import { type VisitorPredicateParamters } from './visitor';
export declare type FindNodeVisitorPredicateParamters = VisitorPredicateParamters;
export declare type NodeTestPedicate = (node: ts.Node, parameters: FindNodeVisitorPredicateParamters) => undefined | boolean;
export declare function findNodeVisitor<TNode extends ts.Node = ts.Node>(root: ts.Node, nodeTest: NodeTestPedicate): TNode | undefined;
