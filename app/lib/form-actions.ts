"use server"

import { refresh } from "next/cache"
import { createProfile, createSession } from "@/app/lib/requests"
import * as cookies from "@/app/lib/cookies"
import type { Profile } from "@/app/lib/interfaces"

type CreateProfileState = {
  error: string | undefined,
  profile: Profile | undefined
}

type CreateSessionState = {
  error: string | undefined,
  profile: Profile | undefined,
}

export async function createProfileAction(prevState: CreateProfileState, formData: FormData) {
  let region = formData.get("region") as string | null
  let login = formData.get("login") as string | null
  let password = formData.get("password") as string | null
  let password2 = formData.get("password2") as string | null
  let name = formData.get("name") as string | null

  if ( password !== password2 ) {
    return {
      error: "appErrors.passwordsNotMatch",
      profile: undefined,
    }
  }

  let profile = await createProfile({ region, login, password, name })

  if ( profile.session ) {
    await cookies.setSession(profile.session)
    refresh()
  }

  return {
    error: profile.error,
    profile: profile.profile,
  }
}

export async function createSessionAction(prevState: CreateSessionState, formData: FormData) {
  let region = formData.get("region") as  string | null
  let login = formData.get("login") as string | null
  let password = formData.get("password") as string | null

  let session = await createSession({ region, login, password })

  if ( session.session ) {
    await cookies.setSession(session.session)
    refresh()
  }

  return {
    error: session.error,
    profile: session.profile,
  }
}