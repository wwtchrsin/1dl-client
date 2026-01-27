import limits from "@/app/lib/server-limits"
import { regions } from "@/app/lib/regions"

type CreateProfileData = {
  region: string,
  login: string,
  password: string,
  name: string,
}

type CreateSessionData = {
  region: string,
  login: string,
  password: string,
}

let patterns = {
  login: new RegExp(limits.user.login.pattern),
  password: new RegExp(limits.user.password.pattern),
}

export const createProfile = (formData: FormData): 
  { error: string | undefined, data: CreateProfileData | undefined } => {
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
      data: { region, login, password, name }
    }
  }

export const createSession = (formData: FormData):
  { error: string | undefined, data: CreateSessionData | undefined } => {
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
      data: { region, login, password }
    }
  }