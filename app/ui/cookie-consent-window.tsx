"use client"

import { useActionState } from "react"
import { usePathname } from "next/navigation"
import { initCookiesAction } from "@/app/lib/form-actions"
import { getUrlSegments } from "@/app/lib/miscs"
import { regions } from "@/app/lib/regions"
import CookieConsent from "@/app/ui/cookie-consent"
import type { Region } from "@/app/lib/interfaces"

export default function CookieConsentWindow() {
  let [ formState, formAction, isPending ] = useActionState(initCookiesAction, {
    error: undefined,
    done: false,
    timestamp: -1,
  })
  let segments = getUrlSegments(usePathname())

  if ( segments.length === 0 || segments.length === 1 && 
    (regions as string[]).includes(segments[0]) ||
    formState.done ) {
      return <></>
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-100 p-8 border-t border-white bg-gray-100">
      <CookieConsent
        region={segments[0] as Region}
        formAction={formAction}
        isPending={isPending}
      />
    </div>
  )
}