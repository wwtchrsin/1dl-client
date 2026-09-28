"use client"

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
  error: string,
  lang: Lang,
  onClosed: () => unknown, 
}

export default function ErrorMessageStateless({ error, lang, onClosed }: ErrorMessageProps) {

  return (
    <div className="fixed bottom-0 left-0 w-full z-10  border-t border-white text-red-500 text-bold bg-red-100">
      <div className="p-8 max-w-150 mx-auto">
        <div className="font-bold">{ TxtRes.Error[lang] }:</div>
        <div>{ getErrorMessage(error)[lang] }</div>
        <button className="cursor-pointer mt-2 py-1 px-2 rounded-md text-white bg-red-500"
          onClick={() => onClosed()}>
            { TxtRes.close[lang] }
        </button>
      </div>
    </div>
  )
}