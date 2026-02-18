const logLevels: any = {
  "INFO": 30,
  "WARN": 40,
  "ERROR": 50,
  "SILENT": 100,
}

const LOGLEVEL = logLevels[process.env.NEXT_PUBLIC_LOGLEVEL ?? "SILENT"] ?? 100

export default {
  info: (message: string, ...args: any[]) => {
    LOGLEVEL <= 30 && console.log(`[INFO] ${message}`, ...args)
  },
  warn: (message: string, ...args: any[]) => {
    LOGLEVEL <= 40 && console.warn(`[WARN] ${message}`, ...args)
  },
  error: (message: string, ...args: any[]) => {
    LOGLEVEL <= 50 && console.error(`[ERROR] ${message}`, ...args)
  },
}