import { notFound } from "next/navigation"
import { getDistrictid } from "@/app/lib/location-processors"
import { getZones } from "@/app/lib/requests"
import { processMsgcounts } from "@/app/lib/response-processors"
import limits from "@/app/lib/server-limits"
import Zones from "@/app/ui/zones"
import type { DistrictParams } from "@/app/lib/interfaces"

export default async function District({ params }: { params: Promise<DistrictParams> }) {
  let { region, district } = await params
  let districtid = getDistrictid({ region, district })
  if ( !districtid ) {
    notFound()
  }
  let zones = await getZones(districtid)
  let minIndex = limits.message.zone.min
  let maxIndex = limits.message.zone.max
  let msgcounts = processMsgcounts(zones.data, minIndex, maxIndex)

  return (
    <Zones 
      region={districtid.region}
      district={districtid.district} 
      msgcounts={msgcounts}
    />
  )
}