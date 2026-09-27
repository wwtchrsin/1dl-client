"use client"

import { useState, useEffect, useActionState } from "react"
import { useSession } from "@/app/providers/session"
import { sendMessageAction, deleteMessageAction } from "@/app/lib/form-actions"
import { regionLang, regionBgColors, regionTextColors } from "@/app/lib/regions"
import { getMessageColor } from "@/app/lib/message-colors"
import { useWebSocket } from "@/app/providers/websocket"
import SendMessageForm from "@/app/ui/send-message-form"
import Message from "@/app/ui/message"
import MessageCell from "@/app/ui/message-cell"
import DeleteMessageDialog from "@/app/ui/delete-message-dialog"
import ErrorMessage from "@/app/ui/error-message"
import type * as I from "@/app/lib/interfaces"

type MessagesProps = {
  location: I.Location,
  messages: (I.Message | null)[],
}

type ActiveCell = {
  type: "empty" | "message",
  index: number,
} | undefined

export default function Messages({ location, messages }: MessagesProps) {
  let [ sendFormState, sendFormAction, isSendFormPending ] = 
    useActionState(sendMessageAction, {
      error: undefined,
      done: false,
      timestamp: -1,
    })
  let [ deleteFormState, deleteFormAction, isDeleteFormPending ] = 
    useActionState(deleteMessageAction, {
      error: undefined,
      done: false,
      timestamp: -1,
    })

  let { region, tag } = location
  let { profile } = useSession()
  let { createdMessages, deletedMessages } = useWebSocket()
  let [ activeCell, setActiveCell ] = useState<ActiveCell>(undefined)
  
  let isUserActive = profile?.state === "active"
  let isUserLocal = region === profile?.region
  let lang = regionLang[region]

  useEffect(() => {
    if ( sendFormState.done ) {
      setActiveCell(undefined)
    }
  }, [sendFormState])

  useEffect(() => {
    if ( deleteFormState.done ) {
      setActiveCell(undefined)
    }
  }, [deleteFormState])

  useEffect(() => {
    if ( activeCell ) {
      let type = (createdMessages.has(activeCell.index) ||
        messages[activeCell.index]) && !deletedMessages.has(activeCell.index)
        ? "message" : "empty"
      if ( type !== activeCell.type ) {
        setActiveCell(undefined)
      }
    }
  }, [createdMessages, deletedMessages, messages])

  let getCurrentMessage = (index: number): 
    I.Message | null => {
      if ( deletedMessages.has(index) ) return null
      let createdMessage = createdMessages.get(index)
      return createdMessage ?? messages[index]
    }
  
  let toggleActiveCell = (type: "empty" | "message", index: number) => {
    if ( !isSendFormPending && !isDeleteFormPending ) {
      if ( index === activeCell?.index ) {
        setActiveCell(undefined)
        return
      }
      setActiveCell({ type, index })
    }
  }

  return (
    <>
      <div className="p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-white">
        {messages.map((_msg, index) => {
          let bgColor = index !== activeCell?.index ?
            regionBgColors[region][0] :
            regionBgColors[region][1]
          let textColor = regionTextColors[region][8]
          let message = getCurrentMessage(index)
          if ( message ) {
            bgColor = getMessageColor(message.color)
            textColor = "text-white"
          }
          let isUserCreator = !!(message && message.puid === profile?.puid)

          return (
            <div className={`relative h-50 ${textColor} ${bgColor}`} key={index}>
              {message && (
                <Message
                  message={message}
                  onClick={() => { toggleActiveCell("message", index) }}
                  enabled={isUserActive && isUserCreator}
                  active={index === activeCell?.index}
                />
              )}
              {!message && (
                <MessageCell
                  region={region}
                  index={index}
                  onClick={() => { toggleActiveCell("empty", index) }}
                  enabled={isUserActive && isUserLocal}
                  active={index === activeCell?.index}
                />
              )}
            </div>
          )
        })}
      </div>
      {activeCell && activeCell.index >= 0 && activeCell.type === "empty" && (
        <form action="#">
          <SendMessageForm 
            region={region}
            tag={tag}
            index={activeCell.index}
            close={() => setActiveCell(undefined)}
            formAction={sendFormAction}
            isPending={isSendFormPending}
            timestamp={sendFormState.timestamp}
          />
          <ErrorMessage
            error={sendFormState.error}
            timestamp={sendFormState.timestamp}
            lang={lang}
          />
        </form>
      )}
      {activeCell && activeCell.index >= 0 && activeCell.type === "message" && (
        <form action="#">
          <DeleteMessageDialog
            lang={lang}
            message={getCurrentMessage(activeCell.index)}
            close={() => setActiveCell(undefined)}
            formAction={deleteFormAction}
            isPending={isDeleteFormPending}
            timestamp={deleteFormState.timestamp}
          />
          <ErrorMessage
            error={deleteFormState.error}
            timestamp={deleteFormState.timestamp}
            lang={lang}
          />
        </form>
      )}
    </>
  )
}