"use client"

import { createContext, useContext, useEffect } from "react"
import type { ReactNode } from "react"
import { deleteSession, updateSession } from "@/app/lib/cookies"
import type { Profile } from "@/app/lib/interfaces"

type ProfileContextType = {
  profile: Profile | undefined,
}

type ProfileProviderProps = {
  children: ReactNode,
  profile: Profile | undefined,
  session: string | undefined,
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: undefined,
})

export function ProfileProvider({ children, profile, session }: ProfileProviderProps) {
  /*useEffect(() => {
    (async () => {
      if ( !profile && session ) {
        await deleteSession()
        return
      }
      if ( profile && session ) {
        await updateSession()
        return
      }
    })()
  }, [])*/
  return (
    <ProfileContext value={{ profile }}>
      { children }
    </ProfileContext>
  )
}

export const useProfile = () => useContext(ProfileContext)
