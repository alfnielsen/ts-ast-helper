export function replaceAt(
  content: string,
  replacement: string,
  start: number = 0,
  end: number = start,
) {
  return content.substring(0, start) + replacement + content.substring(end)
}
