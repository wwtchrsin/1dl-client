
import { useState, useActionState } from "react"
import { deleteMessageAction } from "../lib/form-actions"
import ErrorMessage from "@/app/ui/error-message"
import Message from "@/app/ui/message"
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

export default function UserMessage({ lang, message }: { lang: I.Lang, message: I.Message }) {
  let [ formState, formAction, isPending ] = useActionState(deleteMessageAction, {
    error: undefined,
    done: false,
    timestamp: -1,
  })
  let { region, district, zone, index } = message
  let [ dialogVisible, setDialogVisible ] = useState(false)

  if ( formState.done ) {
    return <>...</>
  }

  return (
    <form action="#">
      {!dialogVisible && (
        <>
          <Message message={message} />
          <button className="absolute right-4 top-4 cursor-pointer rounded px-2 py-1 bg-gray-700 text-white"
            onClick={() => setDialogVisible(true)}>
            { TxtRes.delete[lang] }
          </button>
        </>
      )}
      {dialogVisible && (
        <div className="mt-2 flex flex-col gap-2">
          <div className="font-bold">
            { TxtRes.ConfirmDeletion[lang] }
          </div>
          <div className="flex flex-row gap-2">
            <button className="cursor-pointer rounded py-1 px-2 bg-gray-700 text-white"
              type="submit" formAction={formAction}
              disabled={isPending}>
                { TxtRes.confirm[lang] }
            </button>
            <button className="cursor-pointer rounded py-1 px-2 bg-gray-700 text-white" 
              onClick={() => setDialogVisible(false)}>
                { TxtRes.cancel[lang] }
            </button>
          </div>
        </div>
      )}
      <ErrorMessage
        error={formState.error}
        timestamp={formState.timestamp}
        lang={lang}
      />
      <input type="hidden" name="region" value={region} />
      <input type="hidden" name="district" value={district} />
      <input type="hidden" name="zone" value={zone} />
      <input type="hidden" name="index" value={index} />
    </form>
  )
}