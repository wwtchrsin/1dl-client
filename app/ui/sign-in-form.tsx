"use client"

import { useState, useActionState } from "react"
import { createSessionAction } from "../lib/form-actions"
import { regionLang } from "@/app/lib/regions"
import { getErrorMessage } from "@/app/lib/error-messages"
import TextField from "@/app/ui/text-field"
import PasswordField from "@/app/ui/password-field"
import type { Region } from "@/app/lib/interfaces"

let TxtRes = {
  Login: {
    en: "Login",
    ru: "Логин",
  },
  Password: {
    en: "Password",
    ru: "Пароль",
  },
  verify: {
    en: "verify",
    ru: "проверить",
  },
  Error: {
    en: "Error",
    ru: "Ошибка",
  },
}

export default function signInForm({ region }: { region: Region }) {
  let [ formState, formAction ] = useActionState(createSessionAction, {
    error: undefined,
    profile: undefined,
  })
  let [ login, setLogin ] = useState("")
  let [ password, setPassword ] = useState("")

  let lang = regionLang[region]

  if ( formState.profile ) {
    return <></>
  }

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-2 py-4">
        <div>
          <TextField
            value={login} setValue={setLogin}
            name="login" label={TxtRes.Login[lang]}
          />
        </div>
        <div>
          <PasswordField
            value={password} setValue={setPassword}
            name="password" label={TxtRes.Password[lang]}
          />
        </div>
        <div className="mt-2">
          <button className="pointer py-1 px-2 rounded-md bg-sky-400 text-white">
            { TxtRes.verify[lang] }
          </button>
        </div>
        {formState.error && (
          <div className="mt-2 text-red-500 text-bold">
            { `${TxtRes.Error[lang]}: ` }
            { getErrorMessage(formState.error)[lang] }
          </div>
        )}
      </div>
      <input type="hidden" name="region" value={region} />
    </form>
  )
}
