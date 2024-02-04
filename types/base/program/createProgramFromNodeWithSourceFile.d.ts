import * as ts from 'typescript';
export declare type CreateProgramFromNodeWithSourceFileOptions = {
    fileName?: string;
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
export declare const createProgramFromNodeWithSourceFile: (node: ts.Node, opt?: CreateProgramFromNodeWithSourceFileOptions) => ts.Program;
