"use server"

import type * as I from "@/app/lib/interfaces"

const ServerUrl = process.env.HTTP_SERVER

export const getProfile = async (session: string | undefined): 
  Promise<{ error: string | undefined, profile: I.Profile | undefined }> => {
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
        error: "appError.requestFailed",
        profile: undefined,
      }
    }
  }

export const createProfile = async ({ region, login, password, name }: I.UserData):
  Promise<{ error: string | undefined, session: string | undefined, 
  profile: I.Profile | undefined }> => {
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
        error: "appError.requestFailes",
        session: undefined,
        profile: undefined,
      }
    }
  }


export const createSession = async ({ region, login, password }: I.Credentials):
  Promise<{ error: string | undefined, session: string | undefined,
  profile: I.Profile | undefined }> => {
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
        error: "appError.requestFailed",
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
    let body = await response.json()
    return body.error
  } catch (err) {
    return "appError.requestFailed"
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
    let body = await response.json()
    return body.error
  } catch (err) {
    return "appError.requestFailed"
  }
}

export const getDistricts = async (region: I.Region):
  Promise<{ error: string | undefined, data: Record<string, number> | undefined }> => {
    try {
      let response = await fetch(`${ServerUrl}/api/v1/messages/${region}`)
      let body = await response.json()
      return {
        error: body.error,
        data: body.msgcounts,
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        data: undefined,
      }
    }
  }

export const getZones = async ({ region, district }: I.Districtid):
  Promise<{ error: string | undefined, data: Record<string, number> | undefined }> => {
    try {
      let response = await fetch(`${ServerUrl}/api/v1/messages/${region}/${district}`)
      let body = await response.json()
      return {
        error: body.error,
        data: body.msgcounts,
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        data: undefined,
      }
    }
  }

export const getMessages = async ({ region, district, zone }: I.Zoneid):
  Promise<{ error: string | undefined, data: I.Message[] | undefined }> => {
    try {
      let location = `/api/v1/messages/${region}/${district}/${zone}/`
      let response = await fetch(`${ServerUrl}${location}`)
      let body = await response.json()
      return {
        error: body.error,
        data: body.messages,
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        data: undefined,
      }
    }
  }

export const sendMessage = async (session: string, message: I.MessageData):
  Promise<{ error: string | undefined, data: I.UserMessage | undefined }> => {
    try {
      let { region, district, zone, index } = message
      let messageid = `${region}/${district}/${zone}/${index}`
      let url = `${ServerUrl}/api/v1/messages/${messageid}`
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session}`,
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
      }
    } catch (err) {
      return {
        error: "appError.requestFailed",
        data: undefined,
      }
    }
  }