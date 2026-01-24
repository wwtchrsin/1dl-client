import { writeFile } from "node:fs/promises"
import { join } from "node:path"

let __dirname = import.meta.dirname
let serverUrl = process.env.HTTP_SERVER ?? "http://localhost:3100"
let url = `${serverUrl}/api/v1/app/messages`

console.log(`Synchronizing with the server ${serverUrl}...`)

try {
  let response = await fetch(url)
  if ( response.status !== 200 ) {
    console.log("[x] Request failed!")
    process.exit(1)
  }
  let message = await response.json()
  if ( !message.messages ) {
    console.log("[x] Wrong data received!")
    process.exit(1)
  }

  let filename = join(__dirname, "app", "lib", "server-error-messages.ts")
  let content = "export default " +
    JSON.stringify(message.messages, undefined, 2) +
    " as Record<string, { en: string, ru: string }>"

  await writeFile(filename, content)
  console.log("[v] Done.")
} catch (err) {
  console.log("[x] Operation failed!")
}
