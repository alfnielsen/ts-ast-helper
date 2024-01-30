import { test, expect } from 'bun:test'

export function codeIsEquael(c1: string, c2: string) {
  const tc1 = trimLines(c1)
  const tc2 = trimLines(c2)
  return tc1 === tc2
}

export function trimLines(code: string, stripAllWhiteSpace = false) {
  return code
    .trim()
    .split('\n')
    .map((line) => line.trim().replace(/;$/g, ''))
    .filter((line) => !!line)
    .map((line) => (stripAllWhiteSpace ? line.replace(/\s+/g, '') : line))
    .join('\n')
}

export function expectCodeIsEquael(
  code1: string,
  code2: string,
  stripAllWhiteSpace = false,
) {
  const tc1 = trimLines(code1, stripAllWhiteSpace)
  const tc2 = trimLines(code2, stripAllWhiteSpace)
  expect(tc1).toBe(tc2)
}
