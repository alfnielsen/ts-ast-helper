import * as ts from 'typescript';
export type CreateProgramFromStringOptions = {
    fileName?: string;
    sourceFile?: ts.SourceFile;
    writeFile?: (filename: string, data: string) => void;
    getSourceFile?: (name: string, languageVersion: ts.ScriptTarget) => ts.SourceFile;
    getDefaultLibFileName?: () => string;
    useCaseSensitiveFileNames?: () => boolean;
    getCanonicalFileName?: (filename: string) => string;
    getCurrentDirectory?: () => string;
    fileExists?: (filename: string) => boolean;
    getNewLine?: () => string;
    getDirectories?: (path: string) => string[];
    readFile?: (filename: string) => string | undefined;
    defaultCompilerHost?: ts.CompilerHost;
};
export declare const createProgramFromString: (code: string, opt?: CreateProgramFromStringOptions) => ts.Program;
