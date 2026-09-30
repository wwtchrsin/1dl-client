import { regionBgColors } from "@/app/lib/regions"
import { txtRes } from "@/app/lib/text-resources"
import TurnstileWidget from "@/app/ui/turnstile-widget"
import type * as I from "@/app/lib/interfaces"

type UserMessageProps = {
  lang: I.Lang,
  message: I.Message | null,
  close: () => unknown,
  formAction: (formData: FormData) => void,
  isPending: boolean,
  timestamp: number,
}

export default function DeleteMessageDialog(props: UserMessageProps) {
  let { lang, message, close, formAction, isPending, timestamp } = props
 
  if ( message === null ) {
    return <></>
  }

  let { region, tag, index } = message
  let bgColor = regionBgColors[region][6]

  return (
    <div className={`fixed z-1 w-full bottom-0 left-0 w-full ${bgColor}`}>
      <div className="mx-auto max-w-lg px-8 py-12 text-white">
        <div className="font-bold">
          { txtRes.deleteMessageConfirmation[lang] }
        </div>
        <div className="mt-2 flex flex-row gap-2">
          <button className="cursor-pointer rounded py-1 px-2 bg-gray-600 text-white"
            type="submit" formAction={formAction}
            disabled={isPending}>
              { txtRes.confirm[lang] }
          </button>
          <button className="cursor-pointer rounded py-1 px-2 bg-gray-600 text-white" 
            onClick={() => close()}>
              { txtRes.cancel[lang] }
          </button>
        </div>
        <TurnstileWidget
          lang={lang}
          id={`send-message-${index}`}
          hidden={true}
          timestamp={timestamp}
        />
      </div>
      <input type="hidden" name="region" value={region} />
      <input type="hidden" name="tag" value={tag} />
      <input type="hidden" name="index" value={index} />
    </div>
  )
}