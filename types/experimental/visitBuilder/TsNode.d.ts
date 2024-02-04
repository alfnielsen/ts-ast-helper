import * as ts from 'typescript';
export declare class TsNode {
    node: ts.Node;
    matchedAllConditions: boolean;
    constructor(node: ts.Node);
    /**
     * Did the node match all previues matches
     * @returns boolean
     */
    get isValid(): boolean;
    contains(match: string | RegExp): this;
    dontContains(match: string | RegExp): this;
    match(match: string | RegExp): this;
    dontMatch(match: string | RegExp): this;
}
