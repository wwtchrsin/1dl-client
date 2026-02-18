"use client"

import { useEffect, useRef } from "react"
import { useWebSocket } from "@/app/providers/websocket"
import { useSession } from "@/app/providers/session"
import logger from "../lib/logger"

export default function PageRefresher() {
  let { loginTimestamp, logoutTimestamp } = useWebSocket()
  let { profile } = useSession()
  let timerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  let isSessionExpired = (loginTs: number, logoutTs: number, profile: boolean) => {
    return ( loginTs > 0 && loginTs > logoutTs && !profile ) ||
      (logoutTs > 0 && logoutTs > loginTs && profile)
  }

  useEffect(() => {
    logger.info(`PAGE REFRESHER STATE: ` +
      `login=${loginTimestamp} ` +
      `logout=${logoutTimestamp} ` +
      `profile=${!!profile}`)
    timerId.current && clearTimeout(timerId.current)
    if ( isSessionExpired(loginTimestamp, logoutTimestamp, !!profile) ) {
      logger.info("PAGE REFRESHER: PAGE SET TO REFRESH")
      timerId.current = setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
    return () => {
      logger.info("PAGE REFRESHER UNMOUNTED")
      timerId.current && clearTimeout(timerId.current)
      timerId.current = undefined
    }
  }, [loginTimestamp, logoutTimestamp, profile])

  if ( !isSessionExpired(loginTimestamp, logoutTimestamp, !!profile) ) {
    return <></>
  }

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-1000">
    </div>
  )
}