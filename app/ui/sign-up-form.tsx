"use client"

import { useState, useActionState } from "react"
import { createProfileAction } from "../lib/form-actions"
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
  ConfirmPassword: {
    en: "Confirm Password",
    ru: "Подтвердите Пароль",
  },
  Name: {
    en: "Name",
    ru: "Имя",
  },
  create: {
    en: "create",
    ru: "создать",
  },
  Error: {
    en: "Error",
    ru: "Ошибка",
  },
}


export default function SignUpForm ({ region }: { region: Region }) {
  let [ formState, formAction, isPending ] = useActionState(createProfileAction, {
    error: undefined,
    profile: undefined,
  })
  let [ login, setLogin ] = useState("")
  let [ password, setPassword ] = useState("")
  let [ password2, setPassword2 ] = useState("")
  let [ name, setName ] = useState("")

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
        <div>
          <PasswordField
            value={password2} setValue={setPassword2}
            name="password2" label={TxtRes.ConfirmPassword[lang]}
          />
        </div>
        <div>
          <TextField
            value={name} setValue={setName}
            name="name" label={TxtRes.Name[lang]}
          />
        </div>
        <div className="mt-2">
          <button formAction={formAction} disabled={isPending}
            className="pointer py-1 px-2 rounded-md bg-sky-400 text-white">
              { TxtRes.create[lang] }
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