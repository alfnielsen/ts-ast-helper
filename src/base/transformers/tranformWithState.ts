import * as ts from 'typescript'

export type VisitorState<TState extends object, TGlobalState extends object> = {
  isRoot: boolean
  parent: ts.Node
  ancestors: ts.Node[]
  ancestorsState: TState
  globalState: TGlobalState
  context: ts.TransformationContext
  visitChildern: ChildrenVisitor<TState, TGlobalState>
}
export type ChildrenVisitor<
  TState extends object = {},
  TGlobalState extends object = {},
> = () => ts.Node | undefined

export type TranformVisitorWithStatePredicate<
  TIn extends ts.Node = ts.Node,
  TOut extends ts.Node = ts.Node,
  TState extends object = {},
  TGlobalState extends object = {},
> = (
  node: TIn,
  state: VisitorState<TState, TGlobalState>,
) => TOut | undefined | void

export type TranformVisitorWithStateOptions<
  TNode extends ts.Node = ts.Node,
  TState extends object = {},
  TGlobalState extends object = {},
> = {
  node: TNode
  sourceVisitor?: TranformVisitorWithStatePredicate<
    TNode,
    TNode,
    TState,
    TGlobalState
  >
  visitor: TranformVisitorWithStatePredicate<
    ts.Node,
    ts.Node,
    TState,
    TGlobalState
  >
  context?: ts.TransformationContext
  ancestorsState?: TState
  globalState?: TGlobalState
  compilerOptions?: ts.CompilerOptions
}

export function tranformWithState<
  TNode extends ts.Node = ts.Node,
  TState extends object = {},
  TGlobalState extends object = {},
>(options: TranformVisitorWithStateOptions<TNode, TState, TGlobalState>) {
  const {
    node,
    ancestorsState = {} as TState,
    globalState = {} as TGlobalState,
    visitor: childVisitor,
    sourceVisitor: rootVisitor,
    compilerOptions,
  } = options
  // create a new lexical environment for the source file !!
  const createVisitContext = (
    parent: ts.Node,
    state: VisitorState<TState, TGlobalState>,
    isRoot: boolean,
    visitChildern: ChildrenVisitor<TState, TGlobalState>,
  ) => {
    const nextAncestorList = [parent, ...state.ancestors]
    const nextState: VisitorState<TState, TGlobalState> = {
      isRoot,
      parent,
      ancestors: nextAncestorList,
      ancestorsState: structuredClone(state.ancestorsState),
      globalState: state.globalState,
      context: state.context,
      visitChildern,
    }
    return nextState
  }

  const createVisitor = (
    state: VisitorState<TState, TGlobalState>,
    isRoot: boolean,
    visitor: TranformVisitorWithStatePredicate<
      ts.Node,
      ts.Node,
      TState,
      TGlobalState
    >,
    sourceVisitor?: TranformVisitorWithStatePredicate<
      TNode,
      TNode,
      TState,
      TGlobalState
    >,
  ): ts.Visitor => {
    return (node: ts.Node) => {
      let updatedNode: ts.Node = node
      let visiteEachChildrenCalled = false
      const nextState = createVisitContext(node, state, isRoot, () => {
        visitor(node, nextState)
        updatedNode = ts.visitEachChild(
          node,
          createVisitor(nextState, false, visitor),
          nextState.context,
        )
        visiteEachChildrenCalled = true
        return updatedNode
      })
      if (sourceVisitor) {
        return nextState.visitChildern()
      }
      if (!visiteEachChildrenCalled) {
        return nextState.visitChildern()
      }
      return updatedNode
    }
  }

  const transformerFactory: ts.TransformerFactory<TNode> = (
    context: ts.TransformationContext,
  ) => {
    const transformer: ts.Transformer<TNode> = (node: TNode) => {
      const rootNextState: VisitorState<TState, TGlobalState> = {
        isRoot: true,
        parent: node.parent, // ?? it becomes it own parent !
        ancestors: [],
        ancestorsState,
        globalState,
        context,
        visitChildern: () => {
          // console.log('ROOT:visitChildern', ts.SyntaxKind[node.kind])
          return ts.visitEachChild(
            node,
            createVisitor(rootNextState, false, childVisitor),
            rootNextState.context,
          )
        },
      }
      let _rootVisitor = rootVisitor ?? childVisitor
      let rootUpdated = _rootVisitor(node, rootNextState)
      if (rootUpdated) {
        // console.log('ROOT:rootUpdated', ts.SyntaxKind[rootUpdated.kind])
        return rootUpdated as TNode
      }
      // visitChildern not called, call it now
      return rootNextState.visitChildern() as TNode
    }
    return transformer
  }

  const updatedNode = ts.transform(node, [transformerFactory], compilerOptions)
  return updatedNode.transformed[0] as TNode
}
