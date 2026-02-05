"use client"

import { useActionState } from "react"
import { sendMessageAction } from "@/app/lib/form-actions"
import { regionLang, regionBgColors } from "@/app/lib/regions"
import limits from "@/app/lib/server-limits"
import TextArea from "@/app/ui/text-area"
import ColorSelector from "@/app/ui/color-selector"
import ErrorMessage from "@/app/ui/error-message"
import TurnstileWidget from "./turnstile-widget"
import type { Messageid } from "@/app/lib/interfaces"

let TxtRes = {
  Text: {
    en: "Text",
    ru: "Текст",
  },
  BackgroundColor: {
    en: "Background",
    ru: "Цвет фона",
  },
  apply: {
    en: "apply",
    ru: "применить",
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
  let { region, district, zone, index, close } = props
  let [ formState, formAction, isPending ] = useActionState(sendMessageAction, {
    error: undefined,
    done: false,
    timestamp: -1,
  })
  let lang = regionLang[region]
  let buttonBgColor = regionBgColors[region][3]

  if ( formState.done ) {
    return (
      <div>...</div>
    )
  }

  return (
    <form action="#" className="w-full h-full">
      <div className="w-full h-full flex flex-col">
        <div className="mx-auto max-w-68 grow shrink-0 flex flex-col gap-2 justify-center">
          <div>
            <TextArea 
              name="text"
              label={TxtRes.Text[lang]}
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
                { TxtRes.apply[lang] }
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
          <input type="hidden" name="district" value={district} />
          <input type="hidden" name="zone" value={zone} />
          <input type="hidden" name="index" value={index} />
        </div>
        <TurnstileWidget
          lang={lang}
          id={`send-message-${index}`}
          hidden={true}
        />
      </div>
    </form>
  )
}