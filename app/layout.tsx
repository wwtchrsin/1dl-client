import type { Metadata } from "next"
import "./globals.css"

import * as cookies from "@/app/lib/cookies"
import { getProfile } from "@/app/lib/requests"
import Header from "@/app/ui/header"
import SessionError from "./ui/session-error"
import PageRefresher from "@/app/ui/page-refresher"
import { SessionProvider } from "@/app/providers/session"
import { WebSocketProvider } from "@/app/providers/websocket"
import logger from "@/app/lib/logger"
import type { Profile } from "@/app/lib/interfaces"

export const metadata: Metadata = {
  title: "1DL Project",
  description: "1DL Project",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  logger.info("LAYOUT: UPDATING")
  let session = await cookies.getSession()
  let profile: Profile | undefined = undefined
  let error: string | undefined = undefined
  let timestamp = 0

  if ( !session.data?.deviceid ) {
    logger.warn("SESSION NOT FOUND OR CORRUPT")
  }

  if ( session.data?.sessionid ) {
    logger.info("LAYOUT: FETCHING PROFILE")
    let response = await getProfile(session.data.sessionid)
    profile = response.profile
    error = response.error
    timestamp = response.timestamp
  }

  if ( session.data?.sessionid && !profile ) {
    logger.warn("IMPOSSIBLE TO FECTH PROFILE")
  }
  
  return (
    <html lang="en">
      <body>
        <SessionProvider 
          profile={profile}
          deviceid={session.data?.deviceid}
          timestamp={session.data?.timestamp ?? -1}
        >
          <WebSocketProvider>
            <Header />
            {children}
            {session.data?.region && error && (
              <SessionError
                region={session.data?.region}
                error={error}
                timestamp={timestamp}
              />
            )}
            <PageRefresher />
          </WebSocketProvider>
        </SessionProvider>
        <script 
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          defer>
        </script>
      </body>
    </html>
  )
}
