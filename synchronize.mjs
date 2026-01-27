import { writeFile } from "node:fs/promises"
import { join } from "node:path"

let __dirname = import.meta.dirname
let serverUrl = process.env.HTTP_SERVER ?? "http://localhost:3100"
let urls = new Map([
  ["server-error-messages", `${serverUrl}/api/v1/app/messages`],
  ["server-limits", `${serverUrl}/api/v1/app/limits`],
])
let extractData = (tag, message) => {
  switch ( tag ) {
    case "server-error-messages": {
      return message.messages
    }
    case "server-limits": {
      return message.limits
    }
    default: {
      return undefined
    }
  }
}

console.log(`[#] synchronizing with the server ${serverUrl}...`)

try {
  for ( let [ tag, url ] of urls ) {
    console.log(`[#] updating '${tag}'`)
    let response = await fetch(url)
    if ( response.status !== 200 ) {
      console.log("[x] request failed!")
      process.exit(1)
    }
    let message = await response.json()
    let data = extractData(tag, message)
    if ( !data ) {
      console.log("[x] wrong data received!")
      process.exit(1)
    }

    let filename = join(__dirname, "app", "lib", `${tag}.ts`)
    let content = "export default " + JSON.stringify(data, undefined, 2)

    await writeFile(filename, content)
  }
  console.log("[v] Done.")
} catch (err) {
  console.log("[x] Operation failed!")
}
