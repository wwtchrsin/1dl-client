"use server"

import { cookies } from "next/headers"

const SessionMaxAge = 86400 * 30

export const setSession = async (session: string) => {
  let timestamp = Math.floor((new Date()).valueOf() / 1000)
  let storage = await cookies()
  storage.set("session", session, {
    httpOnly: true,
    maxAge: SessionMaxAge,
  })
  storage.set("session-ts", `${timestamp}`, {
    httpOnly: true,
    maxAge: SessionMaxAge,
  })
}

export const getSession = async (): Promise<string | undefined> => {
  let storage = await cookies()
  return storage.get("session")?.value
}

export const deleteSession = async () => {
  let storage = await cookies()
  storage.delete("session")
  storage.delete("session-ts")
}

export const updateSession = async () => {
  let storage = await cookies()
  let sessionTs = storage.get("session-ts")?.value
  let session = storage.get("session")?.value
  if ( session && sessionTs ) {
    let timestamp = Math.floor((new Date()).valueOf() / 1000)
    if ( timestamp - +sessionTs > SessionMaxAge / 2 ) {
      storage.set("session", session, {
        httpOnly: true,
        maxAge: SessionMaxAge,
      })
      storage.set("session-ts", `${timestamp}`, {
        httpOnly: true,
        maxAge: SessionMaxAge,
      })
    }
  }
}