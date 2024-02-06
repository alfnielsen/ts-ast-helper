import * as ts from 'typescript';
import type { FindNodeKindOptions } from './../findOne/findNodeKind';
export declare function findNodeKinds<TType extends ts.Node = ts.Node>(node: ts.Node, kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind, opt?: FindNodeKindOptions): TType[];
