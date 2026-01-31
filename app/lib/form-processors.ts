import limits from "@/app/lib/server-limits"
import { getMessageid } from "./location-processors"
import { regions } from "@/app/lib/regions"
import type * as I from "@/app/lib/interfaces"

let patterns = {
  login: new RegExp(limits.user.login.pattern),
  password: new RegExp(limits.user.password.pattern),
}

export const createProfile = (formData: FormData): 
  { error: string | undefined, data: I.UserData | undefined } => {
    let region = formData.get("region") as string | null
    let login = formData.get("login") as string | null
    let password = formData.get("password") as string | null
    let password2 = formData.get("password2") as string | null
    let name = formData.get("name") as string | null

    if ( !region || !(regions as string[]).includes(region) ) {
      return {
        error: "wrongValue.message.region",
        data: undefined,
      }
    }
    if ( !login || !patterns.login.test(login) ) {
      return {
        error: "wrongValue.user.login",
        data: undefined,
      }
    }
    if ( password !== password2 ) {
      return {
        error: "appError.passwordsMismatch",
        data: undefined,
      }
    }
    if ( !password || !patterns.password.test(password) ) {
      return {
        error: "wrongValue.user.password",
        data: undefined,
      }
    }
    if ( !name || name.length < limits.user.name.minLen || 
      name.length > limits.user.name.maxLen ) {
        return {
          error: "wrongValue.user.name",
          data: undefined,
        }
      }
    return {
      error: undefined,
      data: { region: region as I.Region, login, password, name }
    }
  }

export const createSession = (formData: FormData):
  { error: string | undefined, data: I.Credentials | undefined } => {
    let region = formData.get("region") as  string | null
    let login = formData.get("login") as string | null
    let password = formData.get("password") as string | null

    if ( !region || !(regions as string[]).includes(region) ) {
      return {
        error: "wrongValue.auth.region",
        data: undefined,
      }
    }
    if ( !login ) {
      return {
        error: "wrongValue.auth.login",
        data: undefined,
      }
    }
    if ( !password ) {
      return {
        error: "wrongValue.auth.password",
        data: undefined
      }
    }
    return {
      error: undefined,
      data: { region: region as I.Region, login, password }
    }
  }

export const sendMessage = (formData: FormData): 
  { error: string | undefined, data: I.MessageData | undefined } => {
    let region = formData.get("region") as string | null
    let district = formData.get("district") as string | null
    let zone = formData.get("zone") as string | null
    let index = formData.get("index") as string | null
    let text = formData.get("text") as string | null
    let color = formData.get("color") as string | null

    let messageid = getMessageid({ region, district, zone, index })
    if ( !messageid ) {
      return {
        error: "appError.wrongMessageid",
        data: undefined,
      }
    }
    if ( !text || text.length < limits.message.text.minLen ||
      text.length > limits.message.text.maxLen ) {
        return {
          error: "wrongValue.message.text",
          data: undefined,
        }
      }
    if ( !color || !limits.message.color.values.includes(color) ) {
      return {
        error: "wrongValue.message.color",
        data: undefined,
      }
    }
    return {
      error: undefined,
      data: { ...messageid, text, color }
    }
  }