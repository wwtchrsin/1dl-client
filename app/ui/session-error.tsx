"use client"

import { useActionState } from "react"
import { logoutAction } from "@/app/lib/form-actions"
import { regionLang } from "@/app/lib/regions"
import ErrorMessage from "@/app/ui/error-message"
import type { Region } from "@/app/lib/interfaces"

type SessionErrorProps = {
  region: Region,
  error: string | undefined,
  timestamp: number,
}

export default function SessionError({ region, error, timestamp }: SessionErrorProps) {
  let [ formState, formAction ] = useActionState(logoutAction, {
    error: undefined,
    done: false,
    timestamp: -1,
  })
  let lang = regionLang[region]
  if ( formState.error && timestamp < formState.timestamp ) {
    timestamp = formState.timestamp
    error = formState.error
  }
  return (
    <form action="#">
      <ErrorMessage 
        error={error}
        timestamp={timestamp}
        lang={lang}
        formAction={formAction}
      />
    </form>
  )
  


}