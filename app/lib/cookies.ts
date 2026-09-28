"use server"

import { randomBytes } from "node:crypto"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { getTimestamp } from "@/app/lib/miscs"
import limits from "@/app/lib/server-limits"
import type { Region } from "@/app/lib/interfaces"

const JwtKey = process.env.JWT_KEY ?? "ha-ha"
const SessionMaxAge = +(process.env.NEXT_PUBLIC_SESSION_MAX_AGE ?? 2_000_000)

export type SessionData = {
  region: Region | undefined,
  sessionid: string | undefined,
  deviceid: string,
}

export type Session = SessionData & {
  timestamp: number,
}

const verifySessionCookie = (token: string): Session | undefined => {
  try {
    return jwt.verify(token, JwtKey) as Session
  } catch (err) {
    return undefined
  }
}


export const resetSession = async () => {
  let storage = await cookies()
  let deviceid = randomBytes(limits.session.sessionid.size).toString("hex")
  let payload = {
    deviceid,
    timestamp: getTimestamp(),
  }
  let cookie = jwt.sign(payload, JwtKey)
  storage.set("session", cookie, {
    httpOnly: true,
    maxAge: SessionMaxAge,
  })
}

export const getSession = async (): 
  Promise<{ error: string | undefined, data: Session | undefined }> => {
    let storage = await cookies()
    let cookie = storage.get("session")?.value
    if ( !cookie ) return {
      error: undefined,
      data: undefined,
    }
    let session = verifySessionCookie(cookie)
    if ( !session ) return {
      error: "appError.wrongSession",
      data: undefined,
    }
    return {
      error: undefined,
      data: session,
    }
  }

export const setSession = async ({ region, sessionid, deviceid }: SessionData) => {
  let storage = await cookies()
  let payload = { 
    region,
    sessionid,
    deviceid,
    timestamp: getTimestamp()
  }
  let cookie = jwt.sign(payload, JwtKey)
  storage.set("session", cookie, {
    httpOnly: true,
    maxAge: SessionMaxAge,
  })
}

export const refreshSession = async () => {
  let storage = await cookies()
  let cookie = storage.get("session")?.value
  if ( !cookie ) {
    return
  }
  let session = verifySessionCookie(cookie)
  if ( !session ) {
    await resetSession()
    return
  }
  let timestamp = getTimestamp()
  if ( timestamp - session.timestamp > SessionMaxAge / 2 ) {
    let payload = { ...session, timestamp }
    let cookie = jwt.sign(payload, JwtKey)
    storage.set("session", cookie, {
      httpOnly: true,
      maxAge: SessionMaxAge,
    })
  }
}