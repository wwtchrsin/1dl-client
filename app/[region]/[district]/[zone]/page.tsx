import { notFound } from "next/navigation"
import { getZoneid } from "@/app/lib/location-processors"
import { processMessages } from "@/app/lib/response-processors"
import { getMessages } from "@/app/lib/requests"
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
  let messages = processMessages(response.data)
  
  return (
    <Messages
      zoneid={zoneid}
      messages={messages}
    />
  )
}