"use server"

import { cookies } from "next/headers"
import { parseJSON } from "./miscs"
import type { Region } from "@/app/lib/interfaces"

const SessionMaxAge = 86400 * 30

export type Session = {
  region: Region,
  sessionid: string,
  token: string,
}

export const setSession = async ({ region, sessionid, token }: Session) => {
  let timestamp = Math.floor((new Date()).valueOf() / 1000)
  let storage = await cookies()
  let session = JSON.stringify({ region, sessionid, token, timestamp })
  storage.set("session", session, {
    httpOnly: true,
    maxAge: SessionMaxAge,
  })
}

export const getSession = async (): Promise<Session | undefined> => {
  let storage = await cookies()
  let value = storage.get("session")?.value
  let session = parseJSON(value) as Session | undefined
  if ( !session ) return undefined
  return {
    region: session.region,
    sessionid: session.sessionid,
    token: session.token,
  }
}

export const deleteSession = async () => {
  let storage = await cookies()
  storage.delete("session")
}

export const updateSession = async () => {
  let storage = await cookies()
  let session = parseJSON(storage.get("session")?.value)
  if ( session && !isNaN(+session.timestamp) ) {
    let timestamp = Math.floor((new Date()).valueOf() / 1000)
    if ( timestamp - +session.timestamp > SessionMaxAge / 2 ) {
      let value = JSON.stringify({
        region: session.region,
        sessionid: session.sessionid,
        token: session.token,
        timestamp: timestamp,
      })
      storage.set("session", value, {
        httpOnly: true,
        maxAge: SessionMaxAge,
      })
    }
  }
}