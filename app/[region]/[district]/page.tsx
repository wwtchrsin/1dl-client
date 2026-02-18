import { notFound } from "next/navigation"
import { getDistrictid } from "@/app/lib/location-processors"
import { getZones } from "@/app/lib/requests"
import { processZoneMsgcounts } from "@/app/lib/response-processors"
import Zones from "@/app/ui/zones"
import logger from "@/app/lib/logger"
import type { DistrictParams } from "@/app/lib/interfaces"

export default async function District({ params }: { params: Promise<DistrictParams> }) {
  logger.info("PAGE /REGION/DISTRICT: LOADING")
  let { region, district } = await params
  let districtid = getDistrictid({ region, district })
  if ( !districtid ) {
    logger.warn("WRONG LOCATION")
    notFound()
  }
  let zones = await getZones(districtid)
  let msgcounts = processZoneMsgcounts(zones.data)
  
  return (
    <Zones 
      region={districtid.region}
      district={districtid.district} 
      msgcounts={msgcounts}
    />
  )
}