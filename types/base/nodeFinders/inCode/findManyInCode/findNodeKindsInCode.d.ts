import * as ts from 'typescript';
import type { FindNodeKindOptions } from './../../findOne/findNodeKind';
export declare function findNodeKindsInCode<TType extends ts.Node = ts.Node>(code: string, kind: ts.SyntaxKind | keyof typeof ts.SyntaxKind, opt?: FindNodeKindOptions): TType[];
