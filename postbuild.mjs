import { cpSync } from "node:fs"
import { join } from "node:path"

const __dirname = import.meta.dirname

cpSync(
  join(__dirname, ".next/static"),
  join(__dirname, ".next/standalone/.next/static"),
  { recursive: true }
)

cpSync(
  join(__dirname, "public"),
  join(__dirname, ".next/standalone/public"),
  { recursive: true }
)

console.log("[v] Postbuild Script: Done")