"use client"

import { createContext, useContext, useEffect } from "react"
import { refreshSession } from "@/app/lib/cookies"
import { getTimestamp } from "@/app/lib/miscs"
import type { ReactNode } from "react"
import type { Profile } from "@/app/lib/interfaces"

const SessionMaxAge = +(process.env.NEXT_PUBLIC_SESSION_MAX_AGE ?? 2_000_000)

type SessionContextType = {
  profile: Profile | undefined,
  deviceid: string | undefined,
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
})

export function SessionProvider({ children, profile, deviceid, timestamp }: SessionProviderProps) {
  useEffect(() => {
    if ( timestamp > 0 && getTimestamp() - timestamp > SessionMaxAge / 2 ) {
      refreshSession()
    }
  }, [timestamp])
  
  return (
    <SessionContext value={{ profile, deviceid }}>
      { children }
    </SessionContext>
  )
}

export const useSession = () => useContext(SessionContext)
