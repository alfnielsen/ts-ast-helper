import * as ts from 'typescript';
import type { NodeTestPedicate } from 'src/base/visitors/findNodeVisitor';
export declare function findNodesInStringVisitor<TNode extends ts.Node = ts.Node>(code: string, nodeTest: NodeTestPedicate): TNode[];
