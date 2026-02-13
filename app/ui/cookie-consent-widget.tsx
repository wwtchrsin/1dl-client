"use client"

import { useActionState } from "react"
import { initCookiesAction } from "@/app/lib/form-actions"
import CookieConsent from "@/app/ui/cookie-consent"
import type { Region } from "@/app/lib/interfaces"

export default function CookieConsentWidget({ region }: { region: Region }) {
  let [ formState, formAction, isPending ] = useActionState(initCookiesAction, {
    error: undefined,
    done: false,
    timestamp: -1,
  })

  if ( formState.done ) {
    return <>...</>
  }

  return (
    <CookieConsent
      region={region}
      formAction={formAction}
      isPending={isPending}
    />
  )
}