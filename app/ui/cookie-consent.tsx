"use client"

import { regionLang } from "@/app/lib/regions"
import { txtRes } from "@/app/lib/text-resources"
import type { Region } from "@/app/lib/interfaces"


export type CookieConsentProps = {
  region: Region,
  formAction: (payload: FormData) => void,
  isPending: boolean,
}

export default function CookieConsent({ region, formAction, isPending }: CookieConsentProps) {
  let lang = regionLang[region]

  return (
    <form action="#">
      <div className="flex flex-col">
        <div className="font-bold">
          { txtRes.cookieConsentHeader[lang] }
        </div>
        <div>
          { txtRes.cookieConsentMessage[lang] }
        </div>
        <div className="mt-2">
          <button className="cursor-pointer px-2 py-1 text-white bg-gray-700 rounded-md"
            formAction={formAction} disabled={isPending}>
              { txtRes.allow[lang] }
          </button>
        </div>
      </div>
    </form>
  )
}