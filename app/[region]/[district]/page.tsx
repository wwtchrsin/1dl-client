import { notFound } from "next/navigation"
import { getRooms } from "@/app/lib/requests"
import { regions } from "@/app/lib/regions"
import { processMsgcounts } from "@/app/lib/miscs"
import limits from "@/app/lib/server-limits"
import Rooms from "@/app/ui/rooms"
import type { Region } from "@/app/lib/interfaces"

type DistrictParams = {
  region: string,
  district: string,
}

export default async function District({ params }: { params: Promise<DistrictParams> }) {
  let { region, district } = await params
  if ( !(regions as any[]).includes(region) ) {
    notFound()
  }
  if ( isNaN(+district) || +district < limits.message.district.min ||
    +district > limits.message.district.max ) {
      notFound()
    }
  let rooms = await getRooms({
    region: region as Region,
    district: +district,
  })
  let minIndex = limits.message.room.min
  let maxIndex = limits.message.room.max
  let msgcounts = processMsgcounts(rooms.data, minIndex, maxIndex)

  return (
    <Rooms 
      region={region as Region}
      district={+district} 
      msgcounts={msgcounts}
    />
  )
}