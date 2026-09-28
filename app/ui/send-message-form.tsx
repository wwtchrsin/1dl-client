import { regionLang, regionBgColors } from "@/app/lib/regions"
import limits from "@/app/lib/server-limits"
import TextArea from "@/app/ui/text-area"
import ColorSelector from "@/app/ui/color-selector"
import TurnstileWidget from "@/app/ui/turnstile-widget"
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
  formAction: (formData: FormData) => void,
  color: string | undefined | null,
  isPending: boolean,
  timestamp: number,
}

export default function SendMessageForm(props: SendMessageProps) {
  let { region, tag, index, close, formAction, isPending, timestamp, color } = props
  
  let lang = regionLang[region]
  let buttonBgColor = regionBgColors[region][3]
  let bgColor = regionBgColors[region][6]

  return (
    <div className={`fixed z-1 bottom-0 left-0 w-full ${bgColor}`}>
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
              defaultColor={color}
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
          <input type="hidden" name="region" value={region} />
          <input type="hidden" name="tag" value={tag} />
          <input type="hidden" name="index" value={index} />
        </div>
        <TurnstileWidget
          lang={lang}
          id={`send-message-${index}`}
          hidden={true}
          timestamp={timestamp}
        />
      </div>
    </div>
  )
}