"use server"

import { refresh } from "next/cache"
import * as requests from "@/app/lib/requests"
import * as cookies from "@/app/lib/cookies"
import * as processors from "@/app/lib/form-processors"
import type { Profile } from "@/app/lib/interfaces"

type CreateProfileState = {
  error: string | undefined,
  profile: Profile | undefined,
  timestamp: number,
}

type CreateSessionState = {
  error: string | undefined,
  profile: Profile | undefined,
  timestamp: number,
}

type LogoutState = {
  error: string | undefined,
  done: boolean,
  timestamp: number,
}

type DeleteProfileState = {
  error: string | undefined,
  done: boolean,
  timestamp: number,
}

type SendMessageState = {
  error: string | undefined,
  done: boolean,
  timestamp: number,
}

type DeleteMessageState = {
  error: string | undefined,
  done: boolean,
  timestamp: number,
}

const timestamp = () => (new Date()).valueOf()

export async function createProfileAction(prevState: CreateProfileState, 
  formData: FormData) {
    let form = processors.createProfile(formData)
    if ( !form.data || form.error ) {
      return {
        error: form.error,
        profile: undefined,
        timestamp: timestamp(),
      }
    }
    let profile = await requests.createProfile(form.data)
    if ( profile.sessionid && profile.token ) {
      await cookies.setSession({
        region: form.data.region,
        sessionid: profile.sessionid,
        token: profile.token,
      })
      refresh()
    }
    return {
      error: profile.error,
      profile: profile.profile,
      timestamp: profile.timestamp,
    }
  }

export async function createSessionAction(prevState: CreateSessionState, 
  formData: FormData) {
    let form = processors.createSession(formData)
    if ( !form.data || form.error ) {
      return {
        error: form.error,
        profile: undefined,
        timestamp: timestamp(),
      }
    }
    let session = await requests.createSession(form.data)
    if ( session.sessionid && session.token ) {
      await cookies.setSession({
        region: form.data.region,
        sessionid: session.sessionid,
        token: session.token,
      })
      refresh()
    }
    return {
      error: session.error,
      profile: session.profile,
      timestamp: session.timestamp,
    }
  }

export async function logoutAction(prevState: LogoutState, formData: FormData) {
  let session = await cookies.getSession()
  if ( !session ) {
    return {
      error: "wrongValue.auth.sessionid",
      done: false,
      timestamp: timestamp(),
    }
  }
  await requests.deleteSession(session.sessionid)
  await cookies.deleteSession()
  refresh()
  return { 
    error: undefined,
    done: true,
    timestamp: timestamp(),
  }
}

export async function deleteProfileAction(prevState: DeleteProfileState, 
  formData: FormData) {
    let session = await cookies.getSession()
    if ( !session ) {
      return {
        error: "wrongValue.auth.sessionid",
        done: false,
        timestamp: timestamp(),
      }
    }
    let response = await requests.deleteProfile(session.sessionid)
    if ( response.error ) {
      return {
        error: response.error,
        done: false,
        timestamp: response.timestamp,
      }
    }
    await cookies.deleteSession()
    refresh()
    return {
      error: undefined,
      done: true,
      timestamp: response.timestamp,
    }
  }

export async function sendMessageAction(prevState: SendMessageState, 
  formData: FormData) {
    let session = await cookies.getSession()
    if ( !session ) {
      return {
        error: "wrongValue.auth.sessionid",
        done: false,
        timestamp: timestamp(),
      }
    }
    let form = processors.sendMessage(formData)
    if ( !form.data || form.error ) {
      return {
        error: form.error,
        done: false,
        timestamp: timestamp(),
      }
    }
    let message = await requests.sendMessage(session.sessionid, form.data)
    return {
      error: message.error,
      done: !!message.data,
      timestamp: message.timestamp,
    }
  }

export async function deleteMessageAction(prevState: DeleteMessageState,
  formData: FormData) {
    let session = await cookies.getSession()
    if ( !session ) {
      return {
        error: "wrongValue.auth.sessionid",
        done: false,
        timestamp: timestamp(),
      }
    }
    let form = processors.deleteMessage(formData)
    if ( !form.data || form.error ) {
      return {
        error: form.error,
        done: false,
        timestamp: timestamp(),
      }
    }
    let response = await requests.deleteMessage(session.sessionid, form.data)
    return {
      error: response.error,
      done: !!response.error,
      timestamp: timestamp(),
    }
  }