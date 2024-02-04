import * as ts from 'typescript';
export declare type CreateSourceFileFromCodeOptions = {
    fileName?: string;
    languageVersionOrOptions?: ts.ScriptTarget | ts.CreateSourceFileOptions;
    setParentNodes?: boolean | undefined;
    scriptKind?: ts.ScriptKind | undefined;
};
export declare function createSourceFileFromCode(code: string, opt?: CreateSourceFileFromCodeOptions): ts.SourceFile;
