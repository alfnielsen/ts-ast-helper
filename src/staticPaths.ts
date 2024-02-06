import { join } from 'path'

export const srcPath = import.meta.dir
export const rootPath = join(srcPath, '..')
export const templatesPath = join(rootPath, 'templates')
export const testsPath = join(rootPath, 'tests')
export const typesPath = join(rootPath, 'types')
export const tfTestsPath = join(rootPath, 'tf-tests')
export const basePath = join(srcPath, 'base')
export const baseNodeMatchPath = join(basePath, 'nodeMatch')
export const experimentalPath = join(srcPath, 'experimental')
export const utilPath = join(srcPath, 'util')

export const paths = {
  srcPath,
  rootPath,
  basePath,
  testsPath,
  tfTestsPath,
  templatesPath,
  baseNodeMatchPath,
  experimentalPath,
  utilPath,
  typesPath,
}

export default paths
