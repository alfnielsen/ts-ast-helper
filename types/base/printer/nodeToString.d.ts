import { type LogColor } from './../../util';
import * as ts from 'typescript';
export type NodeToString = {
    log?: boolean;
    logger?: (message?: any, ...optionalParams: any[]) => void;
    compact?: boolean;
    box?: boolean;
    note?: string;
    colors?: LogColor;
};
export declare const nodeToString: (node: ts.Node, opt?: NodeToString) => string;
