import * as ts from 'typescript';
import { type CreateProgramFromStringOptions } from './createProgramFromCode';
export type CreateProgramFromPathOptions = CreateProgramFromStringOptions & {};
export type ReturnType = ts.Program;
export declare const createProgramFromFile: (filePath: string, opt?: CreateProgramFromPathOptions) => Promise<ts.Program>;
