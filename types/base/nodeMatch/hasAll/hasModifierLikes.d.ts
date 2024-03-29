import * as ts from 'typescript';
import { ModifierLikeMap } from './../../getters/typeMaps/ModifierLikeMap';
export declare const hasModifierLikes: (node: ts.Node, ...modifiers: (ts.ModifierSyntaxKind | keyof typeof ModifierLikeMap)[]) => boolean;
