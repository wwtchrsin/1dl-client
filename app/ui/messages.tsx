"use client"

import { useState } from "react"
import { useSession } from "@/app/providers/session"
import { regionLang, regionBgColors, regionTextColors } from "@/app/lib/regions"
import { getMessageColor } from "@/app/lib/message-colors"
import { useWebSocket } from "@/app/providers/websocket"
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
  
  let resetFormIndex = (index: number) => {
    if ( index === formIndex ) {
      setFormIndex(-1)
    }
  }

  return (
    <div className="p-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-white">
      {messages.map((msg, index) => {
        let bgColor = regionBgColors[region][0]
        let textColor = regionTextColors[region][8]
        let message = getCurrentMessage(msg, index)
        if ( message ) {
          bgColor = getMessageColor(message.color)
          textColor = "text-white"
        }
        let userActive = profile?.state === "active"
        let userLocal = message && message.puid === profile?.puid
        return (
          <div className={`relative h-100 ${textColor} ${bgColor}`} key={index}>
            {message && !(userActive && userLocal) && (
              <Message message={message} />
            )}
            {message && userActive && userLocal && (
              <UserMessage
                lang={lang}
                message={message}
                onAction={() => resetFormIndex(index)}
              />
            )}
            {!message && index === formIndex && (
              <SendMessageForm 
                region={region}
                tag={tag}
                index={index}
                close={() => setFormIndex(-1)}
              />
            )}
            {!message && index !== formIndex && (
              <MessageCell
                region={region}
                index={index}
                onClick={localProfile ? () => setFormIndex(index) : undefined}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}