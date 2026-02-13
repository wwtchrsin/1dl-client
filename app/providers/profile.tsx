"use client"

import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import type { Profile } from "@/app/lib/interfaces"

type ProfileContextType = {
  profile: Profile | undefined,
  identifier: string | undefined,
}

type ProfileProviderProps = {
  children: ReactNode,
  profile: Profile | undefined,
  identifier: string | undefined,
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: undefined,
  identifier: undefined,
})

export function ProfileProvider({ children, profile, identifier }: ProfileProviderProps) {
  return (
    <ProfileContext value={{ profile, identifier }}>
      { children }
    </ProfileContext>
  )
}

export const useProfile = () => useContext(ProfileContext)
