import type { Metadata } from "next"
import "./globals.css"

import * as cookies from "@/app/lib/cookies"
import { getProfile } from "@/app/lib/requests"
import Header from "@/app/ui/header"
import SessionError from "./ui/session-error"
import { ProfileProvider } from "@/app/providers/profile"
import { WebSocketProvider } from "@/app/providers/websocket"
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
  let session = await cookies.getSession()
  let profile: Profile | undefined = undefined
  let error: string | undefined = undefined
  let timestamp = -1

  if ( session ) {
    let response = await getProfile(session.sessionid)
    profile = response.profile
    error = response.error
    timestamp = response.timestamp
  }

  return (
    <html lang="en">
      <body>
        <ProfileProvider token={session?.token} profile={profile}>
          <WebSocketProvider token={session?.token}>
            <Header />
            {children}
            {error && (
              <SessionError
                region={session?.region}
                error={error}
                timestamp={timestamp}
              />
            )}
          </WebSocketProvider>
        </ProfileProvider>
      </body>
    </html>
  )
}
