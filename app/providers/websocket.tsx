"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "@/app/providers/session"
import { getLocation, parseJSON, getTimestamp } from "@/app/lib/miscs"
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
}

export const WebSocketContext = createContext<WebSocketContextType>({
  webSocket: undefined,
  webSocketError: undefined,
  createdMessages: new Map(),
  deletedMessages: new Set(),
  zoneCountChange: new Map(),
  distCountChange: new Map(),
})

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  let router = useRouter()
  let pathname = usePathname()
  let { deviceid } = useSession()
  let [ webSocket, setWebSocket ] = useState<WebSocket | undefined>(undefined)
  let [ webSocketError, setWebSocketError ] = useState<WebSocketError | undefined>(undefined)
  let [ createdMessages, setCreatedMessages ] = useState<Map<number, I.Message>>(new Map())
  let [ deletedMessages, setDeletedMessages ] = useState<Set<number>>(new Set())
  let [ zoneCountChange, setZoneCountChange ] = useState<Map<number, number>>(new Map())
  let [ distCountChange, setDistCountChange ] = useState<Map<number, number>>(new Map())
  
  useEffect(() => {
    let webSocket: WebSocket | undefined
    let tid: ReturnType<typeof setTimeout> | undefined
    let connect = async () => {
      webSocket = new WebSocket(process.env.NEXT_PUBLIC_WS_SERVER!)
      webSocket.onopen = () => {
        setWebSocket(webSocket)
      }
      webSocket.onclose = (ev: CloseEvent) => {
        if ( ev.reason !== "unmounting-provider" ) {
          setWebSocket(undefined)
          setWebSocketError({
            error: "appError.wsConnection",
            timestamp: getTimestamp(),
          })
          tid && clearTimeout(tid)
          tid = setTimeout(connect, 5000)
        }
      }
      webSocket.onerror = () => {
        setWebSocket(undefined)
        webSocket?.close()
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
          case "login":
          case "logout": {
            router.refresh()
            break
          }
        }
      }
    }

    connect()

    return () => {
      webSocket?.close(1000, "unmounting-provider")
      tid && clearTimeout(tid)
    }
  }, [])

  useEffect(() => {
    let location = getLocation(pathname)
    if ( webSocket && location ) {
      webSocket.send(JSON.stringify({
        type: "set-location",
        location: location,
      }))
    }
    if ( webSocket && deviceid ) {
      webSocket.send(JSON.stringify({
        type: "set-deviceid",
        deviceid: deviceid,
      }))
    }
    setWebSocketError(undefined)
    setCreatedMessages(new Map())
    setDeletedMessages(new Set())
    setZoneCountChange(new Map())
    setDistCountChange(new Map())
  }, [pathname, webSocket, router, deviceid])

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
