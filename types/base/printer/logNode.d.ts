import * as ts from 'typescript';
import type { LogColor } from './../../util';
export type LogNode = {
    logger?: (message?: any, ...optionalParams: any[]) => void;
    compact?: boolean;
    box?: boolean;
    note?: string;
    colors?: LogColor;
};
export declare const logNode: (node: ts.Node, opt?: LogNode) => string;
