"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { getLocation, parseJSON } from "@/app/lib/miscs"
import type { ReactNode } from "react"
import * as I from "@/app/lib/interfaces"

type WebSocketError = {
  error: string,
  timestamp: number,
}

type WebSocketContextType = {
  webSocket: WebSocket | undefined,
  webSocketError: WebSocketError | undefined,
  createdMessages: Map<number, I.Message>,
  deletedMessages: Set<number>,
  zoneCountChange: Map<number, number>,
  distCountChange: Map<number, number>, 
}

type WebSocketProviderProps = {
  children: ReactNode,
  token: string | undefined,
}

export const WebSocketContext = createContext<WebSocketContextType>({
  webSocket: undefined,
  webSocketError: undefined,
  createdMessages: new Map(),
  deletedMessages: new Set(),
  zoneCountChange: new Map(),
  distCountChange: new Map(),
})

let timestamp = () => (new Date()).valueOf()

export function WebSocketProvider({ children, token }: WebSocketProviderProps) {
  let pathname = usePathname()
  let [ webSocket, setWebSocket ] = useState<WebSocket | undefined>(undefined)
  let [ webSocketError, setWebSocketError ] = useState<WebSocketError | undefined>(undefined)
  let [ createdMessages, setCreatedMessages ] = useState<Map<number, I.Message>>(new Map())
  let [ deletedMessages, setDeletedMessages ] = useState<Set<number>>(new Set())
  let [ zoneCountChange, setZoneCountChange ] = useState<Map<number, number>>(new Map())
  let [ distCountChange, setDistCountChange ] = useState<Map<number, number>>(new Map())

  useEffect(() => {
    if ( !token ) {
      return
    }
    let tid: ReturnType<typeof setTimeout> | undefined
    let connect = async () => {
      let url = `${process.env.NEXT_PUBLIC_WS_SERVER}?token=${token}`
      let webSocket = new WebSocket(url)
      webSocket.onopen = () => {
        let location = getLocation(pathname)
        if ( location ) {
          webSocket.send(JSON.stringify({
            type: "set-location",
            location: location,
          }))
        }
        setWebSocket(webSocket)
        setWebSocketError(undefined)
        setCreatedMessages(new Map())
        setDeletedMessages(new Set())
        setZoneCountChange(new Map())
        setDistCountChange(new Map())
      }
      webSocket.onclose = (ev: CloseEvent) => {
        if ( ev.reason !== "unmounting-provider" ) {
          setWebSocket(undefined)
          setWebSocketError({
            error: "appError.wsConnection",
            timestamp: timestamp(),
          })
          tid && clearTimeout(tid)
          tid = setTimeout(connect, 5000)
        }
      }
      webSocket.onerror = () => {
        setWebSocket(undefined)
        webSocket.close()
      }
      webSocket.onmessage = (ev) => {
        let message = parseJSON(ev.data)
        switch ( message?.type ) {
          case "insert-messages": {
            if ( message.messages?.length ) {
              setCreatedMessages(createdMessages => {
                let created = new Map(createdMessages)
                for ( let msg of message.messages ) {
                  created.set(+msg.index, msg)
                }
                return created
              })
              setDeletedMessages(deletedMessages => {
                let deleted = new Set(deletedMessages)
                for ( let msg of message.messages ) {
                  deleted.delete(+msg.index)
                }
                return deleted
              })
            }
            break
          }
          case "delete-messages": {
            if ( message.indices?.length ) {
              setCreatedMessages(createdMessages => {
                let created = new Map(createdMessages)
                for ( let index of message.indices ) {
                  created.delete(+index)
                }
                return created
              })
              setDeletedMessages(deletedMessages => {
                let deleted = new Set(deletedMessages)
                for ( let index of message.indices ) {
                  deleted.add(+index)
                }
                return deleted
              })
            }
            break
          }
          case "change-zone-msgcounts": {
            if ( message.msgcounts ) {
              setZoneCountChange(zoneCountChange => {
                let msgcounts = new Map(zoneCountChange)
                for ( let index in message.msgcounts ) {
                  let delta = +message.msgcounts[index]
                  let value = msgcounts.get(+index)
                  if ( !value ) {
                    msgcounts.set(+index, delta)
                  } else {
                    msgcounts.set(+index, value + delta)
                  }
                }
                return msgcounts
              })
            }
            break
          }
          case "change-district-msgcounts": {
            if ( message.msgcounts ) {
              setDistCountChange(distCountChange => {
                let msgcounts = new Map(distCountChange)
                for ( let index in message.msgcounts ) {
                  let delta = +message.msgcounts[index]
                  let value = msgcounts.get(+index)
                  if ( !value ) {
                    msgcounts.set(+index, delta)
                  } else {
                    msgcounts.set(+index, value + delta)
                  }
                }
                return msgcounts
              })
            }
            break
          }
        }
      }
    }

    connect()

    return () => {
      webSocket && webSocket.close(1000, "unmounting-provider")
      tid && clearTimeout(tid)
    }
  }, [])

  useEffect(() => {
    let location = getLocation(pathname)
    if ( webSocket && location ) {
      webSocket.send(JSON.stringify({
        type: "set-location",
        loation: location,
      }))
    }
  }, [pathname])

  let context = {
    webSocket,
    webSocketError,
    createdMessages,
    deletedMessages,
    zoneCountChange,
    distCountChange,
  }

  return (
    <WebSocketContext value={context}>
      { children }
    </WebSocketContext>
  )
}

export const useWebSocket = () => useContext(WebSocketContext)
