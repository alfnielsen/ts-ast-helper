import * as ts from 'typescript';
export declare type VisitorState<TState extends object, TGlobalState extends object> = {
    isRoot: boolean;
    parent: ts.Node;
    ancestors: ts.Node[];
    ancestorsState: TState;
    globalState: TGlobalState;
    context: ts.TransformationContext;
    visitChildern: ChildrenVisitor<TState, TGlobalState>;
};
export declare type ChildrenVisitor<TState extends object = {}, TGlobalState extends object = {}> = () => ts.Node | undefined;
export declare type TranformVisitorWithStatePredicate<TIn extends ts.Node = ts.Node, TOut extends ts.Node = ts.Node, TState extends object = {}, TGlobalState extends object = {}> = (node: TIn, state: VisitorState<TState, TGlobalState>) => TOut | undefined | void;
export declare type TranformVisitorWithStateOptions<TNode extends ts.Node = ts.Node, TState extends object = {}, TGlobalState extends object = {}> = {
    node: TNode;
    sourceVisitor?: TranformVisitorWithStatePredicate<TNode, TNode, TState, TGlobalState>;
    visitor: TranformVisitorWithStatePredicate<ts.Node, ts.Node, TState, TGlobalState>;
    context?: ts.TransformationContext;
    ancestorsState?: TState;
    globalState?: TGlobalState;
    compilerOptions?: ts.CompilerOptions;
};
export declare function tranformWithState<TNode extends ts.Node = ts.Node, TState extends object = {}, TGlobalState extends object = {}>(options: TranformVisitorWithStateOptions<TNode, TState, TGlobalState>): TNode;
