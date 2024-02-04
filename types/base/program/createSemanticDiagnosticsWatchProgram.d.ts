import * as ts from 'typescript';
export declare type WatchProgramOptions = {
    configPath?: string;
    options?: ts.CompilerOptions;
    formatHost?: ts.FormatDiagnosticsHost;
    onStatusChanged?: (opt: {
        diagnostic: ts.Diagnostic;
        line: number;
        character: number;
    }) => void;
    onReportDiagnostic?: (opt: {
        diagnostic: ts.Diagnostic;
        line: number;
        character: number;
    }) => void;
    onCreateProgram?: (opt: {
        rootNames: ReadonlyArray<string> | undefined;
        options?: ts.CompilerOptions;
        host?: ts.CompilerHost;
        oldProgram: ts.SemanticDiagnosticsBuilderProgram | undefined;
    }) => void;
    onProgramCreated?: (opt: {
        program: ts.SemanticDiagnosticsBuilderProgram;
    }) => void;
} & ({
    rootFiles: string[];
    rootPath?: undefined;
} | {
    rootPath: string;
    rootFiles?: undefined;
});
export declare const createSemanticDiagnosticsWatchProgram: (opt: WatchProgramOptions) => ts.WatchOfConfigFile<ts.SemanticDiagnosticsBuilderProgram>;
