"use server"

import { getTimestamp } from "@/app/lib/miscs"
import type * as I from "@/app/lib/interfaces"

export type GetProfileResponse = {
  error: string | undefined, 
  profile: I.Profile | undefined,
  timestamp: number,
}

export type CreateProfileResponse = {
  error: string | undefined,
  sessionid: string | undefined,
  profile: I.Profile | undefined,
  timestamp: number,
}

export type CreateSessionResponse = {
  error: string | undefined,
  sessionid: string | undefined,
  profile: I.Profile | undefined,
  timestamp: number,
}

export type DeleteSessionResponse = {
  error: string | undefined,
  timestamp: number,
}

export type DeleteProfileResponse = {
  error: string | undefined,
  timestamp: number,
}

export type GetMessagesResponse = {
  error: string | undefined,
  data: I.Message[] | undefined,
  timestamp: number,
}

export type SendMessageResponse = {
  error: string | undefined,
  data: I.UserMessage | undefined,
  timestamp: number,
}

export type DeleteMessageResponse = {
  error: string | undefined,
  timestamp: number,
}

export type TurnstileResponse = {
  error: string | undefined,
  timestamp: number,
}

const ServerUrl = process.env.HTTP_SERVER ?? "http://localhost:3100"

const ServiceId = process.env.SERVICE_ID ?? ""

export const getProfile = async (sessionid: string | undefined): 
  Promise<GetProfileResponse> => {
    if ( sessionid === undefined ) {
      return { 
        error: undefined,
        profile: undefined,
        timestamp: getTimestamp(),
      }
    }

    try {
      let url = `${ServerUrl}/api/v1/profiles`
      let response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${ServiceId}:${sessionid}`,
        },
      })
      let body = await response.json()
      return {
        error: body.error,
        profile: body.profile,
        timestamp: getTimestamp(),
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        profile: undefined,
        timestamp: getTimestamp(),
      }
    }
  }

export const createProfile = async (deviceid: string, userData: I.UserData):
  Promise<CreateProfileResponse> => {
    try {
      let response = await fetch(`${ServerUrl}/api/v1/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ServiceId}:`,
        },
        body: JSON.stringify({
          ...userData,
          deviceid,
        })
      })
      let body = await response.json()
      return {
        error: body.error,
        sessionid: body.sessionid,
        profile: body.profile,
        timestamp: getTimestamp(),
      }
    } catch (err) {
      return {
        error: "appError.requestFailes",
        sessionid: undefined,
        profile: undefined,
        timestamp: getTimestamp(),
      }
    }
  }

export const createSession = async (deviceid: string, credentials: I.Credentials): 
  Promise<CreateSessionResponse> => {
    try {
      let response = await fetch(`${ServerUrl}/api/v1/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ServiceId}:`,
        },
        body: JSON.stringify({
          ...credentials,
          deviceid,
          profile: true,
        })
      })
      let body = await response.json()
      return {
        error: body.error,
        sessionid: body.sessionid,
        profile: body.profile,
        timestamp: getTimestamp(),
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        sessionid: undefined,
        profile: undefined,
        timestamp: getTimestamp(),
      }
    }
  }

export const deleteSession = async (sessionid: string): 
  Promise<DeleteSessionResponse> => {
    try {
      let response = await fetch(`${ServerUrl}/api/v1/sessions`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${ServiceId}:${sessionid}`,
        },
      })
      let body = await response.json()
      return {
        error: body.error,
        timestamp: getTimestamp(),
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        timestamp: getTimestamp(),
      }
    }
  }

export const deleteProfile = async (sessionid: string): 
  Promise<DeleteProfileResponse> => {
    try {
      let response = await fetch(`${ServerUrl}/api/v1/profiles`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${ServiceId}:${sessionid}`,
        },
      })
      let body = await response.json()
      return {
        error: body.error,
        timestamp: getTimestamp(),
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        timestamp: getTimestamp(),
      }
    }
  }

export const getMessages = async ({ region, tag }: I.Location):
  Promise<GetMessagesResponse> => {
    try {
      let location = `/api/v1/messages/${region}/${tag}`
      let response = await fetch(`${ServerUrl}${location}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${ServiceId}:`,
        },
      })
      let body = await response.json()
      return {
        error: body.error,
        data: body.messages,
        timestamp: getTimestamp(),
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        data: undefined,
        timestamp: getTimestamp(),
      }
    }
  }

export const sendMessage = async (sessionid: string, message: I.MessageData):
  Promise<SendMessageResponse> => {
    try {
      let { region, tag, index } = message
      let messageid = `${region}/${tag}/${index}`
      let url = `${ServerUrl}/api/v1/messages/${messageid}`
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ServiceId}:${sessionid}`,
        },
        body: JSON.stringify({
          text: message.text,
          color: message.color,
        }),
      })
      let body = await response.json()
      return {
        error: body.error,
        data: body.message,
        timestamp: getTimestamp(),
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        data: undefined,
        timestamp: getTimestamp(),
      }
    }
  }

export const deleteMessage = async (sessionid: string, messageid: I.Messageid):
  Promise<DeleteMessageResponse> => {
    try {
      let { region, tag, index } = messageid
      let path = `${region}/${tag}/${index}`
      let url = `${ServerUrl}/api/v1/messages/${path}`
      let response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ServiceId}:${sessionid}`,
        },
      })
      let body = await response.json()
      return {
        error: body.error,
        timestamp: getTimestamp(),
      }
    } catch ( err ) {
      return {
        error: "appError.requestFailed",
        timestamp: getTimestamp(),
      }
    }
  }

export const validateTurnstileToken = async (token: string): 
  Promise<TurnstileResponse> => {
    try {
      let turnstileSecret = process.env.TURNSTILE_SECRET_KEY!
      let url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: token,
        })
      })
      let result = await response.json()
      return {
        error: result.success ? undefined : "appError.validationFailed",
        timestamp: getTimestamp(),
      }
    } catch (err) {
      return {
        error: "appError.validationFailed",
        timestamp: getTimestamp(),
      }
    }
  }