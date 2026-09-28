"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { refreshSession } from "@/app/lib/cookies"
import { getTimestamp } from "@/app/lib/miscs"
import logger from "../lib/logger"
import type { ReactNode } from "react"
import type { Profile } from "@/app/lib/interfaces"

const SessionMaxAge = +(process.env.NEXT_PUBLIC_SESSION_MAX_AGE ?? 2_000_000)

type SessionContextType = {
  profile: Profile | undefined,
  deviceid: string | undefined,
  updateColor: (color: string) => void,
}

type SessionProviderProps = {
  children: ReactNode,
  profile: Profile | undefined,
  deviceid: string | undefined,
  timestamp: number,
}

export const SessionContext = createContext<SessionContextType>({
  profile: undefined,
  deviceid: undefined,
  updateColor: () => {},
})

export function SessionProvider({ children, profile, deviceid, timestamp }: SessionProviderProps) {
  let [ currentProfile, setCurrectProfile ] = useState(profile)
  
  useEffect(() => {
    logger.info("SESSION PROVIDER: CHECKING COOKIES AGE")
    if ( timestamp > 0 && getTimestamp() - timestamp > SessionMaxAge / 2 ) {
      logger.info("SESSION PROVIDER: REFRESHING COOKIES")
      refreshSession()
    }
  }, [timestamp])

  useEffect(() => {
    logger.info("SESSION PROVIDER: ARGUMENTS UPDATED")
    setCurrectProfile(profile)
  }, [profile])

  const updateColor = (color: string) => {
    setCurrectProfile(currentProfile => {
      if ( currentProfile === undefined ) {
        return undefined
      }
      return { ...currentProfile, color } 
    })
  }
  
  return (
    <SessionContext value={{ profile: currentProfile, deviceid, updateColor }}>
      { children }
    </SessionContext>
  )
}

export const useSession = () => useContext(SessionContext)
