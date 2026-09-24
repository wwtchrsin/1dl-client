"use client"

import { useActionState, useEffect } from "react"
import { sendMessageAction } from "@/app/lib/form-actions"
import { regionLang, regionBgColors } from "@/app/lib/regions"
import limits from "@/app/lib/server-limits"
import TextArea from "@/app/ui/text-area"
import ColorSelector from "@/app/ui/color-selector"
import ErrorMessage from "@/app/ui/error-message"
import TurnstileWidget from "./turnstile-widget"
import type { Messageid } from "@/app/lib/interfaces"

let TxtRes = {
  EntryNumber: {
    en: (index: number) => `Entry #${index}`,
    ru: (index: number) => `Запись №${index}`,
  },
  BackgroundColor: {
    en: "Background",
    ru: "Цвет фона",
  },
  add: {
    en: "add",
    ru: "добавить",
  },
  close: {
    en: "close",
    ru: "закрыть",
  },
}

type SendMessageProps = Messageid & {
  close: () => unknown,
}

export default function SendMessageForm(props: SendMessageProps) {
  let { region, tag, index, close } = props
  let [ formState, formAction, isPending ] = useActionState(sendMessageAction, {
    error: undefined,
    done: false,
    timestamp: -1,
  })
  let lang = regionLang[region]
  let buttonBgColor = regionBgColors[region][3]
  let bgColor = regionBgColors[region][6]

  useEffect(() => {
    if ( formState.done ) {
      close()
    }
  }, [formState])

  return (
    <form action="#">
      <div className={`fixed bottom-0 left-0 w-full ${bgColor}`}>
        <div className="mx-auto max-w-150 p-8 text-white">
          <div className="w-full mb-4 flex flex-col gap-2 justify-center">
            <div>
              <TextArea 
                name="text"
                label={ TxtRes.EntryNumber[lang](index + 1) }
                limits={{ 
                  min: limits.message.text.minLen,
                  max: limits.message.text.maxLen,
                }}
              />
            </div>
            <div>
              <ColorSelector
                lang={lang}
                label={TxtRes.BackgroundColor[lang]}
              />
            </div>
            <div className="mt-2 flex flex-row gap-2">
              <button formAction={formAction} disabled={isPending}
                className={`cursor-pointer py-1 px-2 rounded-md text-white ${buttonBgColor}`}>
                  { TxtRes.add[lang] }
              </button>
              <button onClick={() => close()} disabled={isPending}
                className={`cursor-pointer py-1 px-2 rounded-md text-white ${buttonBgColor}`}>
                  { TxtRes.close[lang] }
              </button>
            </div>
            <ErrorMessage 
              error={formState.error}
              timestamp={formState.timestamp}
              lang={lang}
            />
            <input type="hidden" name="region" value={region} />
            <input type="hidden" name="tag" value={tag} />
            <input type="hidden" name="index" value={index} />
          </div>
          <TurnstileWidget
            lang={lang}
            id={`send-message-${index}`}
            hidden={true}
            timestamp={formState.timestamp}
          />
        </div>
      </div>
    </form>
  )
}