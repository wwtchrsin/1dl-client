"use client"

import { useState, useEffect } from "react"
import { useSession } from "@/app/providers/session"
import { regionLang, regionBgColors, regionTextColors } from "@/app/lib/regions"
import { getMessageColor } from "@/app/lib/message-colors"
import { useWebSocket } from "@/app/providers/websocket"
import limits from "@/app/lib/server-limits"
import SendMessageForm from "@/app/ui/send-message-form"
import Message from "@/app/ui/message"
import UserMessage from "@/app/ui/user-message"
import MessageCell from "@/app/ui/message-cell"
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
  let lang = regionLang[location.region]
  let localProfile = profile && profile.region === region

  let getCurrentMessage = (msg: I.Message | null, index: number): 
    I.Message | null => {
      if ( deletedMessages.has(index) ) return null
      let createdMessage = createdMessages.get(index)
      return createdMessage ?? msg
    }
  
  let toggleFormIndex = (index: number) => {
    setFormIndex(index === formIndex ? -1 : index)
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
          let userActive = profile?.state === "active"
          let userLocal = message && message.puid === profile?.puid
          return (
            <div className={`relative h-50 ${textColor} ${bgColor}`} key={index}>
              {message && !(userActive && userLocal) && (
                <Message message={message} />
              )}
              {message && userActive && userLocal && (
                <UserMessage
                  lang={lang}
                  message={message}
                  onAction={() => toggleFormIndex(index)}
                />
              )}
              {!message && (
                <MessageCell
                  region={region}
                  index={index}
                  onClick={() =>  toggleFormIndex(index)}
                  active={index === formIndex}
                />
              )}
            </div>
          )
        })}
      </div>
      {formIndex >= 0 && (
        <SendMessageForm 
            region={region}
            tag={tag}
            index={formIndex}
            close={() => setFormIndex(-1)}
          />
      )}
    </>
  )
}