"use server"

import { refresh } from "next/cache"
import * as requests from "@/app/lib/requests"
import * as cookies from "@/app/lib/cookies"
import * as processors from "@/app/lib/form-processors"
import type { Profile } from "@/app/lib/interfaces"

type CreateProfileState = {
  error: string | undefined,
  profile: Profile | undefined
}

type CreateSessionState = {
  error: string | undefined,
  profile: Profile | undefined,
}

type LogoutState = {
  error: string | undefined,
  done: boolean,
}

type DeleteProfileState = {
  error: string | undefined,
  done: boolean,
}

export async function createProfileAction(prevState: CreateProfileState, 
  formData: FormData) {
    let form = processors.createProfile(formData)
    if ( !form.data || form.error ) {
      return {
        error: form.error,
        profile: undefined,
      }
    }
    let profile = await requests.createProfile(form.data)
    if ( profile.session ) {
      await cookies.setSession(profile.session)
      refresh()
    }
    return {
      error: profile.error,
      profile: profile.profile,
    }
  }

export async function createSessionAction(prevState: CreateSessionState, 
  formData: FormData) {
    let form = processors.createSession(formData)
    if ( !form.data || form.error ) {
      return {
        error: form.error,
        profile: undefined,
      }
    }
    let session = await requests.createSession(form.data)
    if ( session.session ) {
      await cookies.setSession(session.session)
      refresh()
    }
    return {
      error: session.error,
      profile: session.profile,
    }
  }

export async function logoutAction(prevState: LogoutState, 
  formData: FormData) {
    let session = await cookies.getSession()
    if ( !session ) {
      return {
        error: "appError.unknownError",
        done: false,
      }
    }
    let error = await requests.deleteSession(session)
    if ( error ) {
      return { 
        error: error,
        done: false,
      }
    }
    await cookies.deleteSession()
    refresh()
    return { 
      error: undefined,
      done: true,
    }
  }

export async function deleteProfileAction(prevState: DeleteProfileState, 
  formData: FormData) {
    let session = await cookies.getSession()
    if ( !session ) {
      return {
        error: "appError.unknownError",
        done: false,
      }
    }
    let error = await requests.deleteProfile(session)
    if ( error ) {
      return {
        error: error,
        done: false,
      }
    }
    await cookies.deleteSession()
    refresh()
    return {
      error: undefined,
      done: true,
    }
  }