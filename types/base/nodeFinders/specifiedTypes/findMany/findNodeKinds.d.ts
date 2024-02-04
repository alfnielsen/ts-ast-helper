import * as ts from 'typescript';
import type { FindNodeKindOptions } from 'src/base/nodeFinders/specifiedTypes/findOne/findNodeKind';
export declare function findNodeKinds<TType extends ts.Node = ts.Node>(node: ts.Node, kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind, opt?: FindNodeKindOptions): any;
