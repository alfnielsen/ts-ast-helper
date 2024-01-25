import { join } from 'path'

export const srcPath = import.meta.dir
export const rootPath = join(srcPath, '..')
export const basePath = join(srcPath, 'base')
export const baseNModeMatchPath = join(basePath, 'nodeMatch')

export const paths = {
  srcPath,
  rootPath,
  basePath,
  baseNModeMatchPath,
}

export default paths
