import * as ts from 'typescript';
export declare class HParameter {
    dotDotDotToken: boolean;
    name: string;
    questionToken: boolean;
    start: number;
    end: number;
    tsKind?: string;
    modifiers: any[];
    tsNode?: ts.Node;
    static fromTsParameter(node: ts.ParameterDeclaration): HParameter;
    getJsonData(): {
        dotDotDotToken: boolean;
        name: string;
        questionToken: boolean;
        start: number;
        end: number;
        tsKind: string;
        modifiers: any[];
    };
    getJsonString(): string;
}
