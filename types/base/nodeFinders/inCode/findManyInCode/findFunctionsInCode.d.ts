import * as ts from 'typescript';
import { type FindFunctionOptions } from './../../findMany/findFunctions';
export declare function findFunctionsInCode(code: string, opt?: FindFunctionOptions): ts.FunctionDeclaration[];
