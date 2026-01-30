"use client"

import { useState, useActionState } from "react"
import { createSessionAction } from "../lib/form-actions"
import { regionLang } from "@/app/lib/regions"
import TextField from "@/app/ui/text-field"
import PasswordField from "@/app/ui/password-field"
import ErrorMessage from "@/app/ui/error-message"
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
}

export default function signInForm({ region }: { region: Region }) {
  let [ formState, formAction, isPending ] = useActionState(createSessionAction, {
    error: undefined,
    profile: undefined,
    timestamp: -1,
  })
  let [ login, setLogin ] = useState("")
  let [ password, setPassword ] = useState("")

  let lang = regionLang[region]

  if ( formState.profile ) {
    return <></>
  }

  return (
    <form action="#">
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
          <button formAction={formAction} disabled={isPending}
            className="cursor-pointer py-1 px-2 rounded-md bg-sky-400 text-white">
              { TxtRes.verify[lang] }
          </button>
        </div>
        <ErrorMessage
          error={formState.error}
          timestamp={formState.timestamp}
          lang={lang}
        />
      </div>
      <input type="hidden" name="region" value={region} />
    </form>
  )
}
