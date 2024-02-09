import * as ts from 'typescript'

export function getJsxFlagNames(flag: ts.JsxFlags): string[] {
  const flagStrings = Object.entries(ts.JsxFlags)
    .filter(([key, val]) => (flag & (val as ts.JsxFlags)) !== 0)
    .map(([key, val]) => key)
  return flagStrings
}
