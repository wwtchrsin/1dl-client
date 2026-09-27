
import { useEffect, useActionState } from "react"
import { deleteMessageAction } from "@/app/lib/form-actions"
import { regionBgColors } from "@/app/lib/regions"
import ErrorMessage from "@/app/ui/error-message"
import type * as I from "@/app/lib/interfaces"

let TxtRes = {
  delete: {
    en: "delete",
    ru: "удалить"
  },
  ConfirmDeletion: {
    en: "Are you sure you want to delete the entry?",
    ru: "Вы уверены что хотите удалить эту запись?",
  },
  confirm: {
    en: "confirm",
    ru: "подтвердить",
  },
  cancel: {
    en: "cancel",
    ru: "отменить",
  },
}

type UserMessageProps = {
  lang: I.Lang,
  message: I.Message | null,
  close: () => unknown
}

export default function DeleteMessageDialog({ lang, message, close }: UserMessageProps) {
  let [ formState, formAction, isPending ] = useActionState(deleteMessageAction, {
    error: undefined,
    done: false,
    timestamp: -1,
  })

  if ( message === null ) {
    return <></>
  }

  let { region, tag, index } = message
  let bgColor = regionBgColors[region][6]

  useEffect(() => {
    if ( formState.done ) {
      close()
    }
  }, [formState])

  return (
    <form className="w-full" action="#">
      <div className={`fixed z-1 w-full bottom-0 left-0 w-full ${bgColor}`}>
        <div className="mx-auto max-w-150 px-8 py-12 text-white">
          <div className="font-bold">
            { TxtRes.ConfirmDeletion[lang] }
          </div>
          <div className="mt-2 flex flex-row gap-2">
            <button className="cursor-pointer rounded py-1 px-2 bg-gray-600 text-white"
              type="submit" formAction={formAction}
              disabled={isPending}>
                { TxtRes.confirm[lang] }
            </button>
            <button className="cursor-pointer rounded py-1 px-2 bg-gray-600 text-white" 
              onClick={() => close()}>
                { TxtRes.cancel[lang] }
            </button>
          </div>
          <ErrorMessage
            error={formState.error}
            timestamp={formState.timestamp}
            lang={lang}
          />
        </div>
        <input type="hidden" name="region" value={region} />
        <input type="hidden" name="tag" value={tag} />
        <input type="hidden" name="index" value={index} />
      </div>
    </form>
  )
}