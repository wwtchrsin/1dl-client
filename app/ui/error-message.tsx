"use client"

import { useState } from "react"
import { getErrorMessage } from "@/app/lib/error-messages"
import type { Lang } from "@/app/lib/interfaces"

let TxtRes = {
  Error: {
    en: "Error",
    ru: "Ошибка",
  },
  close: {
    en: "close",
    ru: "закрыть",
  },
}

type ErrorMessageProps = {
  error: string | undefined,
  timestamp: number,
  lang: Lang,
  formAction?: (payload: FormData) => void,
}

export default function ErrorMessage({ error, timestamp, lang, formAction }: ErrorMessageProps) {
  let [ errorClosed, setErrorClosed ] = useState(-1)

  let closeWindow = async () => setErrorClosed(timestamp)

  if ( !error || errorClosed === timestamp ) {
    return <></>
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-100 p-8 border-t border-white text-red-500 text-bold bg-red-100">
      <div className="font-bold">{ TxtRes.Error[lang] }:</div>
      <div>{ getErrorMessage(error)[lang] }</div>
      <button className="cursor-pointer mt-2 py-1 px-2 rounded-md text-white bg-red-500"
        onClick={ formAction ? undefined : closeWindow }
        formAction={ formAction ? formAction : undefined }>
          { TxtRes.close[lang] }
      </button>
    </div>
  )
}