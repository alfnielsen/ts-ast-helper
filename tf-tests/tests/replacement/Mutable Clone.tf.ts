import * as ts from 'typescript'
/**
 * getMutableClone is deprecated in TS!!
 */

function getDeepMutableClone<T extends ts.Node>(node: T): T {
  return ts.transform(node, [
    (context) => (node) => deepCloneWithContext(node, context),
  ]).transformed[0]

  function deepCloneWithContext<T extends ts.Node>(
    node: T,
    context: ts.TransformationContext,
  ): T {
    const clonedNode = ts.visitEachChild(
      stripRanges(ts.getMutableClone(node)),
      (child) => deepCloneWithContext(child, context),
      context,
    )
    clonedNode.parent = undefined as any
    ts.forEachChild(clonedNode, (child) => {
      child.parent = clonedNode
    })
    return clonedNode
  }
}

// another way...

function getDeepMutableClone<T extends ts.Node>(node: T): T {
  return cloneWithParent(node, undefined)

  function cloneWithParent<T extends ts.Node>(
    node: T,
    parent: ts.Node | undefined,
  ) {
    const clone = stripRanges(ts.getMutableClone(node))
    clone.parent = parent as ts.Node

    for (const propName of Object.keys(clone)) {
      if (propName === 'parent' || propName === 'original') continue

      const propValue = clone[propName]
      if (propValue instanceof Array) {
        if (propValue.length > 0 && isNode(propValue[0])) {
          clone[propName] = propValue.map((child) =>
            cloneWithParent(child, clone),
          )
        }
      } else if (isNode(propValue)) {
        clone[propName] = cloneWithParent(propValue, clone)
      }
    }

    return clone
  }
}

// common

function isNode(value: any): value is ts.Node {
  return (
    value != null &&
    typeof value.pos === 'number' &&
    typeof value.end === 'number' &&
    typeof value.kind === 'number'
  )
}

// See https://stackoverflow.com/a/57367717/188246 for
// why this is necessary.
function stripRanges<T extends ts.Node>(node: T) {
  node.pos = -1
  node.end = -1
  return node
}
