"use server"

import type { Profile } from "@/app/lib/interfaces"

type UserData = {
  region: string | null,
  login: string | null,
  password: string | null,
  name: string | null,
}

type Credentials = {
  region: string | null,
  login: string | null,
  password: string | null,
}

const ServerUrl = process.env.HTTP_SERVER

export const getProfile = async (session: string | undefined): 
  Promise<{ error: string | undefined, profile: Profile | undefined }> => {
    if ( session === undefined ) {
      return { 
        error: undefined,
        profile: undefined,
      }
    }

    try {
      let url = `${ServerUrl}/api/v1/profiles`
      let response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })
      let body = await response.json()
      return {
        error: body.error,
        profile: body.profile,
      }
    } catch (err) {
      return {
        error: "appErrors.requestFailed",
        profile: undefined,
      }
    }
  }

export const createProfile = async ({ region, login, password, name }: UserData):
  Promise<{ error: string | undefined, session: string | undefined, 
  profile: Profile | undefined }> => {
    try {
      let response = await fetch(`${ServerUrl}/api/v1/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          region,
          login,
          password,
          name,
        })
      })
      let body = await response.json()
      return {
        error: body.error,
        session: body.session,
        profile: body.profile,
      }
    } catch (err) {
      return {
        error: "appErrors.requestFailes",
        session: undefined,
        profile: undefined,
      }
    }
  }


export const createSession = async ({ region, login, password }: Credentials):
  Promise<{ error: string | undefined, session: string | undefined,
  profile: Profile | undefined }> => {
    try {
      let response = await fetch(`${ServerUrl}/api/v1/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          region,
          login,
          password,
          profile: true,
        })
      })
      let body = await response.json()
      return {
        error: body.error,
        session: body.session,
        profile: body.profile,
      }
    } catch (err) {
      return {
        error: "appErrors.requestFailed",
        session: undefined,
        profile: undefined,
      }
    }
  }

export const deleteSession = async (session: string): Promise<string | undefined> => {
  try {
    let response = await fetch(`${ServerUrl}/api/v1/sessions`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
    let message = await response.json()
    return message.error as string | undefined
  } catch (err) {
    return "appErrors.requestFailed"
  }
}

export const deleteProfile = async (session: string): Promise<string | undefined> => {
  try {
    let response = await fetch(`${ServerUrl}/api/v1/profiles`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session}`
      }
    })
    let message = await response.json()
    return message.error as string | undefined
  } catch (err) {
    return "appErrors.requestFailed"
  }
}
