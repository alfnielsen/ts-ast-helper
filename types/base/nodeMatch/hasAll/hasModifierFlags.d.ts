import * as ts from 'typescript';
export declare const hasModifierFlags: (node: ts.Declaration, ...nodeFalg: (ts.ModifierFlags | keyof typeof ts.ModifierFlags)[]) => boolean;
