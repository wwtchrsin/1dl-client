"use client"

import { useState } from "react"
import { getErrorMessage } from "@/app/lib/error-messages"
import { txtRes } from "@/app/lib/text-resources"
import type { Lang } from "@/app/lib/interfaces"

type ErrorMessageProps = {
  error: string | undefined,
  timestamp: number,
  lang: Lang,
  formAction?: (payload: FormData) => void,
}

export default function ErrorMessage(props: ErrorMessageProps) {
  let { error, timestamp, lang, formAction } = props
  let [ errorClosed, setErrorClosed ] = useState(-1)

  let closeWindow = async () => {
    setErrorClosed(timestamp)
  }

  if ( !error || errorClosed === timestamp ) {
    return <></>
  }

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 w-full h-full bg-white/50 z-10">
      <div className="fixed bottom-0 left-0 w-full z-11 border-t border-white text-red-500 text-bold bg-red-100">
        <div className="mx-auto max-w-lg p-8">
          <div className="font-bold">{ txtRes.Error[lang] }:</div>
          <div>{ getErrorMessage(error)[lang] }</div>
          <button className="cursor-pointer mt-2 py-1 px-2 rounded-md text-white bg-red-500"
            onClick={ formAction ? undefined : closeWindow }
            formAction={ formAction ? formAction : undefined }>
              { txtRes.close[lang] }
          </button>
        </div>
      </div>
    </div>
  )
}