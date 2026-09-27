"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/app/providers/session"
import { regionLang, regionBgColors, regionTextColors } from "@/app/lib/regions"
import { getMessageColor } from "@/app/lib/message-colors"
import { useWebSocket } from "@/app/providers/websocket"
import limits from "@/app/lib/server-limits"
import SendMessageForm from "@/app/ui/send-message-form"
import Message from "@/app/ui/message"
import MessageCell from "@/app/ui/message-cell"
import DeleteMessageDialog from "@/app/ui/delete-message-dialog"
import type * as I from "@/app/lib/interfaces"

type MessagesProps = {
  location: I.Location,
  messages: (I.Message | null)[],
}

export default function Messages({ location, messages }: MessagesProps) {
  let { region, tag } = location
  let { profile } = useSession()
  let { createdMessages, deletedMessages } = useWebSocket()
  let [ formIndex, setFormIndex ] = useState(-1)
  
  let isUserActive = profile?.state === "active"
  let isUserLocal = region === profile?.region
  let lang = regionLang[region]

  let getCurrentMessage = (msg: I.Message | null, index: number): 
    I.Message | null => {
      if ( deletedMessages.has(index) ) return null
      let createdMessage = createdMessages.get(index)
      return createdMessage ?? msg
    }
  
  let toggleFormIndex = (index: number) => {
    setFormIndex(index === formIndex ? -1 : index)
  }

  let activeCellType = "empty"
  if ( formIndex >= 0 &&  (messages[formIndex] ||
    createdMessages.has(formIndex)) &&
    !deletedMessages.has(formIndex) ) {
      activeCellType = "message"
    }

  useEffect(() => {
    setFormIndex(formIndex => {
      if ( formIndex < 0 ) {
        return formIndex
      }
      let nextIndex = formIndex
      while ( nextIndex <= limits.message.index.max ) {
        if ( deletedMessages.has(nextIndex) || 
          !createdMessages.has(nextIndex) && !messages[nextIndex] ) {
            break
        }
        nextIndex++
      }
      return nextIndex <= limits.message.index.max ? nextIndex : -1
    })
  }, [createdMessages, deletedMessages])

  return (
    <>
      <div className="p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-white">
        {messages.map((msg, index) => {
          let bgColor = index !== formIndex ?
            regionBgColors[region][0] :
            regionBgColors[region][1]
          let textColor = regionTextColors[region][8]
          let message = getCurrentMessage(msg, index)
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
                  onClick={() => { toggleFormIndex(index) }}
                  enabled={isUserActive && isUserCreator}
                  active={index === formIndex}
                />
              )}
              {!message && (
                <MessageCell
                  region={region}
                  index={index}
                  onClick={() => toggleFormIndex(index)}
                  enabled={isUserActive && isUserLocal}
                  active={index === formIndex}
                />
              )}
            </div>
          )
        })}
      </div>
      {formIndex >= 0 && activeCellType === "empty" && (
        <SendMessageForm 
          region={region}
          tag={tag}
          index={formIndex}
          close={() => setFormIndex(-1)}
        />
      )}
      {formIndex >= 0 && activeCellType === "message" && (
        <DeleteMessageDialog
          lang={lang}
          message={messages[formIndex]}
          close={() => setFormIndex(-1)}
        />
      )}
    </>
  )
}