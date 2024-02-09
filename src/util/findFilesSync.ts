import { Glob, type GlobScanOptions } from 'bun'

export function findFilesSync(
  pattern: string | string[],
  options?: GlobScanOptions,
) {
  if (!Array.isArray(pattern)) {
    pattern = [pattern]
  }
  const files: string[] = []
  for (const pat of pattern) {
    const glob = new Glob(pat)
    const patFiles = Array.from(glob.scanSync(options))
    files.push(...patFiles)
  }
  return files
}
