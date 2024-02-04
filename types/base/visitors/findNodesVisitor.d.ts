import * as ts from 'typescript';
import { type VisitorPredicateParamters } from './visitor';
import type { NodeTestPedicate } from 'src/base/visitors/findNodeVisitor';
export declare type FindNodesVisitorPredicateParamters = VisitorPredicateParamters;
export declare function findNodesVisitor<TNode extends ts.Node = ts.Node>(root: ts.Node, nodeTest: NodeTestPedicate): TNode[];
