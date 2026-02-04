"use client"

import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import type { Profile } from "@/app/lib/interfaces"

type ProfileContextType = {
  profile: Profile | undefined,
}

type ProfileProviderProps = {
  children: ReactNode,
  profile: Profile | undefined,
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: undefined,
})

export function ProfileProvider({ children, profile }: ProfileProviderProps) {
  return (
    <ProfileContext value={{ profile }}>
      { children }
    </ProfileContext>
  )
}

export const useProfile = () => useContext(ProfileContext)
