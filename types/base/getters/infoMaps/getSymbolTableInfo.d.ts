import * as ts from 'typescript';
import { type SymbolInfo } from './getSymbolInfo';
export type SymbolTableInfo = Record<string, SymbolInfo> & {};
export declare function getSymbolTableInfo(table: ts.SymbolTable): Record<string, SymbolInfo>;
