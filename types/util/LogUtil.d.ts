export type LogColor = `\x1b[${number}m` | 'green' | 'red' | 'blue' | 'yellow' | 'cyan' | 'magenta' | 'white' | 'black' | 'gray' | 'grey';
export declare const lineChar = "\u23AF";
export declare const errorChar = "\u2718";
export declare const successChar = "\u2714";
export declare const warningChar = "\u26A0";
export declare const colorMap: Record<LogColor, string>;
export declare const resetColor = "\u001B[0m";
export declare const colorMapKeys: LogColor[];
export declare const colorMapValues: LogColor[];
export declare const getColor: (color: LogColor) => string;
export declare const getLine: (n?: number, char?: string, color?: LogColor, reset?: boolean) => string;
export declare const compileLog: (content: string, color?: LogColor, reset?: boolean) => string;
export declare const log: (content: string, color?: LogColor, reset?: boolean) => string;
export declare const logError: (content: string, preChar?: string, color?: LogColor, reset?: boolean) => void;
export declare const logSucces: (content: string, preChar?: string, color?: LogColor, reset?: boolean) => void;
export declare const logWarning: (content: string, preChar?: string, color?: LogColor, reset?: boolean) => void;
export declare const logDecription: (content: string, color?: LogColor, reset?: boolean) => void;
export declare const printALine: (n?: number, char?: string, color?: LogColor, reset?: boolean) => string;
