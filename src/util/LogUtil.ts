export type LogColor =
  | `\x1b[${number}m`
  | 'green'
  | 'red'
  | 'blue'
  | 'yellow'
  | 'cyan'
  | 'magenta'
  | 'white'
  | 'black'
  | 'gray'
  | 'grey'

export const lineChar = '⎯'
export const errorChar = '✘'
export const successChar = '✔'
export const warningChar = '⚠'

export const colorMap: Record<LogColor, string> = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  black: '\x1b[30m',
  gray: '\x1b[90m',
  grey: '\x1b[90m',
}
export const resetColor = '\x1b[0m'

export const $t = {
  ...colorMap,
  reset: resetColor,
}

export const colorMapKeys = Object.keys(colorMap) as LogColor[]
export const colorMapValues = Object.values(colorMap) as LogColor[]
export const getColor = (color: LogColor) => {
  if (colorMap[color]) {
    return colorMap[color]
  }
  return color
}

export const getLine = (
  n = 50,
  char = lineChar,
  color?: LogColor,
  reset = true,
) => {
  let l = ''
  if (color) {
    l += getColor(color)
  }
  l += char.repeat(n)
  if (reset) {
    l += resetColor
  }
  return l
}

export const compileLog = (content: string, color?: LogColor, reset = true) => {
  let l = ''
  if (color) {
    l += getColor(color)
  }
  l += content
  if (reset) {
    l += resetColor
  }
  return l
}

export const log = (content: string, color?: LogColor, reset = true) => {
  let l = compileLog(content, color, reset)
  console.log(l)
  return l
}

export const logError = (
  content: string,
  preChar = errorChar,
  color: LogColor = 'red',
  reset = true,
) => {
  log(`${preChar} ${content}`, color, reset)
}

export const logSucces = (
  content: string,
  preChar = successChar,
  color: LogColor = 'green',
  reset = true,
) => {
  log(`${preChar} ${content}`, color, reset)
}

export const logWarning = (
  content: string,
  preChar = warningChar,
  color: LogColor = 'yellow',
  reset = true,
) => {
  log(`${preChar} ${content}`, color, reset)
}

export const logDecription = (
  content: string,
  color: LogColor = 'gray',
  reset = true,
) => {
  log(content, color, reset)
}

export const printALine = (
  n = 50,
  char = lineChar,
  color?: LogColor,
  reset = true,
) => log(getLine(n, char, color, reset))
