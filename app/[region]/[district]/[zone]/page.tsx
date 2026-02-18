import { notFound } from "next/navigation"
import { getZoneid } from "@/app/lib/location-processors"
import { processMessages } from "@/app/lib/response-processors"
import { getMessages } from "@/app/lib/requests"
import ErrorPage from "@/app/ui/error-page"
import Messages from "@/app/ui/messages"
import logger from "@/app/lib/logger"
import type { ZoneParams } from "@/app/lib/interfaces"

export default async function Zone({ params }: { params: Promise<ZoneParams> }) {
  logger.info("PAGE /REGION/DISTRICT/ZONE: LOADING")
  let { region, district, zone } = await params
  let zoneid = getZoneid({ region, district, zone })
  if ( !zoneid ) {
    logger.warn("WRONG LOCATION")
    notFound()
  }
  let response = await getMessages(zoneid)
  if ( response.error ) {
    logger.warn("IMPOSSIBLE TO FETCH MESSAGES")
    return (
      <ErrorPage error={response.error} />
    )
  }
  let messages = processMessages(response.data)
  
  return (
    <Messages
      zoneid={zoneid}
      messages={messages}
    />
  )
}