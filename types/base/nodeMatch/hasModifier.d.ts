import * as ts from 'typescript';
import { ModifierLikeMap } from './../getters/ModifierLikeMap';
export declare const hasModifier: (node: ts.Node, modifier: ts.ModifierSyntaxKind | keyof typeof ModifierLikeMap) => boolean;
