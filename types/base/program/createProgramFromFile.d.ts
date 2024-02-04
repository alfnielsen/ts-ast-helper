import * as ts from 'typescript';
import { type CreateProgramFromStringOptions } from './createProgramFromString';
export declare type CreateProgramFromPathOptions = CreateProgramFromStringOptions & {};
export declare type ReturnType = ts.Program;
export declare const createProgramFromFile: (filePath: string, opt?: CreateProgramFromPathOptions) => Promise<ts.Program>;
