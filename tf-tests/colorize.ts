/**
 * Terminal color codes
 */
export const $ = {
  // text
  black: "\x1B[30m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  purple: "\x1B[35m",
  cyan: "\x1B[36m",
  white: "\x1B[37m",
  gray: "\x1B[90m",
  redBright: "\x1B[91m",
  greenBright: "\x1B[92m",
  yellowBright: "\x1B[93m",
  blueBright: "\x1B[94m",
  purpleBright: "\x1B[95m",
  cyanBright: "\x1B[96m",
  whiteBright: "\x1B[97m",
  //bg
  bgBlack: "\x1B[40m",
  bgRed: "\x1B[41m",
  bgGreen: "\x1B[42m",
  bgYellow: "\x1B[43m",
  bgBlue: "\x1B[44m",
  bgPurple: "\x1B[45m",
  bgCyan: "\x1B[46m",
  bgWhite: "\x1B[47m",
  bgGray: "\x1B[100m",
  bgRedBright: "\x1B[101m",
  bgGreenBright: "\x1B[102m",
  bgYellowBright: "\x1B[103m",
  bgBlueBright: "\x1B[104m",
  bgPurpleBright: "\x1B[105m",
  bgCyanBright: "\x1B[106m",
  bgWhiteBright: "\x1B[107m",
  // reset
  reset: "\x1B[0m",
  // font
  bold: "\x1B[1m",
  dim: "\x1B[2m",
  underline: "\x1B[4m",
  /** Not widely supported! */
  blink: "\x1B[5m",
  invert: "\x1B[7m",
  invisible: "\x1B[8m",
  //noBold: '\x1B[21m', (broken)
  noDim: "\x1B[22m",
  noUnderline: "\x1B[24m",
  noBlink: "\x1B[25m",
  noInvert: "\x1B[27m",
  visible: "\x1B[28m",
} as const

export const chars = {
  info: "ℹ", // color: gray
  ok: "✔", // color: green
  no: "✖", // color: red
  success: "✔", // color: green
  fail: "✘", // color: red
  error: "✘", // color: red
  warn: "⚠", // color: yellow
  left: "⬅", // color: cyan
  up: "⬆", // color: cyan
  down: "⬇", // color: cyan
  right: "⮕", // color: cyan
  refresh: "↻", // color: cyan
  play: "▶", // color: cyan
  stop: "⏹", // color: red
  pause: "⏸", // color: yellow
  next: "⏭", // color: cyan
  prev: "⏮", // color: cyan
  //heart: "❤",
} as const

export const charColorMap = {
  info: "gray",
  ok: "green",
  no: "red",
  success: "green",
  fail: "red",
  error: "red",
  warn: "yellow",
  left: "cyan",
  up: "cyan",
  down: "cyan",
  right: "cyan",
  refresh: "cyan",
  play: "cyan",
  stop: "red",
  pause: "yellow",
  next: "cyan",
  prev: "cyan",
} as const

/**
 * Colorize text with color (and reset)
 * @param text
 * @param color
 * @returns
 */
export function colorize(color: keyof typeof $, ...input: any[]) {
  return input.map(x => {
    if (typeof x == "string") {
      return `${$[color]}${input}${$.reset}`
    }
    return x
  })
}

const colorRegex = new RegExp(`\\$\\.?(${Object.keys($).join("|")}):?`, "g")
/**
 * Match all $<color> and replace with color code
 * @param text
 * @param color
 * @returns
 */
export function $insert(...input: string[]) {
  return input.map(x => {
    if (typeof x == "string") {
      return x.replace(colorRegex, (match, color) => {
        if (!$[color as keyof typeof $]) {
          return match
        }
        return $[color as keyof typeof $]
      })
    }
    return x
  })
}

/**
 * Match all $<color> and replace with color code
 * @param text
 * @param color
 * @returns
 */
export const $log = (function () {
  function $log(...input: any[]) {
    console.log(...$insert(...input))
  }
  Object.keys($).forEach(x => {
    //@ts-ignore
    $log[x] = (...input: any[]) => console.log(...colorize(x as keyof typeof $, ...input))
  })
  Object.keys(charColorMap).forEach(x => {
    //@ts-ignore
    $log[x] = (...input: any[]) => console.log($[charColorMap[x]], chars[x], $.reset, ...input)
  })
  return $log
})() as ((...input: string[]) => void) & { [K in keyof typeof $]: (...input: any[]) => void } & {
  [K in keyof typeof charColorMap]: (...input: any[]) => void
}
