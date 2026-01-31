"use client"

import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import type { Profile } from "@/app/lib/interfaces"

type ProfileContextType = {
  profile: Profile | undefined,
  token: string | undefined,
}

type ProfileProviderProps = {
  children: ReactNode,
  profile: Profile | undefined,
  token: string | undefined,
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: undefined,
  token: undefined,
})

export function ProfileProvider({ children, profile, token }: ProfileProviderProps) {
  return (
    <ProfileContext value={{ profile, token }}>
      { children }
    </ProfileContext>
  )
}

export const useProfile = () => useContext(ProfileContext)
