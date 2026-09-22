
import { useState, useActionState } from "react"
import { deleteMessageAction } from "../lib/form-actions"
import ErrorMessage from "@/app/ui/error-message"
import type * as I from "@/app/lib/interfaces"

let TxtRes = {
  delete: {
    en: "delete",
    ru: "удалить"
  },
  ConfirmDeletion: {
    en: "Are you sure you want to delete the message?",
    ru: "Вы уверены что хотите удалить это сообщение?",
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
  message: I.Message,
  onAction: (action: string) => void
}

export default function UserMessage({ lang, message, onAction }: UserMessageProps) {
  let [ formState, formAction, isPending ] = useActionState(deleteMessageAction, {
    error: undefined,
    done: false,
    timestamp: -1,
  })
  let { region, tag, index } = message
  let [ dialogVisible, setDialogVisible ] = useState(false)

  if ( formState.done ) {
    return <>...</>
  }

  let deleteButtonHandler = () => {
    onAction("delete-message:click")
    setDialogVisible(true)
  }

  return (
    <form className="h-full w-full" action="#">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="max-w-80 px-6 flex flex-col">
          {!dialogVisible && (<>
            <div>{ message.text }</div>
            <div className="font-bold">{ message.username }</div>
            <button className="absolute right-4 top-4 cursor-pointer rounded px-2 py-1 bg-gray-600 text-white"
              onClick={deleteButtonHandler}>
              { TxtRes.delete[lang] }
            </button>
          </>)}
          {dialogVisible && (<>
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
                onClick={() => setDialogVisible(false)}>
                  { TxtRes.cancel[lang] }
              </button>
            </div>
          </>)}
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