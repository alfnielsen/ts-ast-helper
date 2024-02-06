import * as ts from 'typescript';
import { type FindNodeVisitorPredicateParamters } from './findNodeVisitor';
export declare function findNodeInStringVisitor<TNode extends ts.Node = ts.Node>(code: string, nodeTest: (node: ts.Node, parameters: FindNodeVisitorPredicateParamters) => undefined | boolean): TNode | undefined;
