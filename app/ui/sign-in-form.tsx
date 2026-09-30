"use client"

import { useActionState, useState } from "react"
import { createSessionAction } from "../lib/form-actions"
import { regionLang } from "@/app/lib/regions"
import { txtRes } from "@/app/lib/text-resources"
import TextField from "@/app/ui/text-field"
import PasswordField from "@/app/ui/password-field"
import ErrorMessage from "@/app/ui/error-message"
import TurnstileWidget from "@/app/ui/turnstile-widget"
import type { Region } from "@/app/lib/interfaces"

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
            name="login" 
            label={txtRes.Login[lang]}
            value={login}
            setValue={setLogin}
          />
        </div>
        <div>
          <PasswordField
            name="password" 
            label={txtRes.Password[lang]}
            value={password}
            setValue={setPassword}
          />
        </div>
        <TurnstileWidget
          lang={lang}
          id={`sign-in-${region}`}
          hidden={true}
          style="rounded-md"
          styleVisible="mt-2"
          styleHidden="-mt-2"
          timestamp={formState.timestamp}
        />
        <div className="mt-2">
          <button formAction={formAction} disabled={isPending}
            className="cursor-pointer py-1 px-2 rounded-md bg-sky-400 text-white">
              { txtRes.verify[lang] }
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
