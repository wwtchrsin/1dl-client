import { notFound } from "next/navigation"
import { getLocation } from "@/app/lib/location-processors"
import { processMessages } from "@/app/lib/response-processors"
import { getMessages } from "@/app/lib/requests"
import ErrorPage from "@/app/ui/error-page"
import Messages from "@/app/ui/messages"
import logger from "@/app/lib/logger"
import type { LocationParams } from "@/app/lib/interfaces"

export default async function MessagesPage({ params }: { params: Promise<LocationParams> }) {
  logger.info("PAGE /REGION/TAG: LOADING")
  let { region, tag } = await params
  let location = getLocation({ region, tag })
  if ( !location ) {
    logger.warn("WRONG LOCATION")
    notFound()
  }
  let response = await getMessages(location)
  if ( response.error ) {
    logger.warn("IMPOSSIBLE TO FETCH MESSAGES")
    return (
      <ErrorPage error={response.error} />
    )
  }
  let messages = processMessages(response.data)
  
  return (
    <Messages
      location={location}
      messages={messages}
    />
  )
}