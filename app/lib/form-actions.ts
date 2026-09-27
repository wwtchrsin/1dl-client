"use server"

import { refresh } from "next/cache"
import * as requests from "@/app/lib/requests"
import * as cookies from "@/app/lib/cookies"
import * as processors from "@/app/lib/form-processors"
import { getTimestamp } from "@/app/lib/miscs"
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

type InitCookiesState = {
  error: string | undefined,
  done: boolean,
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

export async function createProfileAction(prevState: CreateProfileState, 
  formData: FormData) {
    let sessionCookie = await cookies.getSession()
    if ( !sessionCookie.data ) {
      return {
        error: "appError.wrongSession",
        profile: undefined,
        timestamp: getTimestamp(),
      }
    }
    let form = processors.createProfile(formData)
    let token = processors.turnstileToken(formData)
    if ( !form.data || !token.data || form.error || token.error ) {
      return {
        error: form.error ?? token.error,
        profile: undefined,
        timestamp: getTimestamp(),
      }
    }
    let validation = await requests.validateTurnstileToken(token.data)
    if ( validation.error ) {
      return {
        error: validation.error,
        profile: undefined,
        timestamp: getTimestamp(),
      }
    }
    let { deviceid } = sessionCookie.data
    let profile = await requests.createProfile(deviceid, form.data)
    if ( profile.sessionid ) {
      await cookies.setSession({
        region: form.data.region,
        sessionid: profile.sessionid,
        deviceid: deviceid,
      })
      refresh()
    }
    return {
      error: profile.error,
      profile: profile.profile,
      timestamp: profile.timestamp,
    }
  }

export async function initCookiesAction(prevState: InitCookiesState,
  formData: FormData) {
    await cookies.resetSession()
    refresh()
    return {
      error: undefined,
      done: true,
      timestamp: getTimestamp(),
    }
  }

export async function createSessionAction(prevState: CreateSessionState, 
  formData: FormData) {
    let sessionCookie = await cookies.getSession()
    if ( !sessionCookie.data ) {
      return {
        error: "appError.wrongSession",
        profile: undefined,
        timestamp: getTimestamp(),
      }
    }
    let form = processors.createSession(formData)
    let token = processors.turnstileToken(formData)
    if ( !form.data || !token.data || form.error || token.error ) {
      return {
        error: form.error ?? token.error,
        profile: undefined,
        timestamp: getTimestamp(),
      }
    }
    let validation = await requests.validateTurnstileToken(token.data)
    if ( validation.error ) {
      return {
        error: validation.error,
        profile: undefined,
        timestamp: validation.timestamp,
      }
    }
    let { deviceid } = sessionCookie.data
    let session = await requests.createSession(deviceid, form.data)
    if ( session.sessionid ) {
      await cookies.setSession({
        region: form.data.region,
        sessionid: session.sessionid,
        deviceid: deviceid,
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
  if ( session.data?.sessionid ) {
    await requests.deleteSession(session.data.sessionid)
  }
  if ( session.data ) {
    await cookies.setSession({
      region: undefined,
      sessionid: undefined,
      deviceid: session.data.deviceid,
    })
    refresh()
  }
  return { 
    error: undefined,
    done: true,
    timestamp: getTimestamp(),
  }
}

export async function deleteProfileAction(prevState: DeleteProfileState, 
  formData: FormData) {
    let session = await cookies.getSession()
    if ( !session.data?.sessionid ) {
      return {
        error: "wrongValue.auth.sessionid",
        done: false,
        timestamp: getTimestamp(),
      }
    }
    let token = processors.turnstileToken(formData)
    if ( !token.data || token.error ) {
      return {
        error: token.error,
        done: false,
        timestamp: getTimestamp(),
      }
    }
    let validation = await requests.validateTurnstileToken(token.data)
    if ( validation.error ) {
      return {
        error: validation.error,
        done: false,
        timestamp: validation.timestamp,
      }
    }
    let response = await requests.deleteProfile(session.data.sessionid)
    if ( response.error ) {
      return {
        error: response.error,
        done: false,
        timestamp: response.timestamp,
      }
    }
    await cookies.setSession({ 
      region: undefined,
      sessionid: undefined,
      deviceid: session.data.deviceid,
    })
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
    if ( !session.data?.sessionid ) {
      return {
        error: "wrongValue.auth.sessionid",
        done: false,
        timestamp: getTimestamp(),
      }
    }
    let form = processors.sendMessage(formData)
    let token = processors.turnstileToken(formData)
    if ( !form.data || !token.data || form.error || token.error ) {
      return {
        error: form.error ?? token.error,
        done: false,
        timestamp: getTimestamp(),
      }
    }
    let validation = await requests.validateTurnstileToken(token.data)
    if ( validation.error ) {
      return {
        error: validation.error,
        done: false,
        timestamp: getTimestamp(),
      }
    }
    let message = await requests.sendMessage(session.data.sessionid, form.data)
    return {
      error: message.error,
      done: !!message.data,
      timestamp: message.timestamp,
    }
  }

export async function deleteMessageAction(prevState: DeleteMessageState,
  formData: FormData) {
    let session = await cookies.getSession()
    if ( !session.data?.sessionid ) {
      return {
        error: "wrongValue.auth.sessionid",
        done: false,
        timestamp: getTimestamp(),
      }
    }
    let form = processors.deleteMessage(formData)
    if ( !form.data || form.error ) {
      return {
        error: form.error,
        done: false,
        timestamp: getTimestamp(),
      }
    }
    let response = await requests.deleteMessage(session.data.sessionid, form.data)
    return {
      error: response.error,
      done: !response.error,
      timestamp: getTimestamp(),
    }
  }