import * as ts from 'typescript';
export type GetAllTypeDefsFromString = {
    content: string;
    includeEnums?: boolean;
};
export declare function getAllTypeDefsFromString(opt: GetAllTypeDefsFromString): ts.Node[];
