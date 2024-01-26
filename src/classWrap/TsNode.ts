import * as ts from 'typescript'
import { nodeMatchContent } from '../base/nodeMatch/nodeMatchContent'
import { nodeTextMatch } from '../base/nodeMatch/nodeTextMatch'

export class TsNode {
  matchedAllConditions = true
  constructor(public node: ts.Node) {}

  /**
   * Did the node match all previues matches
   * @returns boolean
   */
  get isValid() {
    return this.matchedAllConditions
  }

  contains(match: string | RegExp) {
    if (!nodeMatchContent(this.node, match)) {
      this.matchedAllConditions = false
    }
    return this
  }
  dontContains(match: string | RegExp) {
    if (nodeMatchContent(this.node, match)) {
      this.matchedAllConditions = false
    }
    return this
  }

  match(match: string | RegExp) {
    if (!nodeTextMatch(this.node, match)) {
      this.matchedAllConditions = false
    }
    return this
  }

  dontMatch(match: string | RegExp) {
    if (!nodeTextMatch(this.node, match)) {
      this.matchedAllConditions = false
    }
    return this
  }
}
