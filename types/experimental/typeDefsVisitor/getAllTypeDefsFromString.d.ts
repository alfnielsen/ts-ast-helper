import * as ts from 'typescript';
export type GetAllTypeDefsFromString = {
    content: string;
};
export declare function getAllTypeDefsFromString(opt: GetAllTypeDefsFromString): ts.Node[];
