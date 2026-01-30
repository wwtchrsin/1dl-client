import { notFound } from "next/navigation"
import { getZoneid } from "@/app/lib/location-processors"
import { processMessages } from "@/app/lib/response-processors"
import { getMessages } from "@/app/lib/requests"
import limits from "@/app/lib/server-limits"
import ErrorPage from "@/app/ui/error-page"
import Messages from "@/app/ui/messages"
import type { ZoneParams } from "@/app/lib/interfaces"

export default async function Zone({ params }: { params: Promise<ZoneParams> }) {
  let { region, district, zone } = await params
  let zoneid = getZoneid({ region, district, zone })
  if ( !zoneid ) {
    notFound()
  }
  let response = await getMessages(zoneid)
  if ( response.error ) {
    return (
      <ErrorPage error={response.error} />
    )
  }
  let minIndex = limits.message.index.min
  let maxIndex = limits.message.index.max
  let messages = processMessages(response.data, minIndex, maxIndex)
  
  return (
    <Messages
      zoneid={zoneid}
      messages={messages}
    />
  )
}