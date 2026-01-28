import { notFound } from "next/navigation"
import { getZones } from "@/app/lib/requests"
import { regions } from "@/app/lib/regions"
import { processMsgcounts } from "@/app/lib/miscs"
import limits from "@/app/lib/server-limits"
import Zones from "@/app/ui/zones"
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
  let zones = await getZones({
    region: region as Region,
    district: +district,
  })
  let minIndex = limits.message.zone.min
  let maxIndex = limits.message.zone.max
  let msgcounts = processMsgcounts(zones.data, minIndex, maxIndex)

  return (
    <Zones 
      region={region as Region}
      district={+district} 
      msgcounts={msgcounts}
    />
  )
}