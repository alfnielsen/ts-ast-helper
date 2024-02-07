import * as ts from 'typescript';
import { ModifierLikeMap } from './../getters/ModifierLikeMap';
export declare const hasModifiers: (node: ts.Node, ...modifiers: (ts.ModifierSyntaxKind | keyof typeof ModifierLikeMap)[]) => boolean;
