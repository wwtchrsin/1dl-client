"use client"

import { usePathname } from "next/navigation"
import { getUrlSegments } from "@/app/lib/miscs"
import { getErrorMessage } from "@/app/lib/error-messages"
import { regionLang } from "@/app/lib/regions"
import type { Region } from "@/app/lib/interfaces"

let TxtRes = {
  Error: {
    en: "Error",
    ru: "Ошибка",
  }
}

export default function ErrorPage({ error }: { error: string }) {
  let pathname = usePathname()
  let segments = getUrlSegments(pathname)
  let region = (segments[0] ?? "en") as Region
  let lang = regionLang[region]
  let errorMessage = getErrorMessage(error)

  return (
    <div className="h-100 p-4 flex items-center justify-center text-red-900">
      <div className="flex flex-row gap-3  max-w-100">
        <div className="flex items-center text-2xl font-bold pr-3 border-r-4">
          { TxtRes.Error[lang] }
        </div>
        <div className="text-2xl">
          { errorMessage[lang] }
        </div>
      </div>
    </div>
  )
}