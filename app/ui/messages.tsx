"use client"

import { useState } from "react"
import { useProfile } from "@/app/providers/profile"
import { regionLang, regionBgColors, regionTextColors } from "@/app/lib/regions"
import { getMessageColor } from "@/app/lib/message-colors"
import { useWebSocket } from "@/app/providers/websocket"
import SendMessageForm from "@/app/ui/send-message-form"
import Message from "@/app/ui/message"
import UserMessage from "@/app/ui/user-message"
import type * as I from "@/app/lib/interfaces"

let TxtRes = {
  Object: {
    en: "Object",
    ru: "Объект",
  },
  modify: {
    en: "modify",
    ru: "модифицировать",
  }
}

type MessagesProps = {
  zoneid: I.Zoneid,
  messages: (I.Message | null)[],
}

export default function Messages({ zoneid, messages }: MessagesProps) {
  let { region, district, zone } = zoneid
  let { profile } = useProfile()
  let { createdMessages, deletedMessages } = useWebSocket()
  let [ formIndex, setFormIndex ] = useState(-1)
  let lang = regionLang[zoneid.region]
  let buttonBgColor = regionBgColors[region][3]
  let inactiveBgColor = regionBgColors[region][2]
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
        return (
          <div className={`relative flex flex-col items-center  ${textColor} ${bgColor}`} key={index}>
            <div className={`p-8 flex flex-col justify-center h-100 max-w-80`}>
              {message && message.puid !== profile?.puid && (
                <Message message={message} />
              )}
              {message && message.puid === profile?.puid && (
                <UserMessage
                  lang={lang}
                  message={message}
                  onAction={() => resetFormIndex(index)}
                />
              )}
              {!message && index === formIndex && (
                <SendMessageForm 
                  region={region}
                  district={district}
                  zone={zone}
                  index={index}
                  close={() => setFormIndex(-1)}
                />
              )}
              {!message && index !== formIndex && !localProfile && (
                <div className="flex flex-col gap-2 items-center">
                  <div>{ `${TxtRes.Object[lang]} #${index}` }</div>
                  <button className={`cursor-pointer py-1 px-2 rounded-md ${inactiveBgColor} text-white`}>
                    { TxtRes.modify[lang] }
                  </button>
                </div>
              )}
              {!message && index !== formIndex && localProfile && (
                <div className="flex flex-col gap-2 items-center">
                  <div>{ `${TxtRes.Object[lang]} #${index}` }</div>
                  <button 
                    className={`cursor-pointer py-1 px-2 rounded-md ${buttonBgColor} text-white`}
                    onClick={() => setFormIndex(index)}>
                      { TxtRes.modify[lang] }
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}