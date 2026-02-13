"use client"

import { regionLang } from "@/app/lib/regions"
import type { Region } from "@/app/lib/interfaces"

let TxtRes = {
  header: {
    en: "This website uses cookies",
    ru: "Сайт использует куки",
  },
  message: {
    en: "The website requires your permission to use cookies " +
      "which are necessary for the site to function properly. " +
      "The information to be stored in the browser's local storage includes: " +
      "user identifier, region (if logged in), and session identifier.",
    ru: "Сайту требуется ваше разрешение, чтобы использовать файлы куки, " +
      "которые необходимы для правильной работы сайта. " +
      "Информация, которая будет храниться в локальном хранилище браузера, это: " +
      "идентификатор пользователя, регион (если выполнен вход), идентификатор сессии.",
  },
  allow: {
    en: "allow",
    ru: "разрешить",
  },
}

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
          { TxtRes.header[lang] }
        </div>
        <div>
          { TxtRes.message[lang] }
        </div>
        <div className="mt-2">
          <button className="cursor-pointer px-2 py-1 text-white bg-gray-700 rounded-md"
            formAction={formAction} disabled={isPending}>
              { TxtRes.allow[lang] }
          </button>
        </div>
      </div>
    </form>
  )
}